import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ← ajoute
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaService } from './prisma.service'; // ajuste chemin

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // rend ConfigService dispo partout
      envFilePath: '.env', // explicite si besoin
    }),
    ExercisesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}