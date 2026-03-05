import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ← ajoute
import { AuthModule } from './auth/auth.module';
import { CoachesModule } from './coaches/coaches.module';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaService } from './prisma.service'; // ajuste chemin
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // rend ConfigService dispo partout
      envFilePath: '.env', // explicite si besoin
    }),
    ExercisesModule,
    AuthModule,
    UsersModule,
    SessionsModule,
    CoachesModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
