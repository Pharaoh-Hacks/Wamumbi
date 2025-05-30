import React from 'react';
import { StatisticsCards } from './StatisticsCards';
import { DonationSummary } from './DonationSummary';
import { CampaignProgress } from './CampaignProgress';
import { RecentDonations } from './RecentDonations';
import { TeamOverview } from './TeamOverview';
import { UpcomingEvents } from './UpcomingEvents';
// Make sure the path and filename are correct and exist; update as needed:
import { useAuth } from '../../contexts/AuthContext';
import { EditPermissionGate, AdminGate } from '../auth/PermissionGate';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Charity Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back, {user?.name || 'Guest'}! 
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
              {user?.role || 'Guest'}
            </span>
          </p>
        </div>
        
        <div className="flex space-x-3">
          <AdminGate>
            <button className="btn-primary flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <i className="ri-download-line mr-2"></i> Export Report
            </button>
          </AdminGate>
          
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
            <i className="ri-filter-3-line mr-2"></i> Filter
          </button>
        </div>
      </div>
      
      <StatisticsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <DonationSummary />
        </div>
        <div>
          <TeamOverview />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <CampaignProgress />
        <UpcomingEvents />
      </div>
      
      <div className="mt-8">
        <RecentDonations />
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Role-Based Access Control Information</h2>
          <AdminGate>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Admin View</span>
          </AdminGate>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-gray-600">
            This dashboard implements role-based access control. Different users have different permissions based on their roles:
          </p>
          
          <ul className="mt-4 space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2 mt-0.5">Admin</span>
              <div>
                <p className="font-medium text-gray-800">Full access to all features</p>
                <p className="text-sm text-gray-600">Can edit all content, export reports, and manage users</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-2 mt-0.5">Team Leader</span>
              <div>
                <p className="font-medium text-gray-800">Team and project management</p>
                <p className="text-sm text-gray-600">Can edit team information, project details, and manage team communications</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold mr-2 mt-0.5">Volunteer</span>
              <div>
                <p className="font-medium text-gray-800">Limited edit access</p>
                <p className="text-sm text-gray-600">Can view most information and participate in team discussions</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold mr-2 mt-0.5">Donor</span>
              <div>
                <p className="font-medium text-gray-800">Donation-focused view</p>
                <p className="text-sm text-gray-600">Can view campaigns and make donations, but limited edit access</p>
              </div>
            </li>
          </ul>

          <EditPermissionGate 
            resource="campaigns"
            fallback={
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-500">You are currently in view-only mode for most content. Contact an administrator if you need additional permissions.</p>
              </div>
            }
          >
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">You have edit permissions for some content in this dashboard. Look for edit buttons throughout the interface.</p>
            </div>
          </EditPermissionGate>
        </div>
      </div>
    </div>
  );
}