import { cookies } from "next/headers";
import { createRequestUrl } from "../../../../api";
import { SupportAgent } from "../../../../types";
import { UpdateAgent } from "./UpdateAgent";

async function getSupportAgent(id: number): Promise<SupportAgent> {
  const cookie = cookies().get("authentication");
  const res = await fetch(createRequestUrl(`/agent/${id}`), {
    cache: 'no-store',
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
  const data = await res.json() as any;
  return data?.agent ?? {}
}

export default async function EditPage({ params }) {
  const agent = await getSupportAgent(params.id);
  return (
    <div className="flex flex-col items-center px-2 xl:px-4">
      <h1 className="text-2xl font-bold">Edit Support Agent</h1>
      <UpdateAgent agent={agent} />
    </div>
  );
}
