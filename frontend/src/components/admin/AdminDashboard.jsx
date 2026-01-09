import { useState, useEffect } from 'react';
import { FaUsers, FaUserPlus, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { getLeadStats } from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getLeadStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.total || 0,
      icon: <FaUsers className="w-8 h-8" />,
      color: 'bg-blue-500',
      change: '+12% from last month',
    },
    {
      title: 'New Leads',
      value: stats?.byStatus?.new || 0,
      icon: <FaUserPlus className="w-8 h-8" />,
      color: 'bg-green-500',
      change: `${stats?.recentLeads || 0} in last 30 days`,
    },
    {
      title: 'Converted',
      value: stats?.byStatus?.converted || 0,
      icon: <FaCheckCircle className="w-8 h-8" />,
      color: 'bg-purple-500',
      change: `${stats?.conversionRate || 0}% conversion rate`,
    },
    {
      title: 'Contacted',
      value: stats?.byStatus?.contacted || 0,
      icon: <FaChartLine className="w-8 h-8" />,
      color: 'bg-orange-500',
      change: 'In progress',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100">Here's what's happening with your leads today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Status Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lead Status Breakdown</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
              <span className="text-gray-700 font-medium">New</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-bold mr-2">{stats?.byStatus?.new || 0}</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${((stats?.byStatus?.new || 0) / (stats?.total || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-3"></div>
              <span className="text-gray-700 font-medium">Contacted</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-bold mr-2">{stats?.byStatus?.contacted || 0}</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{
                    width: `${((stats?.byStatus?.contacted || 0) / (stats?.total || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
              <span className="text-gray-700 font-medium">Qualified</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-bold mr-2">{stats?.byStatus?.qualified || 0}</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${((stats?.byStatus?.qualified || 0) / (stats?.total || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span className="text-gray-700 font-medium">Converted</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-bold mr-2">{stats?.byStatus?.converted || 0}</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${((stats?.byStatus?.converted || 0) / (stats?.total || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary">View All Leads</button>
          <button className="btn-secondary">Export to CSV</button>
          <button className="btn-secondary">View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
