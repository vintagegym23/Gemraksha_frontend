import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  Plus, 
  X, 
  Info, 
  Check,
  Diamond
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const AddProduct = () => {
  const navigate = useNavigate();
  const [metalType, setMetalType] = useState('gold');
  const [isInStock, setIsInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  return (
    <AdminLayout showSearch={false}>
      <div className="space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/admin/products')}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new listing for the GemRaksha catalog.</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition mr-2">
              Save Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Imagery */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                Product Imagery
              </h2>
              
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-primary border-dashed rounded-xl bg-purple-50 dark:bg-purple-900/10 relative group hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <div className="mx-auto h-12 w-12 text-primary rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                      <span>Tap to upload image</span>
                      <input className="sr-only" name="file-upload" type="file" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <img 
                    alt="Thumbnail 1" 
                    className="object-cover w-full h-full" 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  />
                  <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">Cover</div>
                </div>
                <div className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Plus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <p className="text-xs text-blue-700 dark:text-blue-300">
                High-quality images increase sales. Aim for at least 3 images showing different angles.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                Basic Information
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Title</label>
                  <input 
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3" 
                    placeholder="e.g. Royal Blue Sapphire" 
                    type="text" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea 
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" 
                    placeholder="Detailed description of the gemstone..." 
                    rows={4}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-7 pr-12 focus:border-primary focus:ring-primary sm:text-sm py-3" 
                        placeholder="0.00" 
                        type="number" 
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carat Weight</label>
                    <div className="relative rounded-md shadow-sm">
                      <input 
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-12 focus:border-primary focus:ring-primary sm:text-sm py-3" 
                        placeholder="0.00" 
                        step="0.01" 
                        type="number" 
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">ct</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origin</label>
                  <select className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3">
                    <option>Select Origin</option>
                    <option>Sri Lanka</option>
                    <option>Madagascar</option>
                    <option>Burma</option>
                    <option>Kashmir</option>
                    <option>Columbia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Metal Type</label>
                  <div className="flex flex-wrap gap-3">
                    {['Gold', 'Silver', 'Platinum', 'Loose Gem'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMetalType(type.toLowerCase().replace(' ', ''))}
                        className={cn(
                          "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                          metalType === type.toLowerCase().replace(' ', '')
                            ? "bg-purple-50 text-primary border-primary ring-1 ring-primary"
                            : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">In Stock</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Available for purchase immediately.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsInStock(!isInStock)}
                      className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        isInStock ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
                      )}
                    >
                      <span className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isInStock ? "translate-x-5" : "translate-x-0"
                      )}></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Featured</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Show on homepage highlights.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsFeatured(!isFeatured)}
                      className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        isFeatured ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
                      )}
                    >
                      <span className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isFeatured ? "translate-x-5" : "translate-x-0"
                      )}></span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center" type="submit">
                    <Check className="w-4 h-4 mr-2" />
                    Save Product
                  </button>
                  <button 
                    onClick={() => navigate('/admin/products')}
                    className="flex-1 bg-transparent border border-gold text-gold hover:bg-gold hover:text-white dark:hover:text-black font-semibold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center" 
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
