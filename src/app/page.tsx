'use client';

import CoachesList from '@/components/CoachesList';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-500 p-10">
      <CoachesList />
    </div>
  );
}