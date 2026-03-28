import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  PlusCircle, 
  Search, 
  Settings2, 
  Megaphone, 
  TrendingUp, 
  Percent, 
  DollarSign, 
  Edit, 
  Delete,
  RefreshCw,
  Users,
  Calendar,
  Clock
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const coupons = [
  { code: 'GEM20OFF', type: 'percent', value: '20% Off', scope: 'Stones Only', exp: '24 Oct 2023', status: 'Active', used: 45, color: 'text-green-600 bg-green-50' },
  { code: 'DIAMOND50', type: 'fixed', value: '$50 Fixed', scope: 'All Items', exp: '01 Nov 2023', status: 'Active', used: 12, color: 'text-blue-600 bg-blue-50' },
  { code: 'WELCOME10', type: 'expired', value: '10% Off', scope: 'First Order', exp: '15 Sep 2023', status: 'Expired', used: 156, color: 'text-gray-500 bg-gray-100' },
  { code: 'HOLIDAY25', type: 'scheduled', value: '25% Off', scope: 'Holiday Collection', exp: 'Starts: 20 Dec 2023', status: 'Scheduled', used: 0, color: 'text-orange-600 bg-orange-50' },
];

const CouponManagement = () => {
  return (
    <AdminLayout title="Coupon Management">
      <div className="space-y-8">
        {/* Filters and Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full md:w-auto overflow-x-auto">
            <button className="px-6 py-2 rounded-lg bg-primary text-white shadow-sm text-sm font-medium transition-all whitespace-nowrap">All Coupons</button>
            <button className="px-6 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-all whitespace-nowrap">Active</button>
            <button className="px-6 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-all whitespace-nowrap">Expired</button>
            <button className="px-6 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-all whitespace-nowrap">Drafts</button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border-2 border-dashed border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl font-medium transition-colors shadow-sm w-full md:w-auto justify-center group">
            <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Create New Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500 opacity-20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 opacity-90">
                  <Megaphone className="w-5 h-5" />
                  <h3 className="font-medium text-lg">Active Campaigns</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">12</span>
                  <span className="text-sm opacity-80">running now</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Total Redemptions</p>
                    <p className="text-xl font-bold">1,248</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Discount Value</p>
                    <p className="text-xl font-bold">$45.2k</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Top Performing
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">%</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GEM20OFF</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">45 used</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">$</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">DIAMOND50</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">12 used</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Coupon List */}
          <div className="lg:col-span-2 space-y-4">
            {coupons.map((coupon) => (
              <div key={coupon.code} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                <div className="flex items-start gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", coupon.color.replace('text-', 'dark:text-').replace('bg-', 'dark:bg-opacity-20 bg-'))}>
                    {coupon.type === 'percent' ? <Percent className="w-6 h-6" /> : 
                     coupon.type === 'fixed' ? <DollarSign className="w-6 h-6" /> :
                     coupon.type === 'expired' ? <DollarSign className="w-6 h-6 opacity-50" /> :
                     <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{coupon.code}</h4>
                      <span className={cn(
                        "px-2 py-0.5 rounded-md text-xs font-semibold",
                        coupon.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                        coupon.status === 'Expired' ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300" :
                        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                      )}>
                        {coupon.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{coupon.value} • {coupon.scope}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Exp: {coupon.exp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                    <Users className="w-4 h-4" />
                    {coupon.used} Used
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Delete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CouponManagement;
