import { Session } from '@/types/Session';

const INTENSITY_LABELS = { low: 'Faible', medium: 'Moyenne', high: 'Élevée' };
const INTENSITY_COLORS = { low: '#10B981', medium: '#F59E0B', high: '#EF4444' };

interface RecentSessionsCardProps {
    sessions: Session[];
}

/**
 * Affiche les dernières séances complétées avec leur intensité et calories.
 * Reçoit une liste déjà triée et filtrée depuis le parent.
 */
export default function RecentSessionsCard({ sessions }: RecentSessionsCardProps) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm">
            <h3 className="font-bold text-[#1A1A2E] text-sm mb-4">Dernières séances</h3>
            {sessions.length === 0 ? (
                <div className="flex flex-col items-center py-6 gap-2">
                    <span className="text-3xl">📋</span>
                    <p className="text-[#9CA3AF] text-sm text-center">Aucune séance terminée</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {sessions.map(session => (
                        <div key={session.id} className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#F3EEFF] rounded-xl flex items-center justify-center shrink-0 text-sm">
                                🏋️
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-[#1A1A2E] truncate">{session.name}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-[#9CA3AF]">
                                        {new Date(session.scheduledAt!).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                    </p>
                                    {session.intensity && (
                                        <span
                                            className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                                            style={{
                                                color: INTENSITY_COLORS[session.intensity],
                                                background: `${INTENSITY_COLORS[session.intensity]}18`,
                                            }}
                                        >
                                            {INTENSITY_LABELS[session.intensity]}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {session.calories && (
                                <span className="text-xs font-bold text-[#7C3AED] shrink-0">
                                    {session.calories} kcal
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}