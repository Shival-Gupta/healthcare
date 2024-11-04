// src/app/(auth)/login/page.tsx

"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add any login logic or validation here if needed

    // Redirect to the dashboard
    router.push('/dashboard');
  };

  return (
    <main className="text-center">
      <h1 className="text-2xl font-bold">Login to Your Account</h1>
      <p className="mt-4">Enter your credentials to access your account.</p>

      <form className="mt-6" onSubmit={handleSubmit}>
        {/* Form Fields */}
        <Button variant="default" className="w-full" type="submit">
          Login
        </Button>
      </form>

      <p className="mt-4">
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </main>
  );
}
