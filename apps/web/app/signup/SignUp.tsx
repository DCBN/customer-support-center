'use client';
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createRequestUrl } from "../../api";
import { Banner } from "../../components/Banner";
import { SignUpData, SignUpForm } from "../../components/Forms/SignUp";

export default function SignIn() {
  const router = useRouter();
  const [error, toggleError] = useState(false);

  const redirect = useCallback(() => router.push('/signin'), [router]);

  const onSignUp = useCallback(
    async (data: SignUpData) => {
      try {
        await fetch(createRequestUrl('/auth/signup'), {
          method: "POST",
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        redirect();
      } catch {
        toggleError(true);
      }
    },
    [redirect, toggleError]
  );

  return (
    <div className="w-full xl:max-w-md mt-6 rounded-xl shadow-md xl:shadow-lg px-4 py-4 border">
      {error ? (
        <Banner color="error">Something went wrong... Try again later!</Banner>
      ) : null}
      <SignUpForm onSubmit={onSignUp} onReset={redirect} />
    </div>
  );
}
