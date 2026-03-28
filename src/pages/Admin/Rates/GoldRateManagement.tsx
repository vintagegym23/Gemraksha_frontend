import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  History, 
  Settings, 
  AlertTriangle, 
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Globe,
  Database
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { time: '09:00', rate: 5840 },
  { time: '10:00', rate: 5855 },
  { time: '11:00', rate: 5845 },
  { time: '12:00', rate: 5860 },
  { time: '13:00', rate: 5875 },
  { time: '14:00', rate: 5865 },
  { time: '15:00', rate: 5880 },
  { time: '16:00', rate: 5895 },
  { time: '17:00', rate: 5890 },
];

const history = [
  { id: 1, date: 'Oct 24, 2023', time: '17:45', rate: '5,890.00', change: '+15.00', type: 'Auto', status: 'Success' },
  { id: 2, date: 'Oct 24, 2023', time: '16:00', rate: '5,895.00', change: '+15.00', type: 'Auto', status: 'Success' },
  { id: 3, date: 'Oct 24, 2023', time: '14:30', rate: '5,865.00', change: '-10.00', type: 'Manual', status: 'Success' },
  { id: 4, date: 'Oct 24, 2023', time: '12:00', rate: '5,860.00', change: '+15.00', type: 'Auto', status: 'Success' },
  { id: 5, date: 'Oct 24, 2023', time: '10:00', rate: '5,855.00', change: '+15.00', type: 'Auto', status: 'Failed' },
];

const GoldRateManagement = () => {
  return (
    <AdminLayout title="Gold Rates">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Live Gold Rate Management</h1>
            <p className="text-gray-500 dark:text-gray-400">Configure real-time pricing updates and manual overrides for gold-based jewelry.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-800 text-xs font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Sync Active
            </div>
            <button className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary transition-colors shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Rate Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Current Rate</p>
                      <p className="text-xs opacity-60">24K Gold / 10g</p>
                    </div>
                  </div>
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold font-serif">₹5,890</span>
                  <span className="text-xl opacity-80">.00</span>
                </div>
                
                <div className="flex items-center gap-2 text-green-100 font-bold bg-green-900/20 w-fit px-3 py-1 rounded-full text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  +1.24% today
                </div>

                <div className="mt-10 pt-6 border-t border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs opacity-80">
                    <Clock className="w-4 h-4" />
                    Last updated: 2 mins ago
                  </div>
                  <button className="text-xs font-bold underline underline-offset-4 hover:text-white transition-colors">
                    Manual Override
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Data Sources
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                      <Database className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Bullion API</p>
                      <p className="text-[10px] text-green-500 font-bold uppercase">Primary</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                      <Database className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">MetalPrice.io</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Backup</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart and History */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white">Price Trend (24h)</h3>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                  <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm">24H</button>
                  <button className="px-4 py-1.5 text-xs font-bold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">7D</button>
                  <button className="px-4 py-1.5 text-xs font-bold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">1M</button>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 12, fill: '#9ca3af'}} 
                    />
                    <YAxis 
                      hide 
                      domain={['dataMin - 50', 'dataMax + 50']} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        backgroundColor: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#D4AF37" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRate)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-gray-400" />
                  Update History
                </h3>
                <button className="text-sm font-bold text-primary hover:underline">View Full Logs</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rate (₹)</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {history.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{item.date}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                          ₹{item.rate}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-xs font-bold flex items-center gap-1",
                            item.change.startsWith('+') ? "text-green-600" : "text-red-600"
                          )}>
                            {item.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {item.change}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                            item.type === 'Auto' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                          )}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {item.status === 'Success' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GoldRateManagement;
