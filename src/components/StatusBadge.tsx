// src/components/StatusBadge.tsx
import { getSessionStatus, statusConfig } from '@/utils/sessionStatus';

export default function StatusBadge({ scheduledAt }: { scheduledAt?: string | null }) {
    const status = getSessionStatus(scheduledAt);
    const { label, bg, color } = statusConfig[status];
    return (
        <span style={{
            fontSize: 11, fontWeight: 600, padding: '2px 8px',
            borderRadius: 20, background: bg, color,
        }}>
            {label}
        </span>
    );
}