'use client';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import DonationProgress from '@/components/dashboard';
import { 
  RecentDonations, 
  UpcomingEvents 
} from '@/components/dashboard';
import TeamCards from '@/components/dashboard';
import React from 'react';

// Define the dashboard stats interface
interface DashboardStats {
  activeVolunteers: number;
  monthlyDonations: number;
  upcomingEvents: number;
  activeProjects: number;
  nextEventDate: string;
}

// StatCards component
interface StatCardsProps {
  stats: DashboardStats;
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  // TODO: Replace with actual stat card UI
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-gray-500 text-sm mb-2">Active Volunteers</div>
        <div className="text-2xl font-bold">{stats.activeVolunteers}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-gray-500 text-sm mb-2">Monthly Donations</div>
        <div className="text-2xl font-bold">{stats.monthlyDonations}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-gray-500 text-sm mb-2">Upcoming Events</div>
        <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-gray-500 text-sm mb-2">Active Projects</div>
        <div className="text-2xl font-bold">{stats.activeProjects}</div>
      </div>
    </div>
  );
};

// Client component for dashboard content
function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    setIsLoading(false);
  }
};
    fetchDashboardData();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard | CharityConnect</title>
      </Head>
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {isLoading ? (
          // Loading state 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          // Stat cards section
          stats && <StatCards stats={stats} />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Donation progress section */}
          <div className="lg:col-span-2">
            <DonationProgress />
          </div>
          
          {/* Team cards section */}
          <div>
            <TeamCards />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent donations section */}
          <RecentDonations />
          
          {/* Upcoming events section */}
          <UpcomingEvents />
        </div>
      </div>
    </>
  );
};
export default DashboardContent;