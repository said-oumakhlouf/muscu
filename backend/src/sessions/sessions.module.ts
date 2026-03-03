import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService],
})
export class SessionsModule { }
