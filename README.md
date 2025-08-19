# E-commerce Admin Dashboard

This is a modern, full-stack e-commerce administration panel built with Next.js, Supabase, and Tailwind CSS. It provides a comprehensive interface for managing products, orders, and customers.

## Key Features

-   **Dashboard Overview**: A comprehensive dashboard with key metrics and recent activity.
    ![Dashboard Overview](https://github.com/gamino97/ecommerce-admin/blob/screenshots/dashboard.png?raw=true)
-   **Product Management**: Create, read, update, and delete products.
    ![Product Management](https://github.com/gamino97/ecommerce-admin/blob/screenshots/products.png?raw=true)
-   **Order Management**: View and manage customer orders.
    ![Order Management](https://github.com/gamino97/ecommerce-admin/blob/screenshots/orders.png?raw=true)
-   **Customer Management**: View and manage customer information.
    ![Customer Management](https://github.com/gamino97/ecommerce-admin/blob/screenshots/products.png?raw=true)
-   **Authentication**: Secure login powered by Supabase Auth.
-   **Theming**: Light and dark mode support.

## Technologies Used

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Backend & Database**: [Supabase](https://supabase.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (using Radix UI)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

-   Node.js (v20 or later)
-   pnpm
-   A Supabase project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gamino97/ecommerce-admin.git
    cd ecommerce-admin
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add your Supabase project URL and anon key:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Generate Supabase types:**

    Log in to the Supabase CLI and link your project. Then, generate the types.

    ```bash
    pnpm supabase login
    pnpm supabase link --project-ref your-project-id
    pnpm run supabase:types
    ```
    *Replace `your-project-id` with your actual Supabase project ID.*

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is ready to be deployed on platforms like [Vercel](https://vercel.com/) or [Railway](https://railway.app/).
