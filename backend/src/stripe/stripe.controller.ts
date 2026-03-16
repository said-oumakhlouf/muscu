import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    Post,
    RawBodyRequest,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @Post('checkout')
    async createCheckout(
        @Body() body: { customerId: string; priceId: string; coachId: number },
    ) {
        const session = await this.stripeService.createCheckoutSession(
            body.customerId,
            body.priceId,
            body.coachId,
        );
        return { url: session.url };
    }

    @Post('connect/account')
    async createConnectAccount(
        @Body() body: { email: string; coachId: number },
    ) {
        const account = await this.stripeService.createConnectAccount(
            body.email,
        );
        return { accountId: account.id };
    }

    @Post('connect/onboarding')
    async createOnboarding(@Body() body: { accountId: string }) {
        const link = await this.stripeService.createConnectOnboardingLink(
            body.accountId,
        );
        return { url: link.url };
    }

    @Post('webhook')
    @HttpCode(200)
    async handleWebhook(
        @Req() req: RawBodyRequest<Request>,
        @Headers('stripe-signature') sig: string,
    ) {
        const event = this.stripeService.constructWebhookEvent(
            req.rawBody!,
            sig,
        );

        switch (event.type) {
            case 'customer.subscription.updated':
            case 'customer.subscription.created':
                await this.stripeService.handleSubscriptionUpdated(
                    event.data.object,
                );
                break;
            case 'customer.subscription.deleted':
                await this.stripeService.handleSubscriptionDeleted(
                    event.data.object,
                );
                break;
            case 'invoice.payment_failed':
                console.log('Payment failed — TODO: envoyer email relance');
                break;
            case 'invoice.paid':
                console.log('Invoice paid — renouvellement confirmé');
                break;
        }

        return { received: true };
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async getStatus(@Request() req): Promise<object> {
        const coachId = req.user.coachId;
        const subscription =
            await this.stripeService.getSubscriptionByCoachId(coachId);
        return subscription ?? { plan: null, status: 'inactive' };
    }
}
