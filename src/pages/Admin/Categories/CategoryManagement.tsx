import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Delete, 
  Eye, 
  ChevronRight, 
  ChevronDown,
  Diamond,
  Gem,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const categories = [
  { id: 1, name: 'Precious Stones', count: 156, status: 'Active', icon: Diamond, color: 'text-blue-600 bg-blue-50' },
  { id: 2, name: 'Semi-Precious', count: 84, status: 'Active', icon: Gem, color: 'text-purple-600 bg-purple-50' },
  { id: 3, name: 'Birthstones', count: 42, status: 'Active', icon: Sparkles, color: 'text-yellow-600 bg-yellow-50' },
  { id: 4, name: 'Rare Collections', count: 12, status: 'Draft', icon: Layers, color: 'text-red-600 bg-red-50' },
];

const CategoryManagement = () => {
  return (
    <AdminLayout title="Categories">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Category Management</h1>
            <p className="text-gray-500 dark:text-gray-400">Organize your gemstone catalog into logical collections and hierarchies.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" />
            Add New Category
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Category Hierarchy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-primary focus:border-primary" 
                    placeholder="Search categories..." 
                    type="text" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                    <Layers className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-1 text-gray-400 hover:text-primary transition-colors cursor-pointer">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cat.color.replace('text-', 'dark:text-').replace('bg-', 'dark:bg-opacity-20 bg-'))}>
                          <cat.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{cat.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{cat.count} products</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                          cat.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        )}>
                          {cat.status}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Delete className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Insights */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-6">Quick Insights</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-primary flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Total Categories</p>
                      <p className="text-xs text-gray-500">Across all levels</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                      <Diamond className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Top Category</p>
                      <p className="text-xs text-gray-500">Precious Stones</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">156</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest font-bold">Pro Tip</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Organize categories by gemstone type or birth month to help customers find what they're looking for faster.
                </p>
                <button className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                  Read Guide
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryManagement;
