import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FaceRecognition from './FaceRecognition';
import AttendanceTable from './AttendanceTable';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar,
  LogOut,
  Menu,
  X,
  Scan,
  BarChart3,
  Settings,
  UserCheck,
  Activity,
  Zap,
  Shield,
  Bell,
  Search
} from 'lucide-react';
import { AttendanceRecord } from '../types';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Mock attendance data
    const mockRecords: AttendanceRecord[] = [
      {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'Alex Morgan',
        checkIn: '09:00',
        checkOut: '17:30',
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'present',
        workingHours: 8.5,
        department: 'IT'
      },
      {
        id: '2',
        employeeId: 'EMP002',
        employeeName: 'Sarah Chen',
        checkIn: '08:45',
        checkOut: '17:15',
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'present',
        workingHours: 8.5,
        department: 'HR'
      },
      {
        id: '3',
        employeeId: 'EMP003',
        employeeName: 'Michael Rodriguez',
        checkIn: '09:15',
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'late',
        workingHours: 0,
        department: 'Engineering'
      },
      {
        id: '4',
        employeeId: 'EMP004',
        employeeName: 'Emma Wilson',
        checkIn: '08:30',
        checkOut: '16:45',
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'early_leave',
        workingHours: 8.25,
        department: 'Design'
      }
    ];
    setAttendanceRecords(mockRecords);
  }, []);

  const stats = [
    {
      title: 'Total Employees',
      value: '24',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      change: '+2 this month',
      trend: 'up'
    },
    {
      title: 'Present Today',
      value: '18',
      icon: UserCheck,
      color: 'from-emerald-500 to-green-600',
      change: '75% attendance',
      trend: 'up'
    },
    {
      title: 'Average Hours',
      value: '8.2',
      icon: Clock,
      color: 'from-blue-500 to-cyan-600',
      change: '+0.3 vs last week',
      trend: 'up'
    },
    {
      title: 'Late Arrivals',
      value: '3',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      change: '-2 vs yesterday',
      trend: 'down'
    }
  ];

  const navigation = [
    { id: 'overview', name: 'Overview', icon: BarChart3, badge: null },
    { id: 'recognition', name: 'Face Recognition', icon: Scan, badge: 'Live' },
    { id: 'attendance', name: 'Attendance', icon: Calendar, badge: null },
    { id: 'settings', name: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-black/20 backdrop-blur-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-white/10`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">FaceTrack</h1>
              <p className="text-xs text-purple-300/60">v2.1.0</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-purple-200 p-2 rounded-xl hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-indigo-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                    activeTab === item.id ? 'text-purple-300' : 'text-purple-400 group-hover:text-purple-300'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="flex items-center mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
              alt={user?.name}
              className="w-12 h-12 rounded-xl mr-3 border-2 border-purple-500/30"
            />
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{user?.name}</p>
              <p className="text-purple-300/70 text-xs capitalize flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                {user?.role}
              </p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-purple-200 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all border border-transparent group"
          >
            <LogOut className="w-4 h-4 mr-3 group-hover:text-red-400 transition-colors" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 relative z-10">
        {/* Header */}
        <header className="bg-black/10 backdrop-blur-2xl border-b border-white/10 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white hover:text-purple-200 mr-4 p-2 rounded-xl hover:bg-white/10 transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent capitalize">
                  {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.replace('_', ' ')}
                </h2>
                <p className="text-purple-200/70 flex items-center mt-1">
                  <Activity className="w-4 h-4 mr-2" />
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group">
                <Bell className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
              </button>
              <div className="text-right">
                <p className="text-white font-medium">{format(new Date(), 'EEEE, MMMM d')}</p>
                <p className="text-purple-200/70 text-sm flex items-center justify-end">
                  <Clock className="w-3 h-3 mr-1" />
                  {format(new Date(), 'h:mm a')}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 text-purple-400 mr-1" />
                          <span className="text-xs text-purple-300">Live</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">{stat.value}</h3>
                      <p className="text-purple-200/80 text-sm mb-3 font-medium">{stat.title}</p>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${stat.trend === 'up' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                        <p className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-purple-400" />
                    Today's Attendance
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">Live Updates</span>
                  </div>
                </div>
                <AttendanceTable records={attendanceRecords} />
              </div>
            </div>
          )}

          {activeTab === 'recognition' && (
            <div className="max-w-6xl mx-auto">
              <FaceRecognition />
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                Attendance Records
              </h3>
              <AttendanceTable records={attendanceRecords} showFilters />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-purple-400" />
                  System Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all group">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Scan className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-purple-100 transition-colors">Face Recognition</h4>
                        <p className="text-purple-300/70 text-sm">AI Detection Settings</p>
                      </div>
                    </div>
                    <p className="text-purple-200/80 text-sm mb-4">Configure face detection sensitivity and recognition threshold for optimal accuracy.</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200 text-sm">Recognition Confidence</span>
                        <span className="text-purple-100 text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all group">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Clock className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-purple-100 transition-colors">Attendance Rules</h4>
                        <p className="text-purple-300/70 text-sm">Working Hours Policy</p>
                      </div>
                    </div>
                    <p className="text-purple-200/80 text-sm mb-4">Manage working hours, late policies, and overtime calculation settings.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Work Start</span>
                        <span className="text-white font-medium">9:00 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Work End</span>
                        <span className="text-white font-medium">5:30 PM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Late Threshold</span>
                        <span className="text-white font-medium">15 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;