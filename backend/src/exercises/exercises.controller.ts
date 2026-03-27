import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Post()
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Post('find-or-create')
    findOrCreate(@Body() body: { name: string }) {
        return this.exercisesService.findOrCreate(body.name);
    }

    @Get()
    findAll() {
        return this.exercisesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.exercisesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateExerciseDto: UpdateExerciseDto,
    ) {
        return this.exercisesService.update(+id, updateExerciseDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.exercisesService.remove(+id);
    }
}
