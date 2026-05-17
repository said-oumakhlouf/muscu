import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService: CoachesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Post()
    create(@Body() createCoachDto: CreateCoachDto) {
        return this.coachesService.create(createCoachDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Patch('me')
    updateMe(
        @Request() req: any,
        @Body()
        body: {
            bio?: string;
            specialty?: string;
            hourlyRate?: number;
            photoUrl?: string;
        },
    ) {
        return this.coachesService.updateByUserId(req.user.id, body);
    }

    @Get()
    findAll(
        @Query('specialty') specialty?: string,
        @Query('search') search?: string,
    ) {
        return this.coachesService.findAll(specialty, search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coachesService.findOne(+id);
    }
}
