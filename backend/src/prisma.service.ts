import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // ← important !
import { PrismaClient } from './generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const url = process.env.DATABASE_URL;

    if (!url) {
      throw new Error('DATABASE_URL manquant dans .env');
    }

    const pool = new Pool({ connectionString: url }); // ← Pool explicite
    const adapter = new PrismaPg(pool); // ← passe le pool, pas { connectionString }

    super({ adapter });
  }
}
