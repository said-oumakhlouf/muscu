interface ProgressRingProps {
    value: number;
    max: number;
    size?: number;
    color?: string;
}

/**
 * Anneau de progression SVG.
 * Prend une valeur et un max, affiche un cercle rempli proportionnellement.
 */
export default function ProgressRing({ value, max, size = 120, color = '#7C3AED' }: ProgressRingProps) {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = max === 0 ? 0 : Math.min(value / max, 1);
    const offset = circumference * (1 - pct);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Cercle de fond */}
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke="#EDE9FE" strokeWidth={10}
            />
            {/* Cercle de progression */}
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth={10}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
        </svg>
    );
}