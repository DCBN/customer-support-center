"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { createRequestUrl } from "../../../api";
import { Banner } from "../../../components/Banner";
import {
  AddSupportAgentForm,
  AddSupportAgentData,
} from "../../../components/Forms";

export const AddAgent: FC = () => {
  const [error, toggleError] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: AddSupportAgentData) => {
      try {
        await fetch(createRequestUrl('/agent'), {
          method: "POST",
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/admin");
      } catch {
        toggleError(true);
      }
    },
    [router, toggleError]
  );

  const onReset = useCallback(async () => {
    return router.back();
  }, [router]);

  return (
    <div className="w-full xl:max-w-md mt-6 rounded-xl shadow-md xl:shadow-lg px-4 py-4 border">
      {error ? (
        <Banner color="error">Something went wrong... Try again later!</Banner>
      ) : null}
      <AddSupportAgentForm onSubmit={onSubmit} onReset={onReset} />
    </div>
  );
};
