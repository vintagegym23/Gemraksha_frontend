import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  ChevronRight, 
  HelpCircle, 
  Plus, 
  Edit, 
  Globe, 
  Diamond,
  Search
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const variants = [
  { id: 1, class: 'Sub-Carat Entry', range: '0.5 - 0.99 ct', multiplier: '1.0x', type: 'Base Price', status: 'Active', color: 'bg-blue-100 text-blue-800' },
  { id: 2, class: 'Standard Carat', range: '1.0 - 1.49 ct', multiplier: '1.25x', type: '+ Premium', status: 'Active', color: 'bg-purple-100 text-purple-800' },
  { id: 3, class: 'Premium Range', range: '1.5 - 1.99 ct', multiplier: '1.5x', type: '+ High Value', status: 'Active', color: 'bg-purple-100 text-purple-800' },
  { id: 4, class: 'Rare Find', range: '2.00 - 2.99 ct', multiplier: '2.1x', type: 'Rare Find Multiplier', status: 'Review', color: 'bg-yellow-100 text-yellow-800' },
  { id: 5, class: 'Investment Grade', range: '3.00+ ct', multiplier: '3.5x', type: 'Custom Negotiation', status: 'Draft', color: 'bg-red-100 text-red-800' },
];

const CaratManagement = () => {
  return (
    <AdminLayout title="Carat Variants">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 font-serif">Manage Carat Sizes</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">Define and update carat weight ranges and pricing modifiers for your gemstone inventory. Changes affect global pricing calculations.</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Guide
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Variant
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Standards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                  <Globe className="w-8 h-8" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-serif">Global Standards</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Apply universal carat rules across all gems. Set baseline multipliers that serve as the default for new inventory items.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Diamond className="w-8 h-8" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-serif">Gemstone Specific</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Customize rules for specific stones (e.g., Ruby vs. Sapphire). Override global defaults for premium stone types.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary to-purple-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-gold opacity-20 rounded-full blur-xl"></div>
              <h4 className="font-serif text-lg mb-4 relative z-10">Inventory Insight</h4>
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="text-purple-200 text-sm">Most Popular Range</span>
                <span className="font-bold">0.5 - 0.99 ct</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full mb-4 relative z-10">
                <div className="bg-gold h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between items-center relative z-10">
                <span className="text-purple-200 text-sm">Avg. Multiplier</span>
                <span className="font-bold">1.25x</span>
              </div>
            </div>
          </div>

          {/* Right Column: Table */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  Active Variants
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">12 Active</span>
                </h3>
                <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                  <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all">All Weights</button>
                  <button className="px-4 py-1.5 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">Small (&lt;1ct)</button>
                  <button className="px-4 py-1.5 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">Medium (1-3ct)</button>
                </div>
              </div>

              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
                      <th className="px-6 py-4 font-medium">Weight Class</th>
                      <th className="px-6 py-4 font-medium">Range</th>
                      <th className="px-6 py-4 font-medium">Multiplier</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {variants.map((v) => (
                      <tr key={v.id} className="group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-serif font-bold text-sm">
                              {v.range.split(' ')[0]}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{v.class}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Pricing tier</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", v.color.replace('text-', 'dark:text-').replace('bg-', 'dark:bg-opacity-20 bg-'))}>
                            {v.range}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{v.multiplier}</span>
                            <span className="text-xs text-gray-500">{v.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "h-2 w-2 rounded-full",
                              v.status === 'Active' ? "bg-green-500" : v.status === 'Review' ? "bg-yellow-500 animate-pulse" : "bg-gray-300"
                            )}></span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{v.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/30 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-white dark:hover:bg-gray-700">Previous</button>
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CaratManagement;
