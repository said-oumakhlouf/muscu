'use client';
import ClientDashboard from '@/components/client/ClientDashboard';
import CoachWelcome from '@/components/coach/CoachWelcome';
import Hero from '@/components/home/Hero';
import HomePricing from '@/components/home/HomePricing';
import HomeCertifications from '@/components/home/HomeCertifications';
import HomeCoaches from '@/components/home/HomeCoaches';
import HomeCTA from '@/components/home/HomeCTA';
import HomeFAQ from '@/components/home/HomeFAQ';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeHowItWorks from '@/components/home/HomeHowItWorks';
import HomeTransformation from '@/components/home/HomeTransformation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { token, role, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen bg-[#ece9f8]" />;

  if (token && role === 'admin') return <CoachWelcome />;
  if (token && role === 'user') return (
    <div className="min-h-screen bg-[#cec4e2]">
      <ClientDashboard />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <HomeFeatures />
      <HomePricing />
      <HomeTransformation />
      <HomeHowItWorks />
      <HomeCertifications />
      <HomeCoaches />
      <HomeCTA />
      <HomeFAQ />
    </div>
  );
}