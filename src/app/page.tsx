'use client';
import CoachWelcome from '@/components/CoachWelcome';
import ClientDashboard from '@/components/ClientDashboard';
import Hero from '@/components/Hero';
import HomeCertifications from '@/components/HomeCertifications';
import HomeCoaches from '@/components/HomeCoaches';
import HomeCTA from '@/components/HomeCTA';
import HomeFAQ from '@/components/HomeFAQ';
import HomeFeatures from '@/components/HomeFeatures';
import HomeHowItWorks from '@/components/HomeHowItWorks';
import HomeTransformation from '@/components/HomeTransformation';
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
      <HomeTransformation />
      <HomeHowItWorks />
      <HomeCertifications />
      <HomeCoaches />
      <HomeCTA />
      <HomeFAQ />
    </div>
  );
}