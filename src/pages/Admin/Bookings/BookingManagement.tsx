import React from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Video,
  Store
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const bookings = [
  { id: '#BK-1024', customer: 'Ananya Sharma', type: 'In-Store', date: 'Oct 28, 2023', time: '11:00 AM', status: 'Confirmed', contact: '+91 98765 43210', branch: 'Mumbai Flagship' },
  { id: '#BK-1025', customer: 'Rahul Verma', type: 'Video Call', date: 'Oct 28, 2023', time: '02:30 PM', status: 'Pending', contact: '+91 98765 43211', branch: 'Online' },
  { id: '#BK-1026', customer: 'Priya Patel', type: 'In-Store', date: 'Oct 29, 2023', time: '10:00 AM', status: 'Confirmed', contact: '+91 98765 43212', branch: 'Delhi Boutique' },
  { id: '#BK-1027', customer: 'Siddharth Malhotra', type: 'Video Call', date: 'Oct 30, 2023', time: '04:00 PM', status: 'Cancelled', contact: '+91 98765 43213', branch: 'Online' },
  { id: '#BK-1028', customer: 'Kavita Reddy', type: 'In-Store', date: 'Oct 31, 2023', time: '01:00 PM', status: 'Rescheduled', contact: '+91 98765 43214', branch: 'Bangalore Store' },
];

const BookingManagement = () => {
  return (
    <AdminLayout title="Bookings">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Consultation Bookings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage in-store and virtual gemstone consultations with your experts.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shadow-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              <PlusCircle className="w-4 h-4 mr-2" />
              Manual Booking
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-md shadow-primary/20">All Bookings</button>
          <button className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">Today</button>
          <button className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">Virtual Only</button>
          <button className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">In-Store Only</button>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-primary">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-primary font-bold text-xl">
                      {booking.customer.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{booking.customer}</h3>
                      <p className="text-xs text-gray-500 font-mono">{booking.id}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    booking.status === 'Confirmed' ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                    booking.status === 'Pending' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" :
                    booking.status === 'Cancelled' ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" :
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  )}>
                    {booking.status}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span>{booking.date} at {booking.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400">
                      {booking.type === 'Video Call' ? <Video className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                    </div>
                    <span>{booking.type} • {booking.branch}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>{booking.contact}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Confirm
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Reschedule
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-bold">1-5</span> of <span className="font-bold">42</span> bookings</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-primary transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-primary transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const PlusCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="16" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

export default BookingManagement;
