import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <p className="text-lg font-semibold tracking-tight text-foreground">Ghost</p>
        <p className="mt-1 text-sm text-muted-foreground">Design together, build faster.</p>
      </div>
      <SignUp />
    </div>
  );
}
