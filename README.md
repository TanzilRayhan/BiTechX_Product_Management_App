# 🛍️ Product Management App

A modern, full-featured product management application built with Next.js 15, TypeScript, and Redux Toolkit. This application provides a comprehensive solution for managing product catalogs with an intuitive user interface and robust functionality.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.1-purple?style=flat&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Design System](#-design-system)
- [Validation & Error Handling](#-validation--error-handling)
- [Contributing](#-contributing)
- [License](#-license)

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

### Animations

#### CSS Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(173, 138, 100, 0.5); }
  50% { box-shadow: 0 0 30px rgba(173, 138, 100, 0.8); }
}
```

#### Utility Classes
- `.animate-fade-in` - Fade in animation (0.3s)
- `.animate-slide-in` - Slide in from top (0.5s)
- `.animate-scale-in` - Scale in animation (0.5s)
- `.animate-shimmer` - Shimmer effect (2s)
- `.animate-float` - Floating animation (3s)
- `.animate-pulse-glow` - Pulsing glow effect (2s)

### Component Patterns

#### Cards
```tsx
<div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
  {/* Card content */}
</div>
```

#### Buttons
```tsx
<button className="px-6 py-3 bg-gradient-to-r from-[#4E6E5D] to-[#AD8A64] text-white rounded-xl hover:from-[#AD8A64] hover:to-[#4E6E5D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
  Button Text
</button>
```

#### Inputs
```tsx
<input className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-[#AD8A64] focus:ring-4 focus:ring-[#AD8A64]/10 outline-none transition-all duration-300" />
```

---

## 🛡️ Validation & Error Handling

### Client-Side Validation (Zod)

#### Product Schema
```typescript
const productSchema = z.object({
  name: z.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters')
    .trim(),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
  
  price: z.string()
    .refine((val) => !isNaN(parseFloat(val)), 'Price must be a valid number')
    .refine((val) => parseFloat(val) > 0, 'Price must be greater than 0')
    .refine((val) => parseFloat(val) < 1000000, 'Price must be less than 1,000,000')
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), 'Price must have at most 2 decimal places'),
  
  categoryId: z.string()
    .min(1, 'Category is required')
    .uuid('Invalid category selected'),
  
  images: z.string()
    .url('Please enter a valid image URL')
    .refine((val) => val.startsWith('http://') || val.startsWith('https://'),
      'Image URL must start with http:// or https://')
});
```

#### Login Schema
```typescript
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim()
    .refine((email) => email.length >= 5, 'Email must be at least 5 characters')
    .refine((email) => email.length <= 100, 'Email must be less than 100 characters')
});
```

### Server Error Handling

```typescript
try {
  await createProduct(data).unwrap();
  toast.success('Product created successfully!');
} catch (error: any) {
  if (error?.status === 400) {
    toast.error('Invalid product data. Please check all fields.');
  } else if (error?.status === 401) {
    toast.error('Session expired. Please log in again.');
    router.push('/login');
  } else if (error?.status === 413) {
    toast.error('Image URL is too large.');
  } else if (error?.status === 422) {
    toast.error('Validation error. Please check all fields.');
  } else if (error?.status >= 500) {
    toast.error('Server error. Please try again later.');
  } else {
    toast.error('Failed to create product. Please try again.');
  }
}
```

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

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Configure environment variables

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind CSS for styling

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- [BiTechX](https://bitechx.com) for providing the API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com) for hosting solutions
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All open-source contributors

---

## 📞 Support

For support, email support@example.com or open an issue in the GitHub repository.

---

## 🔗 Links

- **Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Documentation**: [https://docs.your-app.com](https://docs.your-app.com)
- **API Reference**: [https://api.bitechx.com/docs](https://api.bitechx.com/docs)
- **GitHub**: [https://github.com/yourusername/product-management-app](https://github.com/yourusername/product-management-app)

---

<div align="center">
  Made with ❤️ by Your Name
  
  ⭐ Star this repo if you found it helpful!
</div>
