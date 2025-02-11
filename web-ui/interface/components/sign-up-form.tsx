import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound } from "lucide-react"

export function SignUpForm() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="grid p-0 md:grid-cols-2">
        <form className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-balance text-muted-foreground">Sign up to get started with ISToresumido</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-primary text-white hover:bg-[#007bb1]">
              Sign Up
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4 text-primary hover:text-[#007bb1]">
                Log in
              </a>
            </div>
          </div>
        </form>
        <div className="relative flex flex-col items-center justify-center bg-muted p-6 md:p-8">
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg"
              alt="Background"
              className="h-full w-full object-cover opacity-30 dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <KeyRound className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-2xl font-bold">Use Passkeys</h2>
            <p className="mb-4 text-sm text-muted-foreground">Passwordless sign-up with enhanced security</p>
            <Button variant="secondary" className="w-full bg-primary text-white hover:bg-[#007bb1]">
              Sign up with Passkey
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}