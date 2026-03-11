'use client';

import { User } from '@/types/User';
import Link from 'next/link';

interface AdminDashboardProps {
    clients: User[];
    coachName: string;
    upcomingSessions: {
        id: number;
        name: string;
        scheduledAt: string;
        user: { firstname: string; lastname: string };
    }[];
}

const goalLabels: Record<string, string> = {
    weight_loss: 'Perte de poids',
    muscle_gain: 'Prise de masse',
    maintenance: 'Maintien',
};

const avatarColors = ['#4F46E5', '#0891B2', '#7C3AED', '#059669', '#DB2777', '#7C5CBF'];

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
    const initials = name?.slice(0, 2).toUpperCase() || '??';
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

export default function AdminDashboard({ clients, coachName, upcomingSessions }: AdminDashboardProps) {
    const stats = [
        { label: 'Clients actifs', value: String(clients.length), delta: 'total', icon: '👤' },
        { label: 'Poids moyen', value: clients.filter(c => c.weight).length > 0 ? `${Math.round(clients.reduce((acc, c) => acc + (Number(c.weight) || 0), 0) / clients.filter(c => c.weight).length)}kg` : '—', delta: 'moyenne', icon: '⚖️' },
        { label: 'Taille moyenne', value: clients.filter(c => c.height).length > 0 ? `${Math.round(clients.reduce((acc, c) => acc + (Number(c.height) || 0), 0) / clients.filter(c => c.height).length)}cm` : '—', delta: 'moyenne', icon: '📏' },
        { label: 'Objectifs', value: String(new Set(clients.map(c => c.goal).filter(Boolean)).size), delta: 'différents', icon: '🎯' },
    ];

    return (
        <div style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: '100vh', color: '#111827', width: '100%', maxWidth: 1200 }}>

            {/* Header */}
            <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>Bienvenue, {coachName} 👋</h1>
                    <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>{clients.length} clients actifs</p>
                </div>
                <Link href="/admin/clients/new" style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#111827', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                    + Créer séance
                </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
                {stats.map((stat, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
                                <p style={{ fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.value}</p>
                                <p style={{ fontSize: 12, color: '#7C5CBF', margin: '6px 0 0', fontWeight: 500 }}>{stat.delta}</p>
                            </div>
                            <span style={{ fontSize: 22 }}>{stat.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

                {/* Prochaines séances */}
                <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                    <div style={{ padding: '18px 22px', borderBottom: '1px solid #F3F4F6' }}>
                        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>Prochaines séances</h2>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {upcomingSessions.length === 0 ? (
                            <p style={{ padding: '16px 22px', color: '#9CA3AF', fontSize: 13 }}>Aucune séance planifiée</p>
                        ) : (
                            upcomingSessions.map((session, i) => (
                                <div key={session.id} style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: i < upcomingSessions.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                                    <Avatar name={session.user.firstname || ''} size={38} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#111827' }}>
                                            {session.user.firstname} {session.user.lastname}
                                        </p>
                                        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9CA3AF' }}>{session.name}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#374151' }}>
                                            {new Date(session.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                        </p>
                                        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9CA3AF' }}>
                                            {new Date(session.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Clients */}
                <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                    <div style={{ padding: '18px 22px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>Mes clients</h2>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {clients.map((client, i) => (
                            <Link key={client.id} href={`/admin/clients/${client.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: i < clients.length - 1 ? '1px solid #F9FAFB' : 'none', cursor: 'pointer' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <Avatar name={client.firstname || client.email} size={38} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#111827' }}>
                                            {client.firstname ? `${client.firstname} ${client.lastname}` : client.email}
                                        </p>
                                        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9CA3AF' }}>
                                            {client.goal ? goalLabels[client.goal] || client.goal : 'Pas d\'objectif défini'}
                                            {client.weight ? ` · ${client.weight}kg` : ''}
                                        </p>
                                    </div>
                                    <button style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #E5E7EB', background: 'transparent', fontSize: 12, fontWeight: 500, cursor: 'pointer', color: '#374151' }}>
                                        Voir
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}