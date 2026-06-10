import { useState } from 'react';
import { useStore } from '../store';
import { PackageSearch, PenSquare, LayoutDashboard, ShoppingCart, Loader } from 'lucide-react';
import { Product } from '../types';

export function Admin() {
  const { products, orders, updateProduct, updateOrderStatus } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const product = products[0]; // Assuming featured single product for this simplified view

  const handleProductUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-brand-200">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-900">Admin Dashboard</h1>
            <p className="text-brand-600 mt-2">Manage your Bossed Hearts boutique store</p>
          </div>
          <div className="flex bg-brand-50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-white shadow-sm text-brand-900' : 'text-brand-600 hover:text-brand-900'}`}
            >
              <ShoppingCart size={16} className="mr-2" /> Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-white shadow-sm text-brand-900' : 'text-brand-600 hover:text-brand-900'}`}
            >
              <PackageSearch size={16} className="mr-2" /> Product
            </button>
          </div>
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-brand-900">Recent Orders</h2>
              <span className="text-sm font-medium text-brand-500">{orders.length} total</span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-brand-50 rounded-2xl border border-brand-100">
                <LayoutDashboard size={40} className="mx-auto text-brand-300 mb-4" />
                <p className="text-brand-600 font-medium text-lg">No orders yet</p>
                <p className="text-brand-400 mt-1">Orders placed by customers will appear here.</p>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-brand-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-brand-200">
                    <thead className="bg-brand-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-brand-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-brand-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-brand-500 uppercase tracking-wider">Customer</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-brand-500 uppercase tracking-wider">Total</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-brand-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-brand-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-brand-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-brand-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-brand-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-900">
                            <div className="font-medium text-brand-900">{order.customerName}</div>
                            <div className="text-brand-500 text-xs">{order.city}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-900">${order.total.toFixed(2)} <span className="text-xs text-brand-400 ml-1">(COD)</span></td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as Product['features'][0]['title'] | any)}
                              className="text-sm border-brand-200 rounded-md bg-white focus:ring-brand-500 focus:border-brand-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            {editingProduct ? (
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200">
                <h2 className="text-2xl font-serif text-brand-900 mb-6">Edit Product</h2>
                <form onSubmit={handleProductUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Product Name</label>
                    <input 
                      type="text" 
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full rounded-md border-brand-300 p-2 border bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                      className="w-full rounded-md border-brand-300 p-2 border bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Description</label>
                    <textarea 
                      rows={5}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="w-full rounded-md border-brand-300 p-2 border bg-white" 
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="bg-brand-900 text-white px-6 py-2 rounded-md hover:bg-brand-800 transition-colors">Save Changes</button>
                    <button type="button" onClick={() => setEditingProduct(null)} className="bg-white text-brand-600 border border-brand-200 px-6 py-2 rounded-md hover:bg-brand-50 transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-brand-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-brand-100 h-64 md:h-auto relative">
                  <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-brand-900">{product.name}</h3>
                      <p className="text-xl text-brand-600 mt-1">${product.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => setEditingProduct(product)} className="flex items-center text-sm font-medium bg-brand-100 text-brand-900 px-4 py-2 rounded-lg hover:bg-brand-200 transition-colors">
                      <PenSquare size={16} className="mr-2" /> Edit
                    </button>
                  </div>
                  <p className="text-brand-600 leading-relaxed max-w-2xl">{product.description}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
