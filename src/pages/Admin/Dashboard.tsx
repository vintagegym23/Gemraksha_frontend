import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  TrendingUp, 
  ArrowUpRight, 
  CreditCard, 
  ShoppingCart, 
  FileText, 
  MoreVertical 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 120000 },
  { name: 'Tue', revenue: 190000 },
  { name: 'Wed', revenue: 150000 },
  { name: 'Thu', revenue: 250000 },
  { name: 'Fri', revenue: 220000 },
  { name: 'Sat', revenue: 300000 },
  { name: 'Sun', revenue: 280000 },
];

const recentOrders = [
  { id: '#29381', customer: 'John Smith', email: 'john@example.com', item: 'Emerald Ring', amount: '₹45k', status: 'Paid', color: 'bg-blue-100 text-blue-600' },
  { id: '#29382', customer: 'Anjali K.', email: 'anjali@example.com', item: 'Ruby Necklace', amount: '₹1.2L', status: 'Pending', color: 'bg-pink-100 text-pink-600' },
  { id: '#29383', customer: 'Vikram R.', email: 'vikram@example.com', item: 'Diamond Studs', amount: '₹85k', status: 'Shipped', color: 'bg-purple-100 text-purple-600' },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Section: Live Rate & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live Gold Rate Card */}
          <div className="lg:col-span-12 xl:col-span-4 bg-gradient-to-br from-primary to-purple-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute left-10 bottom-10 w-20 h-20 bg-purple-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                LIVE UPDATES
              </div>
              <TrendingUp className="w-5 h-5 text-white/80" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white/80 text-sm font-medium mb-1">Live Gold Rate (24K)</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <h2 className="text-4xl font-bold">₹6,250<span className="text-lg font-normal text-white/70">/g</span></h2>
                <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> 1.2%
                </span>
              </div>
              <p className="text-xs text-white/50">Last updated: 10:42 AM</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-primary">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">+15%</span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Sales</h3>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">₹1.2M</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-full">+4</span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">New Orders</h3>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">24</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-full">+2</span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Bookings</h3>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">8</h2>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Revenue</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Weekly Sales Overview</p>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-primary">₹4.5L</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last 7 Days</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7E22CE" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7E22CE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#7E22CE" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Orders</h3>
            <button className="text-sm text-primary hover:text-purple-700 font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold", order.color)}>
                          {order.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{order.item}</td>
                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold",
                        order.status === 'Paid' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        order.status === 'Pending' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-center">
            <button className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 transition-colors flex items-center gap-1">
              Load More
            </button>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 pb-4">
          © 2023 GEMRAKSHA. All rights reserved.
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
