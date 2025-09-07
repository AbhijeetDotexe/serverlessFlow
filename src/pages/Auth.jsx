import { SignIn, SignUp } from "@clerk/clerk-react";

export default function Auth() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-slate-900">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
