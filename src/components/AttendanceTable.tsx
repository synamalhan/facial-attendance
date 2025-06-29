import React, { useState } from 'react';
import { Search, Filter, Download, Clock, CheckCircle, AlertTriangle, XCircle, Calendar, TrendingUp } from 'lucide-react';
import { AttendanceRecord } from '../types';
import { format } from 'date-fns';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  showFilters?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, showFilters = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'late':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'early_leave':
        return <Clock className="w-4 h-4 text-orange-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'late':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'absent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'early_leave':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const departments = [...new Set(records.map(r => r.department))];

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm min-w-[140px]"
              >
                <option value="all" className="bg-purple-900">All Status</option>
                <option value="present" className="bg-purple-900">Present</option>
                <option value="late" className="bg-purple-900">Late</option>
                <option value="absent" className="bg-purple-900">Absent</option>
                <option value="early_leave" className="bg-purple-900">Early Leave</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm min-w-[160px]"
              >
                <option value="all" className="bg-purple-900">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-purple-900">{dept}</option>
                ))}
              </select>

              <button className="flex items-center px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{filteredRecords.filter(r => r.status === 'present').length}</p>
              <p className="text-purple-200/70 text-sm">Present</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{filteredRecords.filter(r => r.status === 'late').length}</p>
              <p className="text-purple-200/70 text-sm">Late</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">{filteredRecords.filter(r => r.status === 'absent').length}</p>
              <p className="text-purple-200/70 text-sm">Absent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">{filteredRecords.filter(r => r.status === 'early_leave').length}</p>
              <p className="text-purple-200/70 text-sm">Early Leave</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left py-4 px-6 text-purple-200 font-semibold">Employee</th>
                <th className="text-left py-4 px-6 text-purple-200 font-semibold">Department</th>
                <th className="text-left py-4 px-6 text-purple-200 font-semibold">Check In</th>
                <th className="text-left py-4 px-6 text-purple-200 font-semibold">Check Out</th>
                <th className="text-left py-4 px-6 text-purple-200 font-semibold">Hours</th>
                <th className="text-left py-4 px-6 text-purple-200 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={record.id} className={`border-b border-white/5 hover:bg-white/5 transition-all duration-200 ${index % 2 === 0 ? 'bg-white/2' : ''}`}>
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-purple-300 font-bold text-sm">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{record.employeeName}</p>
                        <p className="text-purple-300/70 text-sm">{record.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">
                      {record.department}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-white font-medium">{record.checkIn || '-'}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-white font-medium">{record.checkOut || '-'}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-white font-medium">{record.workingHours || 0}h</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className={`inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold border backdrop-blur-sm ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-2 capitalize">{record.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-purple-300 text-lg font-medium">No attendance records found</p>
              <p className="text-purple-400/70 text-sm mt-2">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;