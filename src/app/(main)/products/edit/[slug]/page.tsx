'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetProductBySlugQuery, useUpdateProductMutation } from '@/store/api/productsApi';
import ProductForm from '@/components/products/ProductForm';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import { ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data: product, isLoading: isLoadingProduct, error } = useGetProductBySlugQuery(slug);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
  }) => {
    if (!product) return;
    
    try {
      await updateProduct({ id: product.id, data }).unwrap();
      toast.success('Product updated successfully!', {
        duration: 4000,
        icon: '✅',
      });
      router.push('/products');
    } catch (error: any) {
      console.error('Failed to update product:', error);
      
      const errorMessage = error?.data?.message || error?.message;
      
      if (error?.status === 400) {
        toast.error('Invalid product data. Please check all fields and try again.', {
          duration: 5000,
        });
      } else if (error?.status === 401) {
        toast.error('Session expired. Please log in again.', {
          duration: 5000,
        });
        router.push('/login');
      } else if (error?.status === 404) {
        toast.error('Product not found. It may have been deleted.', {
          duration: 5000,
        });
        router.push('/products');
      } else if (error?.status === 413) {
        toast.error('Image URL is too large. Please use a different image.', {
          duration: 5000,
        });
      } else if (error?.status === 422) {
        toast.error('Validation error. Please check all fields are correctly filled.', {
          duration: 5000,
        });
      } else if (error?.status >= 500) {
        toast.error('Server error. Please try again later.', {
          duration: 5000,
        });
      } else {
        toast.error(errorMessage || 'Failed to update product. Please try again.', {
          duration: 5000,
        });
      }
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-[#4E6E5D]/30 border-t-[#AD8A64] rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/10 to-[#A44A3F]/5 rounded-full flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-[#A44A3F]" />
            </div>
            <h2 className="text-3xl font-bold text-[#A44A3F] mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're trying to edit doesn't exist or has been deleted.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-[#EFF1F3] rounded-xl hover:from-[#AD8A64] hover:to-[#4E6E5D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#AD8A64] transition-colors duration-300 font-medium group mb-4"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-[#0D1821]">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update the product information</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 animate-scale-in">
          <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={isUpdating} />
        </div>
      </div>
    </div>
  );
}
