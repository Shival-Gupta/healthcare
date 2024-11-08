import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login to Patient Portal</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}