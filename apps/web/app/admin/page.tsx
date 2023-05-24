import { cookies } from "next/headers";
import { createRequestUrl } from "../../api";
import { SupportAgent } from "../../types";
import SupportAgentList from "./AgentList";

async function getSupportAgents(): Promise<SupportAgent[]> {
  const cookie = cookies().get("authentication");
  const res = await fetch(createRequestUrl('/agent'), {
    cache: "no-store",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  const data = await res.json();
  return data?.agents ?? [];
}

export default async function Page() {
  const supportAgents = await getSupportAgents();

  return (
    <div className="flex flex-col px-2 xl:px-4">
      <h1 className="font-bold text-4xl mb-4 text-center">Manage Support Agents</h1>
      <SupportAgentList supportAgents={supportAgents} />
    </div>
  );
}
