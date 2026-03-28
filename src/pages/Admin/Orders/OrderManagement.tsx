import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const orders = [
  { id: '#ORD-7829', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', date: 'Oct 24, 2023', total: '$1,240.00', status: 'Delivered', method: 'Credit Card', items: 2 },
  { id: '#ORD-7830', customer: 'Michael Chen', email: 'm.chen@example.com', date: 'Oct 24, 2023', total: '$850.00', status: 'Processing', method: 'PayPal', items: 1 },
  { id: '#ORD-7831', customer: 'Emma Wilson', email: 'emma.w@example.com', date: 'Oct 23, 2023', total: '$2,100.00', status: 'Shipped', method: 'Bank Transfer', items: 3 },
  { id: '#ORD-7832', customer: 'James Miller', email: 'james.m@example.com', date: 'Oct 23, 2023', total: '$450.00', status: 'Cancelled', method: 'Credit Card', items: 1 },
  { id: '#ORD-7833', customer: 'Olivia Brown', email: 'olivia.b@example.com', date: 'Oct 22, 2023', total: '$3,200.00', status: 'Pending', method: 'Credit Card', items: 4 },
];

const OrderManagement = () => {
  return (
    <AdminLayout title="Orders">
      <div className="space-y-8">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Order Management</h1>
            <p className="text-gray-500 dark:text-gray-400">Track, manage and fulfill customer orders across all channels.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full uppercase tracking-wider">Pending</span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">24</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full uppercase tracking-wider">Shipped</span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Transit</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">156</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full uppercase tracking-wider">Completed</span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered Today</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">42</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                <XCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full uppercase tracking-wider">Cancelled</span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Returns/Cancelled</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8</h3>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-primary focus:border-primary" 
                placeholder="Search orders, customers, IDs..." 
                type="text" 
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
              <select className="text-sm font-medium text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Highest Amount</option>
                <option>Status</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-bold text-primary">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {order.date}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{order.total}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{order.items} items • {order.method}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                        order.status === 'Delivered' ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                        order.status === 'Shipped' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                        order.status === 'Processing' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" :
                        order.status === 'Cancelled' ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" :
                        "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-bold">1-5</span> of <span className="font-bold">1,240</span> orders</p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                <button className="w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm font-medium">2</button>
                <button className="w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm font-medium">3</button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm font-medium">248</button>
              </div>
              <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
