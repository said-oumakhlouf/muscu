import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] py-16 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Logo + description */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏋️</span>
              <span className="text-white font-black text-xl">CoachFik</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Connecte les sportifs avec des coachs professionnels pour des
              séances personnalisées et un suivi en temps réel.
            </p>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-col gap-3">
            <p className="text-white/20 text-xs uppercase tracking-widest mb-1">
              Légal
            </p>
            <Link
              href="/cgu"
              className="text-white/50 text-sm hover:text-white transition"
            >
              Conditions générales d'utilisation
            </Link>
            <Link
              href="/confidentialite"
              className="text-white/50 text-sm hover:text-white transition"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/rgpd"
              className="text-white/50 text-sm hover:text-white transition"
            >
              RGPD
            </Link>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-col gap-3">
            <p className="text-white/20 text-xs uppercase tracking-widest mb-1">
              Nous suivre
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7C5CBF] transition group"
              >
                <Instagram
                  size={18}
                  className="text-white/50 group-hover:text-white transition"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7C5CBF] transition group"
              >
                <Twitter
                  size={18}
                  className="text-white/50 group-hover:text-white transition"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7C5CBF] transition group"
              >
                <Youtube
                  size={18}
                  className="text-white/50 group-hover:text-white transition"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/20 text-sm text-center">
            © {new Date().getFullYear()} CoachFik. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
