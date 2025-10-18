# 🛍️ BiTexhX - Product Management App

A modern, full-featured product management application built with Next.js 15, TypeScript, and Redux Toolkit. This application provides a comprehensive solution for managing product catalogs with an intuitive user interface and robust functionality.

---

### Developed By: **[Tanzil Rayhan](https://tanzilrayhan.framer.ai/)**

---

**Live Link**: [https://bitechx-product-hub.vercel.app/](https://bitechx-product-hub.vercel.app/)

---

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.1-purple?style=flat&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)

---

## ✨ Features

### 🔐 Authentication
- **Email-based authentication** with BiTechX API
- **JWT token management** with Redux Toolkit
- **Protected routes** with automatic redirection
- **Persistent sessions** using localStorage
- **Auto-logout** on token expiration

### 📦 Product Management
- **CRUD Operations**: Create, Read, Update, Delete products
- **Advanced Search**: Real-time search with 500ms debounce
- **Category Filtering**: Filter products by category with tab-based UI
- **Pagination**: Page numbers (1-5) with Previous/Next navigation
- **Image Preview**: Live image preview in forms
- **Product Details**: Professional split-column layout (2:3 ratio)

### 🎨 User Interface
- **Responsive Design**: Mobile-first, works on all devices
- **Modern Animations**: Smooth fade-in, scale-in, and slide-in effects
- **Custom Color Palette**: Professional color scheme
  - Primary: `#0D1821` (Dark Navy)
  - Background: `#EFF1F3` (Light Gray)
  - Secondary: `#4E6E5D` (Sage Green)
  - Accent: `#AD8A64` (Tan/Gold)
  - Error: `#A44A3F` (Muted Red)
- **Toast Notifications**: Gradient toast messages with icons
- **Loading States**: Spinners and skeleton screens
- **Error States**: User-friendly error messages with retry options

### 🛡️ Validation & Error Handling
- **Zod Validation**: Client-side validation for all forms
- **Custom Refinements**: Complex business logic validation
- **Server Error Handling**: HTTP status code-specific error messages
- **Real-time Feedback**: Instant validation on form fields
- **Graceful Degradation**: Fallback UI for failed images

### 🚀 Performance
- **Turbopack**: Lightning-fast development builds
- **RTK Query**: Efficient data fetching and caching
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Automatic image optimization (disabled for external URLs)
- **Debounced Search**: Reduced API calls

---

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 15.5.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript

