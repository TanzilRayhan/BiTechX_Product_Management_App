'use client';

import { useRouter } from 'next/navigation';
import { useCreateProductMutation } from '@/store/api/productsApi';
import ProductForm from '@/components/products/ProductForm';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
  }) => {
    try {
      await createProduct(data).unwrap();
      toast.success('Product created successfully!', {
        duration: 4000,
        icon: '✅',
      });
      router.push('/products');
    } catch (error: any) {
      console.error('Failed to create product:', error);
      
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
        toast.error(errorMessage || 'Failed to create product. Please try again.', {
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">        <div className="mb-6 animate-fade-in">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#AD8A64] transition-colors duration-300 font-medium group mb-4"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-[#0D1821]">Create New Product</h1>
          <p className="text-gray-600 mt-2">Fill in the details to add a new product to your inventory</p>
        </div>        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 animate-scale-in">
          <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
