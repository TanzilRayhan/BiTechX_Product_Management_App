export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginResponse {
  token: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface ProductsQueryParams {
  offset?: number;
  limit?: number;
  categoryId?: string;
  searchedText?: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  categoryId: string; // UUID
  images: string[];
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
  description?: string;
  categoryId?: string; // UUID
  images?: string[];
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
