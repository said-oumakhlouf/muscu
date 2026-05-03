import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
        await this.resend.emails.send({
            from: 'Coachfik <onboarding@resend.dev>',
            to,
            subject: 'Réinitialisation de votre mot de passe',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C5CBF;">Réinitialisation de votre mot de passe</h2>
          <p>Vous avez demandé à réinitialiser votre mot de passe Coachfik.</p>
          <p>Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
          <a href="${resetUrl}" style="
            display: inline-block;
            background-color: #7C5CBF;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            margin: 16px 0;
          ">
            Réinitialiser mon mot de passe
          </a>
          <p style="color: #888; font-size: 14px;">Ce lien expire dans 1 heure.</p>
          <p style="color: #888; font-size: 14px;">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        </div>
      `,
        });
    }
}
