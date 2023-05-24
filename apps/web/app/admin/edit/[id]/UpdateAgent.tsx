"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { createRequestUrl } from "../../../../api";
import { Banner } from "../../../../components/Banner";
import {
  UpdateSupportAgentForm,
  UpdateSupportAgentData,
} from "../../../../components/Forms";

interface Agent extends UpdateSupportAgentData {
  id: number;
}

interface UpdateAgentProps {
  agent: Agent;
}

export const UpdateAgent: FC<UpdateAgentProps> = ({ agent }) => {
  const [error, toggleError] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: UpdateSupportAgentData) => {
      try {
        await fetch(createRequestUrl(`/agent/${agent.id}`), {
          method: "PUT",
          credentials: 'include',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/admin");
      } catch {
        toggleError(true);
      }
    },
    [router, agent.id, toggleError]
  );

  const onReset = useCallback(async () => {
    return router.back();
  }, [router]);

  return (
    <div className="w-full xl:max-w-md mt-6 rounded-xl shadow-md xl:shadow-lg px-4 py-4 border">
      {error ? (
        <Banner color="error">Something went wrong... Try again later!</Banner>
      ) : null}
      <UpdateSupportAgentForm
        defaultValues={agent}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </div>
  );
};
