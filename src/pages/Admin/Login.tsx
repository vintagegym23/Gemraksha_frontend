import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Diamond, ShieldCheck, TrendingUp, Package, Mail, Lock, Eye, EyeOff, LogIn, Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-4 transition-colors duration-300", isDarkMode ? "bg-gray-900" : "bg-gray-100")}>
      <div className="w-full max-w-5xl h-auto min-h-[600px] flex shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
        {/* Left Side: Branding */}
        <div className="hidden md:flex md:w-1/2 bg-primary relative flex-col justify-center items-center text-white p-12 overflow-hidden">
          {/* Background Pattern/Overlay */}
          <div className="absolute inset-0 bg-primary/80 dark:bg-primary/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-6 flex justify-center">
              <Diamond className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 drop-shadow-md">GEMRAKSHA</h1>
            <p className="text-white/80 text-lg font-light tracking-wide">Admin Portal</p>
            
            <div className="mt-12 space-y-4 text-left max-w-xs mx-auto text-white/90">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm">Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                <span className="text-sm">Inventory Management</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-auto pt-12 text-xs text-white/50 text-center">
            © 2024 GEMRAKSHA. All rights reserved.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-sm mx-auto w-full">
            <div className="md:hidden flex flex-col items-center mb-8 text-primary dark:text-purple-400">
              <Diamond className="w-12 h-12 mb-2" />
              <h2 className="text-2xl font-bold">GEMRAKSHA</h2>
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Secure Login</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg leading-5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out sm:text-sm" 
                    id="email" 
                    name="email" 
                    placeholder="admin@gemraksha.com" 
                    required 
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <button type="button" className="text-sm font-medium text-primary hover:text-primary-dark dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-lg leading-5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out sm:text-sm" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    required 
                    type={showPassword ? "text" : "password"}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 text-gray-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-primary/30" 
                type="submit"
              >
                Secure Login
                <LogIn className="ml-2 w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
              <p>Need help accessing your account?</p>
              <p className="mt-1">Contact <button className="font-medium text-primary hover:underline dark:text-purple-400">IT Support</button></p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <button 
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none ring-1 ring-gray-200 dark:ring-gray-700"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Login;
