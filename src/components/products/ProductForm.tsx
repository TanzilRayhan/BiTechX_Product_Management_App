'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import { Product } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { Package, DollarSign, FileText, Tag, Image as ImageIcon, Check, X } from 'lucide-react';

const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters')
    .trim(),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(parseFloat(val)), { message: 'Price must be a valid number' })
    .refine((val) => parseFloat(val) > 0, { message: 'Price must be greater than 0' })
    .refine((val) => parseFloat(val) < 1000000, { message: 'Price must be less than 1,000,000' })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), { message: 'Price must have at most 2 decimal places' }),
  categoryId: z
    .string()
    .min(1, 'Category is required')
    .uuid('Invalid category selected'),
  images: z
    .string()
    .min(1, 'Image URL is required')
    .url('Please enter a valid image URL (must start with http:// or https://)')
    .refine((val) => val.startsWith('http://') || val.startsWith('https://'), {
      message: 'Image URL must start with http:// or https://',
    })
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname) || val.includes('placeholder') || val.includes('unsplash') || val.includes('pexels') || val.includes('imgur');
        } catch {
          return false;
        }
      },
      { message: 'URL must point to a valid image (jpg, jpeg, png, gif, webp, svg) or be from a supported image host' }
    ),
});

type ProductFormInputs = z.infer<typeof productSchema>;

interface ProductFormSubmitData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
}

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormSubmitData) => void;
  isLoading: boolean;
}

export default function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [imagePreview, setImagePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          price: initialData.price.toString(),
          categoryId: initialData.category.id,
          images: initialData.images[0] || '',
        }
      : undefined,
  });

  const imageUrl = watch('images');

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price.toString(),
        categoryId: initialData.category.id,
        images: initialData.images[0] || '',
      });
      setImagePreview(initialData.images[0] || '');
    }
  }, [initialData, reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (imageUrl && imageUrl.startsWith('http')) {
        setImagePreview(imageUrl);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [imageUrl]);

  const handleFormSubmit = (data: ProductFormInputs) => {
    const price = parseFloat(data.price);

    if (isNaN(price) || price <= 0) {
      return;
    }

    onSubmit({
      name: data.name,
      description: data.description,
      price,
      categoryId: data.categoryId,
      images: [data.images],
    });
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600 font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="space-y-6">
   
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#0D1821] mb-2">
              Product Name <span className="text-[#A44A3F]">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-[#4E6E5D] group-focus-within:text-[#AD8A64] transition-colors" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                {...register('name')}
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 ${
                  errors.name ? 'border-[#A44A3F] focus:border-[#A44A3F]' : 'border-gray-200 focus:border-[#AD8A64]'
                } rounded-xl focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] placeholder-gray-400`}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-[#A44A3F] flex items-center gap-1">
                <X size={14} /> {errors.name.message}
              </p>
            )}
          </div>

 
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-[#0D1821] mb-2">
              Price (USD) <span className="text-[#A44A3F]">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-[#4E6E5D] group-focus-within:text-[#AD8A64] transition-colors" />
              </div>
              <input
                id="price"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register('price')}
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 ${
                  errors.price ? 'border-[#A44A3F] focus:border-[#A44A3F]' : 'border-gray-200 focus:border-[#AD8A64]'
                } rounded-xl focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] placeholder-gray-400`}
              />
            </div>
            {errors.price && (
              <p className="mt-2 text-sm text-[#A44A3F] flex items-center gap-1">
                <X size={14} /> {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-semibold text-[#0D1821] mb-2">
              Category <span className="text-[#A44A3F]">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Tag className="h-5 w-5 text-[#4E6E5D] group-focus-within:text-[#AD8A64] transition-colors" />
              </div>
              <select
                id="categoryId"
                {...register('categoryId')}
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 ${
                  errors.categoryId ? 'border-[#A44A3F] focus:border-[#A44A3F]' : 'border-gray-200 focus:border-[#AD8A64]'
                } rounded-xl focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] appearance-none cursor-pointer`}
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#4E6E5D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.categoryId && (
              <p className="mt-2 text-sm text-[#A44A3F] flex items-center gap-1">
                <X size={14} /> {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-semibold text-[#0D1821] mb-2">
              Image URL <span className="text-[#A44A3F]">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-[#4E6E5D] group-focus-within:text-[#AD8A64] transition-colors" />
              </div>
              <input
                id="images"
                type="text"
                placeholder="https://example.com/image.jpg"
                {...register('images')}
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 ${
                  errors.images ? 'border-[#A44A3F] focus:border-[#A44A3F]' : 'border-gray-200 focus:border-[#AD8A64]'
                } rounded-xl focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] placeholder-gray-400`}
              />
            </div>
            {errors.images && (
              <p className="mt-2 text-sm text-[#A44A3F] flex items-center gap-1">
                <X size={14} /> {errors.images.message}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">Enter a valid image URL (https://...)</p>
          </div>
        </div>

        <div className="space-y-6">

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#0D1821] mb-2">
              Description <span className="text-[#A44A3F]">*</span>
            </label>
            <div className="relative group">
              <div className="absolute top-4 left-4 pointer-events-none">
                <FileText className="h-5 w-5 text-[#4E6E5D] group-focus-within:text-[#AD8A64] transition-colors" />
              </div>
              <textarea
                id="description"
                rows={6}
                placeholder="Enter product description (minimum 10 characters)"
                {...register('description')}
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 ${
                  errors.description ? 'border-[#A44A3F] focus:border-[#A44A3F]' : 'border-gray-200 focus:border-[#AD8A64]'
                } rounded-xl focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300 text-[#0D1821] placeholder-gray-400 resize-none`}
              />
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-[#A44A3F] flex items-center gap-1">
                <X size={14} /> {errors.description.message}
              </p>
            )}
          </div>


          <div>
            <label className="block text-sm font-semibold text-[#0D1821] mb-2">
              Image Preview
            </label>
            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-2 border-gray-200">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview('')}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={48} className="mb-2 opacity-50" />
                  <p className="text-sm">Enter image URL to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '600ms' }}>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 sm:flex-initial sm:min-w-[200px] flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-[#EFF1F3] rounded-xl hover:from-[#AD8A64] hover:to-[#4E6E5D] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none font-semibold text-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Check size={20} />
              <span>{initialData ? 'Update Product' : 'Create Product'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
