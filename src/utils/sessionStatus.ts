export type SessionStatus = 'done' | 'today' | 'upcoming' | 'unscheduled';

export function getSessionStatus(scheduledAt?: string | null): SessionStatus {
    if (!scheduledAt) return 'unscheduled';
    const date = new Date(scheduledAt);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 86400000);
    if (date < todayStart) return 'done';
    if (date < todayEnd) return 'today';
    return 'upcoming';
}

export const statusConfig = {
    done: { label: 'Terminée', bg: '#F3F4F6', color: '#6B7280' },
    today: { label: "Aujourd'hui", bg: '#DCFCE7', color: '#16A34A' },
    upcoming: { label: 'À venir', bg: '#DBEAFE', color: '#2563EB' },
    unscheduled: { label: 'Sans date', bg: '#FEF9C3', color: '#CA8A04' },
};

