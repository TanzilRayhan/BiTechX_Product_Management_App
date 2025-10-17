import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsQueryParams, CreateProductInput, UpdateProductInput } from '@/types';
import { API_BASE_URL } from '@/lib/api';
import type { RootState } from '../store';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product', 'ProductList', 'ProductSearch'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductsQueryParams>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());
        if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
        if (params.categoryId) queryParams.append('categoryId', params.categoryId);
        
        return `/products?${queryParams.toString()}`;
      },
      providesTags: (result, error, params) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'ProductList' as const, id: params.categoryId || 'ALL' },
              { type: 'ProductList' as const, id: 'PARTIAL-LIST' },
            ]
          : [
              { type: 'ProductList' as const, id: 'PARTIAL-LIST' },
            ],
    }),
    
    searchProducts: builder.query<Product[], string>({
      query: (searchedText) => `/products/search?searchedText=${encodeURIComponent(searchedText)}`,
      providesTags: (result, error, searchText) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'ProductSearch' as const, id: searchText },
              { type: 'ProductSearch' as const, id: 'SEARCH-RESULTS' },
            ]
          : [
              { type: 'ProductSearch' as const, id: 'SEARCH-RESULTS' },
            ],
    }),
    
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, slug) => 
        result
          ? [
              { type: 'Product' as const, id: result.id },
              { type: 'Product' as const, id: slug },
            ]
          : [{ type: 'Product' as const, id: slug }],
    }),
    
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => 
        result
          ? [
              { type: 'Product' as const, id: result.id },
              { type: 'Product' as const, id },
            ]
          : [{ type: 'Product' as const, id }],
    }),
    
    createProduct: builder.mutation<Product, CreateProductInput>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: (result, error) => 
        error
          ? []
          : [
              { type: 'ProductList', id: 'PARTIAL-LIST' },
              { type: 'ProductList', id: result?.category?.id || 'ALL' },
              { type: 'ProductSearch', id: 'SEARCH-RESULTS' },
            ],
      async onQueryStarted(newProduct, { dispatch, queryFulfilled }) {
        try {
          const { data: createdProduct } = await queryFulfilled;
          
          dispatch(
            productsApi.util.updateQueryData('getProducts', { offset: 0, limit: 12 }, (draft) => {
              draft.unshift(createdProduct);
            })
          );
        } catch {}
      },
    }),
    
    updateProduct: builder.mutation<Product, { id: string; data: UpdateProductInput }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) =>
        error
          ? []
          : [
              { type: 'Product', id },
              { type: 'Product', id: result?.slug },
              { type: 'ProductList', id: 'PARTIAL-LIST' },
              { type: 'ProductList', id: result?.category?.id || 'ALL' },
              { type: 'ProductSearch', id: 'SEARCH-RESULTS' },
            ],
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResults: any[] = [];
        
        dispatch(
          productsApi.util.updateQueryData('getProducts', { offset: 0, limit: 12 }, (draft) => {
            const product = draft.find(p => p.id === id);
            if (product) {
              Object.assign(product, data);
            }
          })
        );
        
        try {
          const { data: updatedProduct } = await queryFulfilled;
          
          dispatch(
            productsApi.util.updateQueryData('getProducts', { offset: 0, limit: 12 }, (draft) => {
              const index = draft.findIndex(p => p.id === id);
              if (index !== -1) {
                draft[index] = updatedProduct;
              }
            })
          );
        } catch {
          patchResults.forEach(patchResult => patchResult.undo());
        }
      },
    }),
    
    deleteProduct: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) =>
        error
          ? []
          : [
              { type: 'Product', id },
              { type: 'ProductList', id: 'PARTIAL-LIST' },
              { type: 'ProductSearch', id: 'SEARCH-RESULTS' },
            ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', { offset: 0, limit: 12 }, (draft) => {
            const index = draft.findIndex(p => p.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
