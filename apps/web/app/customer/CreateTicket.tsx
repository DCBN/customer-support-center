"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createRequestUrl } from "../../api";
import { Banner } from "../../components/Banner";
import { CreateTicketData, TicketForm } from "../../components/Forms";

export default function CreateTicket() {
  const [error, toggleError] = useState(false);
  const router = useRouter();
  const onSubmit = useCallback(
    async (data: CreateTicketData) => {
      try {
        await fetch(createRequestUrl('/ticket'), {
          method: "POST",
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/customer/completed");
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
      <TicketForm onSubmit={onSubmit} />
    </div>
  );
}
