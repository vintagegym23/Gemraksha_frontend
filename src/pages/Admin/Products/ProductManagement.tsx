import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Diamond,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const products = [
  { id: 1, name: 'Royal Blue Sapphire', category: 'Precious Stones', price: '$2,450', stock: 12, status: 'In Stock', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Natural Red Ruby', category: 'Precious Stones', price: '$3,100', stock: 5, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Zambian Emerald', category: 'Precious Stones', price: '$1,850', stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1588444837495-c6cfaf50c8a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 4, name: 'Yellow Topaz', category: 'Semi-Precious', price: '$450', stock: 24, status: 'In Stock', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 5, name: 'Amethyst Cluster', category: 'Semi-Precious', price: '$320', stock: 18, status: 'In Stock', image: 'https://images.unsplash.com/photo-1569337715918-3294a799568a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
];

const ProductManagement = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Products">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Product Catalog</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your gemstone inventory, pricing, and availability.</p>
          </div>
          <button 
            onClick={() => navigate('/admin/products/add')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-primary focus:border-primary" 
              placeholder="Search by name, SKU, or category..." 
              type="text" 
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
                          <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{product.name}</p>
                          <p className="text-xs text-gray-500">SKU: GEM-{1000 + product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{product.stock} units</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        product.status === 'In Stock' ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                        product.status === 'Low Stock' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" :
                        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-bold">1-5</span> of <span className="font-bold">156</span> products</p>
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
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
