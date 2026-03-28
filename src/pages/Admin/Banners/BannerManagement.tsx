import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  ArrowLeft, 
  Settings, 
  Timer, 
  CloudUpload, 
  Link as LinkIcon, 
  Delete, 
  Edit,
  Eye
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const banners = [
  { id: 1, title: 'Emerald Collection Launch', date: 'Today, 10:23 AM', priority: 1, link: '/collections/emerald-new', status: 'Active', image: 'https://images.unsplash.com/photo-1588444837495-c6cfaf50c8a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' },
  { id: 2, title: 'Ruby Red Sale', date: 'Yesterday, 4:15 PM', priority: 2, link: '/sale/ruby-discount', status: 'Active', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' },
  { id: 3, title: 'Sapphire Showcase', date: 'Starts: Nov 15, 2023', priority: 3, link: '/showcase/sapphire', status: 'Scheduled', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' },
];

const BannerManagement = () => {
  return (
    <AdminLayout showSearch={false}>
      <div className="space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Banner Management</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">Manage the visibility and order of your GEMRAKSHA homepage hero carousel. Changes are reflected immediately.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Preview
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all">
              Save Changes
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Settings and Upload */}
          <div className="space-y-6 xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-lg text-gray-900 dark:text-white">Carousel Settings</h3>
                <Settings className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Auto-slide Duration</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time between slides</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input className="w-16 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center py-1 text-sm focus:ring-primary focus:border-primary" type="number" defaultValue={5} />
                  <span className="text-sm text-gray-500">sec</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
              <h3 className="font-serif font-semibold text-lg text-gray-900 dark:text-white mb-4">Upload New Banner</h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CloudUpload className="w-8 h-8 text-primary" />
                </div>
                <p className="text-gray-900 dark:text-white font-medium mb-1">Click or Drag to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">High-res JPG or PNG (1920×600 recommended)</p>
                <button className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-medium shadow-sm hover:shadow text-primary dark:text-primary-light">
                  Browse Files
                </button>
              </div>
            </div>
          </div>

          {/* Banner List */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-serif font-semibold text-xl text-gray-900 dark:text-white">Active Banners</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full">
                  3 Active
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {banners.map((banner) => (
                  <div key={banner.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-64 h-32 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                        <img alt={banner.title} className={cn("w-full h-full object-cover", banner.status === 'Scheduled' ? "filter grayscale" : "")} src={banner.image} />
                        <div className={cn(
                          "absolute top-2 left-2 px-2 py-0.5 text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow-sm",
                          banner.status === 'Active' ? "bg-green-500" : "bg-gray-500"
                        )}>
                          {banner.status}
                        </div>
                        {banner.status === 'Scheduled' && <div className="absolute inset-0 bg-black/10"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{banner.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last edited: {banner.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded border border-purple-200 dark:border-purple-800">Priority: {banner.priority}</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-4 border border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Target Link</p>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-mono truncate">
                            <LinkIcon className="w-4 h-4 text-gray-400" />
                            {banner.link}
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                            <Delete className="w-4 h-4" />
                            Delete
                          </button>
                          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BannerManagement;
