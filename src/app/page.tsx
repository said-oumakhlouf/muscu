'use client';
import CoachWelcome from '@/components/CoachWelcome';
import Hero from '@/components/Hero';
import HomeCoaches from '@/components/HomeCoaches';
import HomeCTA from '@/components/HomeCTA';
import HomeFeatures from '@/components/HomeFeatures';
import { useAuth } from '@/context/AuthContext';


export default function Home() {
  const { token, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen bg-[#1A1A2E]" />;

  if (token) return <CoachWelcome />;

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <HomeFeatures />
      <HomeCoaches />
      <HomeCTA />
    </div>
  );
}