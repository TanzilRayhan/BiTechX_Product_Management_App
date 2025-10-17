import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '@/types';
import { API_BASE_URL } from '@/lib/api';
import type { RootState } from '../store';

interface CategoriesQueryParams {
  offset?: number;
  limit?: number;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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
  tagTypes: ['Category', 'CategoryList'],
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], CategoriesQueryParams | void>({
      query: (params) => {
        if (!params) return '/categories';
        const queryParams = new URLSearchParams();
        if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());
        if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
        return `/categories?${queryParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'CategoryList' as const, id: 'LIST' },
            ]
          : [{ type: 'CategoryList' as const, id: 'LIST' }],
    }),
    
    searchCategories: builder.query<Category[], string>({
      query: (searchedText) => `/categories/search?searchedText=${encodeURIComponent(searchedText)}`,
      providesTags: (result, error, searchText) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'CategoryList' as const, id: `SEARCH-${searchText}` },
            ]
          : [{ type: 'CategoryList' as const, id: 'SEARCH' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useSearchCategoriesQuery,
} = categoriesApi;
