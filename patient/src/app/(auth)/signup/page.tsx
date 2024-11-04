// src/app/(auth)/signup/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main className="text-center">
      <h1 className="text-2xl font-bold">Create a New Account</h1>
      <p className="mt-4">Sign up to start managing your health records.</p>

      <form className="mt-6">
        {/* Form Fields */}
        <Button variant="default" className="w-full">Sign Up</Button>
      </form>

      <p className="mt-4">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </main>
  );
}
