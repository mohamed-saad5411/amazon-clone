# 🛒 Amazon Clone

A full-stack e-commerce application built with Next.js 15, inspired by Amazon. Features include product browsing, search, cart management, Stripe payments, and Supabase authentication.

---

## 🚀 Live Demo

> https://amazon-clone-5.netlify.app/ — deployed on Netlify

---

## 📸 Screenshots

| Home | Product Details | Cart | Orders |
|------|----------------|------|--------|
| Product feed with banner | Full product info + reviews | Cart with quantity control | Order history |

---

## ✨ Features

- 🔐 **Authentication** — Email/Password + Google OAuth via Supabase
- 🛍️ **Product Browsing** — Pagination, categories, search with debounce
- 🔍 **Real-time Search** — Instant results as you type
- 🛒 **Cart** — Per-user cart with Redux Toolkit + redux-persist
- 💳 **Stripe Checkout** — Secure payment flow with Stripe
- 📦 **Order History** — View past orders saved in Supabase
- 📱 **Responsive** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit + redux-persist |
| Authentication | Supabase Auth (Email + Google OAuth) |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe Checkout |
| Deployment | Netlify |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── cart/
│   │   ├── category/[slug]/
│   │   ├── orders/
│   │   ├── productDetails/[id]/
│   │   ├── search/
│   │   ├── login/
│   │   ├── register/
│   │   └── success/
│   ├── api/
│   │   ├── auth/
│   │   ├── create-checkOut-session/
│   │   └── orders/create/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── banner/
│   ├── home/
│   ├── layout/         # Navbar, Footer
│   ├── product/        # AddToCartButton, ProductImageCarousel
│   ├── products/       # ProductFeed, ProductGrid
│   ├── providers/      # ReduxProvider, SessionProvider
│   └── ui/             # ProductInHome, Logo, SearchBar
├── hooks/
│   └── useCartUser.ts
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── store/
│   ├── store.ts
│   └── slices/
│       └── cartSlice.ts
└── types/
    └── product.ts
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

```bash
# Clone the repo
git clone https://github.com/mohamed-saad5411/amazon-clone.git
cd amazon-clone

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

### `orders` table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth.users |
| items | jsonb | Array of ordered products |
| total | numeric | Order total in USD |
| created_at | timestamptz | Order timestamp |

---

## 🔑 Key Implementation Details

### Server Components for Data Fetching
Products are fetched on the server using Next.js Server Components, eliminating loading spinners and improving performance.

```tsx
// app/page.tsx
export default async function Home() {
  const products = await getProducts()
  return <MainHome products={products} />
}
```

### Per-User Cart with Redux
Each user has their own cart stored in Redux, keyed by their Supabase user ID and persisted via `redux-persist`.

```tsx
const cartItems = useSelector(selectItems(userId))
```

### Stripe Integration
Full Stripe Checkout flow — cart items are sent to a Next.js API route which creates a Stripe session and redirects the user.

---

## 📦 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/create-checkOut-session` | POST | Creates Stripe checkout session |
| `/api/orders/create` | POST | Saves order to Supabase |
| `/api/auth/login` | POST | Login with email/password |
| `/api/auth/register` | POST | Register new user |
| `/api/auth/logout` | POST | Sign out user |

---

## 🚧 Known Limitations

- Products sourced from [DummyJSON](https://dummyjson.com) (mock API)
- Stripe in test mode only
- No admin dashboard

---

## 🧑‍💻 Author

**Mohamed Saad**  
Full-Stack Developer  
[GitHub](https://github.com/mohamed-saad5411) · [LinkedIn](https://www.linkedin.com/in/%E2%80%AAmohamed-saad%E2%80%AC%E2%80%8F-28090925b/?locale=ar)

---

## 📄 License

This project is for portfolio purposes only.