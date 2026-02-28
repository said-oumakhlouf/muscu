import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ← ajoute
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaService } from './prisma.service'; // ajuste chemin
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
  ],
  providers: [PrismaService],
})
export class AppModule {}
