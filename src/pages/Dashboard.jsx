import { useState, useEffect } from 'react';
import { Users, UserCheck, Clock, AlertTriangle } from 'lucide-react';
import Subscribers from './Subscribers';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalActive: 0,
    todayCheckins: 0,
    expiringNext7Days: 0,
    recentRegistrations: 0
  });

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-gray-300">Active Subscribers</p>
              <h3 className="text-2xl font-bold">{stats.totalActive}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <UserCheck className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-300">Today's Check-ins</p>
              <h3 className="text-2xl font-bold">{stats.todayCheckins}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-300">Expiring Soon</p>
              <h3 className="text-2xl font-bold">{stats.expiringNext7Days}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-300">New This Week</p>
              <h3 className="text-2xl font-bold">{stats.recentRegistrations}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Subscribers Component */}
      <Subscribers />
    </div>
  );
}