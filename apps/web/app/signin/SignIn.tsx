"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createRequestUrl } from "../../api";
import { Banner } from "../../components/Banner";
import { SignInData, SignInForm } from "../../components/Forms/SignIn";

type Role = "admin" | "support_agent" | "customer";
const getNextRoute = (role: Role) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "support_agent":
      return "/support";
    case "customer":
      return "/customer";
  }
};

export default function SignIn() {
  const router = useRouter();
  const [error, toggleError] = useState(false);

  const onSignIn = useCallback(
    async (data: SignInData) => {
      try {
        const res = await fetch(
          createRequestUrl('/auth/signin'),
          {
            method: "POST",
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        const nextRoute = getNextRoute(user.role);
        router.push(nextRoute);
      } catch {
        toggleError(true);
      }
    },
    [router, toggleError]
  );

  return (
    <div className="w-full xl:max-w-md mt-6 rounded-xl shadow-md xl:shadow-lg px-4 py-4 border">
      {error ? (
        <Banner color="error">Something went wrong... Try again later!</Banner>
      ) : null}
      <SignInForm onSubmit={onSignIn} />
      <p className="text-gray-500 my-2 text-center">
        If you dont already have an account you can
        <Link href="/signup" className="text-indigo-500 ml-2">Sign up</Link>
      </p>
    </div>
  );
}
