import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Tag, 
  Image, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X,
  Diamond,
  TrendingUp,
  Video
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
}

export const AdminLayout = ({ children, title, showSearch = true }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag, badge: 3 },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Banners', path: '/admin/banners', icon: Image },
    { name: 'Bookings', path: '/admin/bookings', icon: Video, badge: 3 },
    { name: 'Live Rates', path: '/admin/rates', icon: TrendingUp },
    { name: 'Customers', path: '/admin/customers', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20 shadow-lg">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 px-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary tracking-wide">
            <Diamond className="w-6 h-6" />
            GEMRAKSHA
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                isActive(item.path)
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
              {item.badge && (
                <span className={cn(
                  "ml-auto py-0.5 px-2 rounded-full text-xs",
                  isActive(item.path) ? "bg-white/20 text-white" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link to="/admin/settings" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-1"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-40 transform transition-transform duration-300 ease-in-out md:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary tracking-wide">
            <Diamond className="w-6 h-6" />
            GEMRAKSHA
          </Link>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                isActive(item.path)
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
              {item.badge && (
                <span className={cn(
                  "ml-auto py-0.5 px-2 rounded-full text-xs",
                  isActive(item.path) ? "bg-white/20 text-white" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 z-10">
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="ml-3 font-bold text-lg text-primary flex items-center gap-1">
              <Diamond className="w-4 h-4" /> GEMRAKSHA
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center">
            {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>}
            {showSearch && (
              <div className={cn("relative w-96", title ? "ml-8" : "")}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-4 h-4 text-gray-400" />
                </span>
                <input 
                  className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                  placeholder="Search orders, customers..." 
                  type="text"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
              </div>
              <img 
                alt="Admin Profile" 
                className="h-9 w-9 rounded-full ring-2 ring-primary cursor-pointer hover:ring-opacity-80 transition-all" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
