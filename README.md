# Service POS System

## Live Demo

[View Live Demo](https://your-pos-system-url.vercel.app) <!-- Replace with your actual live URL -->

## Description

This is a modern, responsive Point of Sale (POS) system designed for service-based businesses. Built with Next.js and TypeScript, it features a user-friendly interface for managing services, a shopping cart, and a checkout process.

## Features

- Responsive design for both desktop and mobile views
- Service listing with search functionality
- Add to cart with quantity selection
- Shopping cart management
- Checkout process with customer details
- Internationalization support (English and Spanish)
- Dark mode support

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Context API for state management

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/service-pos-system.git
   cd service-pos-system
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Browse available services and use the search functionality to find specific services.
2. Adjust quantities and add services to the shopping cart.
3. View the cart and proceed to checkout.
4. Enter customer details and complete the transaction.
5. Receive a transaction receipt upon successful checkout.

## Folder Structure

```
service-pos-system/
│-- src/
│   │-- app/
│   │   │-- cart/
│   │   │-- checkout/
│   │   │-- layout/
│   │   │-- page/
│   │-- components/
│   │-- context/
│   │-- lib/
│   │-- types/
│-- public/
│-- package.json
│-- tsconfig.json
│-- README.md
```

