import { Session } from '@/types/Session';

/**
 * Retourne un tableau de 7 valeurs représentant le nombre
 * de séances complétées par jour sur la semaine en cours.
 * Index 0 = Lundi, Index 6 = Dimanche.
 */
export function getWeeklyData(sessions: Session[]): number[] {
    const now = new Date();

    // On calcule le début de la semaine (lundi à minuit)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const days = Array(7).fill(0);

    sessions
        .filter(s => s.scheduledAt && new Date(s.scheduledAt) < now && new Date(s.scheduledAt) >= startOfWeek)
        .forEach(s => {
            const day = new Date(s.scheduledAt!).getDay(); // 0 = dimanche, 1 = lundi...
            const idx = day === 0 ? 6 : day - 1;           // on ramène dimanche à l'index 6
            days[idx]++;
        });

    return days;
}