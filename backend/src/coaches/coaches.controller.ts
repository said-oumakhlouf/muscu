import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Query,
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
