import { LoginForm } from "../../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-2xl">
        {" "}
        {}
        <LoginForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <h3 className="font-semibold">What are Passkeys?</h3>
          <p className="mt-2">
            Passkeys are a safer and easier replacement for passwords. They use cryptography instead of memorized
            secrets, providing better security and a smoother login experience across your devices.
          </p>
        </div>
      </div>
    </div>
  )
}

