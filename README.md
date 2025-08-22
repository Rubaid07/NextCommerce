# NextCommerce

NextCommerce is a simple e-commerce application built with Next.js 15 (App Router) and NextAuth.js. It serves as a practical example for building a fully functional web application with both public and protected routes.

![NextCommerce](https://i.postimg.cc/25jYLfqR/Screenshot-2025-08-22-164918.png)

## Core Features

* **Public Landing Page (`/`)**: A modern and responsive landing page to welcome users.
* **Product Listing (`/products`)**: A publicly accessible page that lists all available products.
* **Product Details (`/products/[id]`)**: A page to view the full details of a single product.
* **Authentication with NextAuth.js**: Implements secure and easy authentication using Google (or other providers).
* **Protected Dashboard (`/dashboard/add-product`)**: A secure route accessible only to authenticated users, where they can add new products.
* **Backend API**: Uses Next.js Route Handlers for fetching and storing product data.

## Technologies Used

* **Next.js 15 (App Router)**: A modern React framework for powerful Server-Side Rendering (SSR) and Static Site Generation (SSG).
* **NextAuth.js**: A flexible library for handling authentication with OAuth and other methods.
* **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.