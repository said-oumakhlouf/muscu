'use client';
import CoachWelcome from '@/components/CoachWelcome';
import Hero from '@/components/Hero';
import HomeCertifications from '@/components/HomeCertifications';
import HomeCoaches from '@/components/HomeCoaches';
import HomeCTA from '@/components/HomeCTA';
import HomeFAQ from '@/components/HomeFAQ';
import HomeFeatures from '@/components/HomeFeatures';
import HomeHowItWorks from '@/components/HomeHowItWorks';
import HomeTransformation from '@/components/HomeTransfprmation';
import { useAuth } from '@/context/AuthContext';


export default function Home() {
  const { token, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen bg-[#1A1A2E]" />;

  if (token) return <CoachWelcome />;

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <HomeFeatures />
      <HomeTransformation />
      <HomeHowItWorks />
      <HomeCertifications />
      <HomeCoaches />
      <HomeCTA />
      <HomeFAQ />
    </div>
  );
}