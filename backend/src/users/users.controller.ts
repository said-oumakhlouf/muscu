import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Patch(':id')
    updateClient(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.updateProfile(+id, body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('coach')
    @Post('invite')
    inviteClient(
        @Request() req,
        @Body()
        body: {
            email: string;
            firstname: string;
            lastname: string;
            password: string;
        },
    ) {
        return this.usersService.inviteClient(req.user.id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-sessions')
    getMySessions(@Request() req) {
        return this.usersService.getSessionsByCoach(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-clients')
    getMyClients(@Request() req) {
        return this.usersService.getClientsByCoach(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateProfile(@Request() req, @Body() UpdateUserDto: UpdateUserDto) {
        return this.usersService.updateProfile(req.user.id, UpdateUserDto);
    }
}
