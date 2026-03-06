'use client';

import CoachesList from '@/components/CoachesList';
import ExercisesList from '@/components/ExercisesList';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
      <CoachesList />
      <ExercisesList />
    </div>
  );
}