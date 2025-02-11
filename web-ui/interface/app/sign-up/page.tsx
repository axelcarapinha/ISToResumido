"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { KeyRound } from "lucide-react"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/chat")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl grid md:grid-cols-2 p-0 overflow-hidden">
        <div className="p-8">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-500">Sign up for your ISToresumido account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="name">
                Name
              </label>
              <Input id="name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="w-full">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.92 15.5h-2.09v-5.9h-1.46V9.5h1.46V7.77c0-1.3.62-3.27 3.27-3.27h2.4v2.67h-1.74c-.29 0-.69.14-.69.75v1.58h2.46l-.29 2.1h-2.17v5.9z" />
              </svg>
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm5.14 15.14c-.39.39-1.02.39-1.41 0L12 13.41l-3.73 3.73c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 6.86 8.27c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.73-3.73c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l3.73 3.73c.39.39.39 1.02 0 1.41z" />
              </svg>
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#009fe3] hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="bg-gray-50 p-8 flex flex-col items-center justify-center border-l">
          <div className="text-center space-y-2 max-w-sm">
            <KeyRound className="h-12 w-12 mx-auto text-[#009fe3] mb-4" />
            <h2 className="text-xl font-semibold">Use Passkeys</h2>
            <p className="text-sm text-gray-500">Create a passkey for passwordless sign-in with enhanced security</p>
            <Button
              className="w-full bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200 mt-4"
              onClick={() => alert("Passkey creation coming soon!")}
            >
              Create a Passkey
            </Button>
          </div>
        </div>
      </Card>

      <div className="absolute bottom-4 text-center text-xs text-gray-500">
        <p>
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="text-[#009fe3] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#009fe3] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

