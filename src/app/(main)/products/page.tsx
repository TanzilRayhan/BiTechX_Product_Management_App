'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Package } from 'lucide-react';
import { useGetProductsQuery, useSearchProductsQuery, useDeleteProductMutation } from '@/store/api/productsApi';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { debounce } from '@/lib/utils';
import toast from 'react-hot-toast';

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

    const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

    const shouldSearch = debouncedSearch.length > 0;
  
  const { data: regularProducts, isLoading: isLoadingRegular, error: regularError, isFetching: isFetchingRegular } = useGetProductsQuery({
    offset,
    limit: PRODUCTS_PER_PAGE,
    categoryId: selectedCategory || undefined,
  }, { 
    skip: shouldSearch,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  
  const { data: searchProducts, isLoading: isLoadingSearch, error: searchError, isFetching: isFetchingSearch } = useSearchProductsQuery(
    debouncedSearch,
    { 
      skip: !shouldSearch,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  
  const products = shouldSearch ? searchProducts : regularProducts;
  const isLoading = shouldSearch ? isLoadingSearch : isLoadingRegular;
  const isFetching = shouldSearch ? isFetchingSearch : isFetchingRegular;
  const error = shouldSearch ? searchError : regularError;

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(searchQuery);
      setOffset(0); // Reset to first page on search
    }, 500);

    handler();
  }, [searchQuery]);

    useEffect(() => {
    setOffset(0);
  }, [selectedCategory]);

  const handleDelete = async () => {
    if (!deleteProductId) return;

    try {
      await deleteProduct(deleteProductId).unwrap();
      setDeleteProductId(null);
      toast.success('Product deleted successfully');
    } catch (error: any) {
      setDeleteProductId(null);
      toast.error(error?.data?.message || 'Failed to delete product');
      console.error('Delete error:', error);
    }
  };

  const handleNextPage = () => {
    setOffset(offset + PRODUCTS_PER_PAGE);
  };

  const handlePrevPage = () => {
    setOffset(Math.max(0, offset - PRODUCTS_PER_PAGE));
  };

  return (
    <div className="relative w-full pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#0D1821] via-[#4E6E5D] to-[#AD8A64] bg-clip-text text-transparent mb-3">
            Products
          </h1>
          <p className="text-gray-600 text-lg">Manage your product inventory with ease</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4E6E5D]" size={20} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#AD8A64] focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] placeholder-gray-400 shadow-sm hover:shadow-md"
            />
          </div>
          <Link href="/products/new" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-12 py-4 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-[#EFF1F3] rounded-xl hover:from-[#AD8A64] hover:to-[#4E6E5D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold whitespace-nowrap">
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`flex-1 px-6 sm:px-8 md:px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base min-w-[120px] ${
                selectedCategory === ''
                  ? 'bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-white shadow-lg '
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#4E6E5D] hover:shadow-md'
              }`}
            >
              All Categories
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 px-6 sm:px-8 md:px-4 py-3 rounded-xl font-medium transition-all duration-300  text-sm sm:text-base min-w-[120px] ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] rounded-xl text-white shadow-lg '
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#4E6E5D] hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>


      {!isLoading && isFetching && (
        <div className="fixed top-20 right-4 z-50 bg-white rounded-xl shadow-lg px-4 py-2 border-2 border-[#4E6E5D]/20 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#4E6E5D] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600 font-medium">Updating...</span>
          </div>
        </div>
      )}


      {isLoading && (
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      )}


      {error && !isLoading && (
        <div className="bg-gradient-to-r from-[#A44A3F]/10 to-[#A44A3F]/5 border-2 border-[#A44A3F]/20 rounded-2xl p-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-[#A44A3F]/10 rounded-full mb-4">
            <Package className="w-12 h-12 text-[#A44A3F]" />
          </div>
          <p className="font-bold text-xl text-[#A44A3F] mb-2">Error loading products</p>
          <p className="text-sm text-gray-600">We're having trouble loading the products. Please try again.</p>
        </div>
      )}


      {!isLoading && !error && products && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-32 animate-fade-in">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
                <Search size={48} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-xl font-semibold">No products found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or add a new product</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    style={{ animationDelay: `${index * 30}ms` }}
                    className="animate-scale-in"
                  >
                    <ProductCard
                      product={product}
                      onDelete={(id) => setDeleteProductId(id)}
                    />
                  </div>
                ))}
              </div>


              {!shouldSearch && (
                <div className="flex justify-center items-center gap-2 py-4 flex-wrap">
                  <button
                    onClick={handlePrevPage}
                    disabled={offset === 0}
                    className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border-2 border-gray-200 text-[#0D1821] rounded-xl hover:border-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#0D1821] disabled:hover:border-gray-200 transition-all duration-300 font-medium shadow-sm"
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  

                  <div className="flex gap-1.5 sm:gap-2">
                    {(() => {
                      const currentPage = Math.floor(offset / PRODUCTS_PER_PAGE) + 1;
                      const currentRange = Math.floor((currentPage - 1) / 5);
                      const startPage = currentRange * 5 + 1;
                      const endPage = Math.min(startPage + 4, startPage + 4);
                      
                      return Array.from({ length: 5 }, (_, i) => startPage + i).map((pageNum) => {
                        const isActive = pageNum === currentPage;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setOffset((pageNum - 1) * PRODUCTS_PER_PAGE)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                              isActive
                                ? 'bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-white shadow-md scale-105'
                                : 'bg-white border-2 border-gray-200 text-[#0D1821] hover:border-[#4E6E5D] hover:shadow-md'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      });
                    })()}
                  </div>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={products.length < PRODUCTS_PER_PAGE}
                    className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border-2 border-gray-200 text-[#0D1821] rounded-xl hover:border-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#0D1821] disabled:hover:border-gray-200 transition-all duration-300 font-medium shadow-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}


      <ConfirmationDialog
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
      </div>
    </div>
  );
}
