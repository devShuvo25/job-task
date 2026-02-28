
/* eslint-disable @typescript-eslint/no-explicit-any */"use client";

import React from 'react';
import { Package, Tag, TrendingUp, MoreVertical } from 'lucide-react';
import DashboardHeader from '../DashboardHeader';
import { useGetProductsQuery } from '@/redux/api/dashboardApis';

const ProductsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery(undefined);

  return (
    <div className="p-8 space-y-8 bg-[#FAFAFA] min-h-screen">
      <DashboardHeader
        title="Product Inventory" 
        description="Manage your plans, physical goods, and track sales performance."
        onAddProject={() => console.log("Create New Product")}
      />

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Product Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Sales</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                // Skeleton Loader rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-6 bg-gray-50/10" />
                  </tr>
                ))
              ) : (
                products?.map((product: any) => (
                  <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#F1F5F3] flex items-center justify-center text-[#1B5E3F] border border-gray-100 group-hover:scale-105 transition-transform">
                          <Package size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{product.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: #{product.id.toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                          product.category === 'subscription' 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'bg-purple-50 text-purple-600 border-purple-100'
                        }`}>
                          {product.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                        <Tag size={14} className="text-gray-300" />
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">{product.sales}</span>
                        <div className="flex items-center gap-0.5 text-[10px] text-green-600 font-bold">
                          <TrendingUp size={10} /> High
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 shadow-sm hover:shadow-md">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty State if no products */}
        {!isLoading && products?.length === 0 && (
          <div className="py-20 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-sm text-gray-400">Try adding a new product to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;