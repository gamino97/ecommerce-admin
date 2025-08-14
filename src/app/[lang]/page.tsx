
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Admin Portal
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Manage your e-commerce store efficiently with our admin dashboard.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}
