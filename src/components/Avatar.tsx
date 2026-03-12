const avatarColors = ['#4F46E5', '#0891B2', '#7C3AED', '#059669', '#DB2777', '#7C5CBF'];

export default function Avatar({ name, size = 36 }: { name: string; size?: number }) {
    const parts = name?.trim().split(' ') || [];
    const initials = parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name?.slice(0, 2).toUpperCase() || '??';
    const color = avatarColors[name?.charCodeAt(0) % avatarColors.length];
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', background: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 600, fontSize: size * 0.35, flexShrink: 0,
        }}>
            {initials}
        </div>
    );
}