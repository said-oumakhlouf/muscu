import { Session } from '@/types/Session';

/**
 * Calcule le streak de jours consécutifs d'entraînement.
 * On part d'aujourd'hui et on remonte tant que chaque jour
 * a au moins une séance complétée (date passée).
 */
export function computeStreak(sessions: Session[]): number {
    const completedDates = sessions
        .filter(s => s.scheduledAt && new Date(s.scheduledAt) < new Date())
        .map(s => new Date(s.scheduledAt!).toDateString());

    // On déduplique et trie du plus récent au plus ancien
    const uniqueDates = [...new Set(completedDates)].sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    for (const dateStr of uniqueDates) {
        const d = new Date(dateStr);
        // Si la date est aujourd'hui ou hier par rapport au curseur, on continue
        const diff = Math.round((cursor.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        if (diff <= 1) {
            streak++;
            cursor = d;
        } else {
            break; // Trou dans les dates → streak cassé
        }
    }

    return streak;
}