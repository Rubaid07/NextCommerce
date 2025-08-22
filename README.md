# NextCommerce

NextCommerce is a **modern e-commerce application** built with **Next.js 15 (App Router)** and **NextAuth.js**. It demonstrates a full-stack application with **public and protected routes**, secure authentication, and a clean, responsive UI.

![NextCommerce Screenshot](https://i.postimg.cc/25jYLfqR/Screenshot-2025-08-22-164918.png)

---

## 🚀 Features

### Public Features
- **Landing Page (`/`)**: A responsive homepage with Navbar, Hero section, and Footer.
- **Product Listing (`/products`)**: Browse all available products publicly.
- **Product Details (`/products/[id]`)**: View detailed information for a single product.

### Protected Features
- **Authentication with NextAuth.js**: Sign in securely with Google (or other OAuth providers).
- **Dashboard (`/dashboard/add-product`)**: Authenticated users can add new products.

### Backend
- **API Routes**: Powered by Next.js Route Handlers for fetching and storing product data.

---

## 🛠 Technologies Used

- **Next.js 15 (App Router)**: Modern React framework with SSR, SSG, and enhanced routing.
- **NextAuth.js**: Flexible authentication library with OAuth support.
- **Tailwind CSS**: Utility-first framework for fast and responsive UI development.

---

## 💻 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Rubaid07/NextCommerce.git
cd NextCommerce
```
### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```
### 3. Set up environment variables

Create a .env.local file in the root of your project and add the following variables:

```bash
AUTH_SECRET=your_long_random_string_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET: A long random string, which you can generate using Node.js.
```
GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET: You can obtain these from the Google Cloud Console by creating a new project and configuring an OAuth Client ID.

### 4. Run the application

```bash
npm run dev
```
The application will now be running on http://localhost:3000.

## 📁 Route Summary

| Route                       | Description                                        | Access                   |
|------------------------------|--------------------------------------------------|-------------------------|
| `/`                          | Landing page with Navbar, Hero, Product Highlights, and Footer | Public                  |
| `/login`                     | Login page using NextAuth.js for authentication | Public                  |
| `/products`                  | Display a list of all available products        | Public                  |
| `/products/[id]`             | View detailed information about a specific product | Public                  |
| `/dashboard/add-product`     | Protected form to add new products              | Authenticated users only |

