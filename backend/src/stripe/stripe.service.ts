import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private readonly prisma: PrismaService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2026-02-25.clover',
        });
    }

    async createCustomer(email: string, name: string) {
        return this.stripe.customers.create({ email, name });
    }

    async createCheckoutSession(
        customerId: string,
        priceId: string,
        coachId: number,
    ) {
        return this.stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            metadata: { coachId: coachId.toString() },
            success_url: `${process.env.APP_URL}/dashboard/billing?success=1`,
            cancel_url: `${process.env.APP_URL}/dashboard/billing`,
        });
    }

    async createConnectAccount(email: string) {
        return this.stripe.accounts.create({
            type: 'express',
            email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });
    }

    async createConnectOnboardingLink(accountId: string) {
        return this.stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.APP_URL}/dashboard/billing`,
            return_url: `${process.env.APP_URL}/dashboard/billing?connect=success`,
            type: 'account_onboarding',
        });
    }

    constructWebhookEvent(payload: Buffer, sig: string) {
        return this.stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    }

    async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
        const coachId = parseInt(subscription.metadata.coachId);
        if (isNaN(coachId)) return;
        const plan = this.getPlanFromPriceId(
            subscription.items.data[0].price.id,
        );

        await this.prisma.subscription.upsert({
            where: { stripeSubscriptionId: subscription.id },
            update: {
                status: subscription.status,
                plan,
                currentPeriodEnd: new Date(
                    subscription.items.data[0].current_period_end * 1000,
                ),
            },
            create: {
                coach: { connect: { id: coachId } },
                stripeCustomerId: subscription.customer as string,
                stripeSubscriptionId: subscription.id,
                plan,
                status: subscription.status,
                currentPeriodEnd: new Date(
                    subscription.items.data[0].current_period_end * 1000,
                ),
            },
        });
    }

    async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
        await this.prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: { status: 'canceled' },
        });
    }

    private getPlanFromPriceId(priceId: string): string {
        const plans: Record<string, string> = {
            [process.env.STRIPE_PRICE_STARTER!]: 'starter',
            [process.env.STRIPE_PRICE_PRO!]: 'pro',
            [process.env.STRIPE_PRICE_ELITE!]: 'elite',
        };
        return plans[priceId] ?? 'starter';
    }

    getSubscriptionByCoachId(coachId: number) {
        return this.prisma.subscription.findUnique({
            where: { coachId },
        }) as Promise<object | null>;
    }
}
