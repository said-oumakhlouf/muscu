const goalLabels: Record<string, string> = {
    weight_loss: 'Perte de poids',
    muscle_gain: 'Prise de masse',
    maintenance: 'Maintien',
};

export function formatGoal(goal?: string | null): string {
    if (!goal) return '—';
    return goalLabels[goal] || goal;
}