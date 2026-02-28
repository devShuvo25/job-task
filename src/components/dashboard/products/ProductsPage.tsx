/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Package, Tag, TrendingUp, MoreVertical, Layers } from "lucide-react";
import DashboardHeader from "../overview/DashboardHeader";
import { useGetProductsQuery } from "@/redux/api/dashboardApis";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery(undefined);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-[#FAFAFA] min-h-screen">
      <DashboardHeader
        title="Product Inventory"
        description="Manage your plans, physical goods, and track sales performance."
        onAddProject={() => console.log("Create New Product")}
      />

      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        {/* DESKTOP TABLE: Visible only on lg screens and up */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Product Details
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Price
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Sales
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-6 bg-gray-50/10" />
                    </tr>
                  ))
                : products?.map((product: any) => (
                    <TableRow key={product.id} product={product} />
                  ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE & TABLET CARD LIST: Visible on small and medium screens */}
        <div className="lg:hidden divide-y divide-gray-100">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="p-6 animate-pulse space-y-4">
                  <div className="h-12 bg-gray-100 rounded-xl w-3/4" />
                  <div className="h-4 bg-gray-50 rounded w-1/2" />
                </div>
              ))
            : products?.map((product: any) => (
                <ProductMobileCard key={product.id} product={product} />
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && products?.length === 0 && (
          <div className="py-20 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">
              No products found
            </h3>
            <p className="text-sm text-gray-400">
              Try adding a new product to see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Desktop Row Component ---
const TableRow = ({ product }: { product: any }) => (
  <tr className="group hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#F1F5F3] flex items-center justify-center text-[#1B5E3F] border border-gray-100">
          <Package size={22} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{product.name}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            ID: #{product.id}
          </p>
        </div>
      </div>
    </td>
    <td className="px-6 py-5">
      <CategoryBadge category={product.category} />
    </td>
    <td className="px-6 py-5">
      <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
        <Tag size={14} className="text-gray-300" />${product.price.toFixed(2)}
      </div>
    </td>
    <td className="px-6 py-5">
      <SalesBadge sales={product.sales} />
    </td>
    <td className="px-6 py-5 text-right">
      <MoreButton />
    </td>
  </tr>
);

// --- Mobile Card Component (The No-Scroll Solution) ---
const ProductMobileCard = ({ product }: { product: any }) => (
  <div className="p-5 flex flex-col gap-4">
    {/* Header: Icon + Name + Action */}
    <div className="flex justify-between items-start">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F1F5F3] flex items-center justify-center text-[#1B5E3F] border border-gray-100 shrink-0">
          <Package size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">
            {product.name}
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            ID: #{product.id}
          </p>
        </div>
      </div>
      <MoreButton />
    </div>

    {/* Property Grid: Shows all properties in 2 columns */}
    <div className="grid grid-cols-2 gap-y-4 pt-2 border-t border-gray-50">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
          <Layers size={10} /> Category
        </p>
        <CategoryBadge category={product.category} />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
          <Tag size={10} /> Price
        </p>
        <p className="text-sm font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
          <TrendingUp size={10} /> Total Sales
        </p>
        <SalesBadge sales={product.sales} />
      </div>
    </div>
  </div>
);

// --- Shared Small UI Components ---

const CategoryBadge = ({ category }: { category: string }) => (
  <span
    className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold border ${
      category === "subscription"
        ? "bg-blue-50 text-blue-600 border-blue-100"
        : "bg-purple-50 text-purple-600 border-purple-100"
    }`}
  >
    {category}
  </span>
);

const SalesBadge = ({ sales }: { sales: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-bold text-gray-700">{sales}</span>
    <div className="flex items-center gap-0.5 text-[10px] text-green-600 font-bold">
      <TrendingUp size={10} /> High
    </div>
  </div>
);

const MoreButton = () => (
  <button className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 shadow-sm">
    <MoreVertical size={18} />
  </button>
);

export default ProductsPage;
