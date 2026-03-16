const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

interface WeeklyChartProps {
    data: number[];        // tableau de 7 valeurs, une par jour
    total: number;         // total de la semaine pour l'affichage
}

/**
 * Graphique en barres représentant l'activité sur 7 jours.
 * Reçoit un tableau de 7 nombres (index 0 = Lundi).
 */
export default function WeeklyChart({ data, total }: WeeklyChartProps) {
    const max = Math.max(...data, 1);

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#1A1A2E] text-sm">Cette semaine</h3>
                <span className="text-xs text-[#9CA3AF]">{total} séance{total > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-end gap-2 h-24">
                {data.map((count, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full rounded-lg bg-[#EDE9FE]" style={{ height: 80 }}>
                            <div
                                className="w-full rounded-lg bg-[#7C3AED] transition-all duration-500"
                                style={{ height: `${(count / max) * 100}%`, minHeight: count > 0 ? 8 : 0 }}
                            />
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] font-medium">{DAY_LABELS[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}