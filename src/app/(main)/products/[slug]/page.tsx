'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetProductBySlugQuery, useDeleteProductMutation } from '@/store/api/productsApi';
import { Spinner } from '@/components/ui/Spinner';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { formatPrice, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit, Trash2, Tag, Calendar, Clock, Package, Share2, ImageOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(product.id).unwrap();
      setShowDeleteDialog(false);
      toast.success('Product deleted successfully!');
      router.push('/products');
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', error ? Object.keys(error) : 'no keys');
      console.error('Error stringified:', JSON.stringify(error, null, 2));
      
      setShowDeleteDialog(false);
      
      let errorMessage = 'Failed to delete product. Please try again.';
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status) {
        errorMessage = `Failed to delete product (Error ${error.status})`;
      }
      
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-[#4E6E5D]/30 border-t-[#AD8A64] rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading product details...</p>
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
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been deleted.</p>
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

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/600x600?text=No+Image'];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#EFF1F3] via-white to-[#EFF1F3] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#AD8A64] transition-colors duration-200 font-medium group text-sm"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>
          </div>

          {/* Main Product Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left: Image Gallery - Takes 2 columns */}
              <div className="lg:col-span-2 p-6 bg-gray-50 border-r border-gray-100">
                <div className="space-y-3">
                  {/* Main Image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-sm group">
                    {imageError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                        <ImageOff className="w-20 h-20 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500 font-medium">Image not available</p>
                      </div>
                    ) : (
                      <Image
                        src={images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        unoptimized
                        onError={() => setImageError(true)}
                      />
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {!imageError && images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.slice(0, 4).map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden bg-white transition-all duration-200 ${
                            selectedImage === index
                              ? 'ring-2 ring-[#4E6E5D] shadow-md'
                              : 'hover:ring-2 hover:ring-[#AD8A64]/50 shadow-sm opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Product Details - Takes 3 columns */}
              <div className="lg:col-span-3 p-8">
                <div className="flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex-1 space-y-5">
                    {/* Category Badge */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4E6E5D]/10 border border-[#4E6E5D]/20 text-[#4E6E5D]">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {product.category.name}
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1821] leading-tight mb-2">
                        {product.name}
                      </h1>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <p className="text-5xl font-bold bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 pt-5"></div>

                    {/* Description */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-[#0D1821] uppercase tracking-wide flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#4E6E5D]" />
                        Product Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 pt-5"></div>

                    {/* Product Information */}
                    <div>
                      <h3 className="text-sm font-bold text-[#0D1821] uppercase tracking-wide mb-3">
                        Product Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Calendar className="w-4 h-4 text-[#4E6E5D]" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</p>
                            <p className="text-sm font-medium text-[#0D1821] mt-0.5">{formatDate(product.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Clock className="w-4 h-4 text-[#AD8A64]" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Updated</p>
                            <p className="text-sm font-medium text-[#0D1821] mt-0.5">{formatDate(product.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t-2 border-gray-100">
                    <button
                      onClick={() => router.push(`/products/edit/${product.slug}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-white rounded-lg hover:from-[#AD8A64] hover:to-[#4E6E5D] transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                    >
                      <Edit size={18} />
                      Edit Product
                    </button>
                    <button
                      onClick={() => setShowDeleteDialog(true)}
                      disabled={isDeleting}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-[#A44A3F] text-[#A44A3F] rounded-lg hover:bg-[#A44A3F] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                    >
                      {isDeleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />
                          Delete Product
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </>
  );
}
