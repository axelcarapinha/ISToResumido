"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { KeyRound } from "lucide-react"
import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

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
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="name">
                Name
              </label>
              <Input id="name" type="text" placeholder="Enter your name" required />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            {/* Password Field */}
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

          {/* Social Login Options */}
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="w-full">
              <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 mr-2 text-red-500" />
              Google
            </Button>

            <Button variant="outline" className="w-full">
              <Image src="/logo_ist-no-background.png" alt="Custom Logo 3" width={24} height={24} />
              FenixID
            </Button>

            <Button variant="outline" className="w-full">
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5 mr-2 text-black-500" />
              GitHub
            </Button>
          </div>

          {/* Link to Login Page */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#009fe3] hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Passkey Information */}
        <div className="bg-gray-50 p-8 flex flex-col items-center justify-center border-l">
          <div className="text-center space-y-2 max-w-sm">
            <KeyRound className="h-12 w-12 mx-auto text-[#009fe3] mb-4" />
            <h2 className="text-xl font-semibold">Create a Passkey</h2>
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

      {/* Footer Links */}
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
