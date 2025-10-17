'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Eye, Tag, DollarSign } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const firstImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : undefined;
  const imageUrl = firstImage || 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">

      <div className="absolute inset-0 bg-gradient-to-br from-[#4E6E5D]/0 to-[#AD8A64]/0 group-hover:from-[#4E6E5D]/5 group-hover:to-[#AD8A64]/5 transition-all duration-500 pointer-events-none z-10"></div>
      
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-gray-400 text-4xl mb-2">📦</span>
              <span className="text-gray-400 text-sm font-medium">No Image Available</span>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              unoptimized
              onError={() => setImageError(true)}
            />
          )}
          
          <div className="absolute top-3 left-3 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <Tag size={14} className="text-[#4E6E5D]" />
              <span className="text-xs font-semibold text-[#0D1821]">
                {product.category?.name ?? 'Uncategorized'}
              </span>
            </div>
          </div>

          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] rounded-full shadow-lg">
              <DollarSign size={14} className="text-[#EFF1F3]" />
              <span className="text-sm font-bold text-[#EFF1F3]">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5 space-y-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-[#0D1821] group-hover:text-[#4E6E5D] transition-colors duration-300 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description || 'No description available'}
        </p>

        <div className="flex gap-2 pt-2">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-[#EFF1F3] rounded-xl hover:from-[#AD8A64] hover:to-[#4E6E5D] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium text-sm">
              <Eye size={16} />
              <span>View</span>
            </button>
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            className="px-4 py-2.5 bg-gradient-to-r from-[#A44A3F] to-[#A44A3F]/80 text-white rounded-xl hover:from-[#A44A3F]/90 hover:to-[#A44A3F] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#AD8A64]/30 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};
