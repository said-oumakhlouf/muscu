import CoachJoinFeatures from '@/components/coach/CoachJoinFeatures';
import CoachJoinHero from '@/components/coach/CoachJoinHero';
import CoachJoinPlans from '@/components/coach/CoachJoinPlans';
import CoachJoinProblem from '@/components/coach/CoachJoinProblem';
import CoachJoinReassurance from '@/components/coach/CoachJoinReassurance';

export default function CoachesJoinPage() {
    return (
        <main>
            <CoachJoinHero />
            <CoachJoinProblem />
            <CoachJoinFeatures />
            <CoachJoinPlans />
            <CoachJoinReassurance />
        </main>
    );
}