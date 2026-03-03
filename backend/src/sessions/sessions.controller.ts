import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionsService.create(createSessionDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.sessionsService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.sessionsService.findOne(+id, req.user.id);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.sessionsService.remove(+id, req.user.id);
    }
}