### State Management
- **[Redux Toolkit 2.9.1](https://redux-toolkit.js.org/)** - State management
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching and caching
- **[React Redux 9.2.0](https://react-redux.js.org/)** - React bindings for Redux

### Styling
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **Custom CSS Animations** - Fade-in, scale-in, slide-in, shimmer, float, pulse-glow

### Form Handling & Validation
- **[React Hook Form 7.65.0](https://react-hook-form.com/)** - Form state management
- **[Zod 4.1.12](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers 5.2.2](https://github.com/react-hook-form/resolvers)** - Zod integration

### UI Components & Icons
- **[Lucide React 0.546.0](https://lucide.dev/)** - Icon library
- **[React Hot Toast 2.6.0](https://react-hot-toast.com/)** - Toast notifications
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Conditional classNames

### HTTP Client
- **[Axios 1.12.2](https://axios-http.com/)** - Promise-based HTTP client

### Build Tools
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for Next.js
- **[PostCSS 8.5.6](https://postcss.org/)** - CSS processing

---

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for cloning the repository)

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TanzilRayhan/BiTechX_Product_Management_App
   cd product-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** (see [Environment Variables](#-environment-variables))

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.bitechx.com

# Application Configuration
NEXT_PUBLIC_APP_NAME=Product Hub
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Analytics, Logging, etc.
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Environment Variables Explanation

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | BiTechX API base URL | Yes | `https://api.bitechx.com` |
| `NEXT_PUBLIC_APP_NAME` | Application name | No | `Product Hub` |
| `NEXT_PUBLIC_APP_URL` | Application URL | No | `http://localhost:3000` |

---

## 🏃 Running the Application

### Development Mode

Run the development server with Turbopack:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

Build the application for production:

```bash
npm run build
# or
yarn build
```

### Start Production Server

After building, start the production server:

```bash
npm start
# or
yarn start
```

---

## 📁 Project Structure

```
product-management-app/
├── public/                      # Static files
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Authentication routes
│   │   │   ├── layout.tsx      # Auth layout with Toaster
│   │   │   └── login/          # Login page
│   │   │       └── page.tsx
│   │   ├── (main)/             # Main application routes
│   │   │   ├── layout.tsx      # Main layout with Navbar
│   │   │   ├── page.tsx        # Redirect to products
│   │   │   └── products/       # Product routes
│   │   │       ├── page.tsx            # Product list
│   │   │       ├── [slug]/             # Product details
│   │   │       │   └── page.tsx
│   │   │       ├── new/                # Create product
│   │   │       │   └── page.tsx
│   │   │       └── edit/               # Edit product
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── globals.css         # Global styles & animations
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Root page (redirects to login)
│   ├── components/             # React components
│   │   ├── common/             # Shared components
│   │   │   ├── ConfirmationDialog.tsx
│   │   │   └── Navbar.tsx
│   │   ├── products/           # Product-specific components
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductForm.tsx
│   │   └── ui/                 # UI primitives
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Spinner.tsx
│   │       └── Textarea.tsx
│   ├── lib/                    # Utility libraries
│   │   ├── api.ts              # Axios instance & API config
│   │   └── utils.ts            # Helper functions
│   ├── store/                  # Redux store
│   │   ├── api/                # RTK Query APIs
│   │   │   ├── categoriesApi.ts
│   │   │   └── productsApi.ts
│   │   ├── slices/             # Redux slices
│   │   │   └── authSlice.ts
│   │   ├── hooks.ts            # Typed Redux hooks
│   │   ├── Provider.tsx        # Redux Provider
│   │   └── store.ts            # Store configuration
│   └── types/                  # TypeScript types
│       └── index.ts            # Shared types
├── .env.local                  # Environment variables (create this)
├── .gitignore                  # Git ignore rules
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # This file
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 📡 API Documentation

### Base URL
```
https://api.bitechx.com
```

### Authentication

#### Login
```http
POST /auth
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid email
- `404` - Email not registered

---

### Products

#### Get All Products
```http
GET /products?offset=0&limit=12&categoryId={uuid}
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `offset` | number | No | Starting index (default: 0) |
| `limit` | number | No | Number of products (default: 12) |
| `categoryId` | string (UUID) | No | Filter by category |

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "images": ["https://example.com/image.jpg"],
    "slug": "product-slug",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "category": {
      "id": "uuid",
      "name": "Category Name",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  }
]
```

#### Search Products
```http
GET /products/search?searchedText={query}
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `searchedText` | string | Yes | Search query |

**Response:** Same as Get All Products

#### Get Product by Slug
```http
GET /products/{slug}
Authorization: Bearer {token}
```

**Response:** Single product object (same structure as above)

#### Create Product
```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description (min 10 chars)",
  "categoryId": "category-uuid",
  "images": ["https://example.com/image.jpg"]
}
```

**Validation Rules:**
- `name`: 3-100 characters, required
- `price`: Number, 0-1,000,000, max 2 decimals, required
- `description`: 10-500 characters, required
- `categoryId`: Valid UUID, required
- `images`: Array of valid image URLs, required

**Response:** Created product object

**Status Codes:**
- `201` - Created
- `400` - Invalid data
- `401` - Unauthorized
- `413` - Payload too large
- `422` - Validation error

#### Update Product
```http
PUT /products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 149.99,
  "description": "Updated description",
  "categoryId": "category-uuid",
  "images": ["https://example.com/new-image.jpg"]
}
```

**Response:** Updated product object

**Status Codes:**
- `200` - Success
- `400` - Invalid data
- `401` - Unauthorized
- `404` - Product not found
- `422` - Validation error

#### Delete Product
```http
DELETE /products/{id}
Authorization: Bearer {token}
```

**Note:** The BiTechX API simulates deletion (returns 200 but doesn't actually delete from database).

**Response:**
```json
{
  "id": "uuid"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Product not found

---

### Categories

#### Get All Categories
```http
GET /categories
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Category Name",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## 🎨 Design System

### Color Palette

```css
--color-primary: #0D1821;      /* Dark Navy - Primary text, headers */
--color-background: #EFF1F3;   /* Light Gray - Backgrounds */
--color-secondary: #4E6E5D;    /* Sage Green - Secondary elements */
--color-accent: #AD8A64;       /* Tan/Gold - Accents, highlights */
--color-error: #A44A3F;        /* Muted Red - Errors, warnings */
--color-text-primary: #0D1821; /* Primary text color */
--color-text-secondary: #4E6E5D; /* Secondary text color */
```

### Typography

- **Font Family**: Geist Sans (Primary), Geist Mono (Monospace)
- **Headings**: Bold, gradient text effects
- **Body**: Regular weight, comfortable line-height


---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Login with valid email
- [ ] Login with invalid email
- [ ] Login with unregistered email
- [ ] Logout functionality
- [ ] Protected route redirection
- [ ] Session persistence

#### Products
- [ ] View product list
- [ ] Search products
- [ ] Filter by category
- [ ] Pagination navigation
- [ ] View product details
- [ ] Create new product
- [ ] Update product
- [ ] Delete product
- [ ] Form validation
- [ ] Error handling

#### UI/UX
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Error states
- [ ] Toast notifications
- [ ] Animations
- [ ] Image fallbacks


---

