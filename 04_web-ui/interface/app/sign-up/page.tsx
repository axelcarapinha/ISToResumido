import { SignUpForm } from "../../components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-2xl">
        {" "}
        {/* Changed from md:max-w-3xl to md:max-w-2xl */}
        <SignUpForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <h3 className="font-semibold">Why Sign Up?</h3>
          <p className="mt-2">
            Get free access to better responses to your prompts!
          </p>
        </div>
      </div>
    </div>
  )
}

