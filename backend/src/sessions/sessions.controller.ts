import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @UseGuards(RolesGuard)
    @Roles('coach')
    @Post(':id/exercises')
    addExercise(
        @Param('id') id: string,
        @Body()
        body: {
            exerciseId: number;
            sets: number;
            reps: number;
            weight?: number;
        },
    ) {
        return this.sessionsService.addExercise(+id, body);
    }

    @UseGuards(RolesGuard)
    @Roles('coach')
    @Delete(':id/exercises/:exerciseId')
    removeExercise(
        @Param('id') id: string,
        @Param('exerciseId') exerciseId: string,
    ) {
        return this.sessionsService.removeExercise(+id, +exerciseId);
    }

    @UseGuards(RolesGuard)
    @Roles('coach')
    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionsService.create(createSessionDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.sessionsService.findAll(req.user.id);
    }

    @UseGuards(RolesGuard)
    @Roles('coach')
    @Get('user/:id')
    findByUser(@Param('id') id: string) {
        const userId = parseInt(id);
        if (isNaN(userId)) throw new BadRequestException('Invalid user id');
        return this.sessionsService.findByUser(userId);
    }

    @UseGuards(RolesGuard)
    @Roles('coach')
    @Get('coach/all')
    findAllByCoach(@Request() req) {
        return this.sessionsService.findAllByCoach(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sessionsService.findOne(+id);
    }

    @UseGuards(RolesGuard)
    @Roles('coach')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Roles('coach')
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
        return this.sessionsService.update(+id, dto);
    }
}
