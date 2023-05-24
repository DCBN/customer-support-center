import { cookies } from "next/headers";
import { createRequestUrl } from "../../api";
import { SupportAgent, Ticket } from "../../types";
import { ActiveTickets } from "./ActiveTickets";

async function getProfile(): Promise<SupportAgent> {
  const cookie = cookies().get("authentication");

  const url = createRequestUrl("/auth/profile");

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  return await res.json();
}

async function getAssignedTicket(agentId: number): Promise<Ticket | null> {
  const cookie = cookies().get("authentication");

  const url = createRequestUrl(`/ticket/agent/${agentId}`);

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  const data = await res.json();

  return data.ticket;
}

async function getActiveTickets(): Promise<Ticket[]> {
  const cookie = cookies().get("authentication");

  const url = createRequestUrl(`/ticket/active`);

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  const data = await res.json();

  return data.activeTickets ?? [];
}

export default async function SupportPage() {
  const profile = await getProfile();
  const [assignedTicket, activeTickets] = await Promise.all([
    getAssignedTicket(profile.id),
    getActiveTickets(),
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold">Support Agent Page</h1>
      <div className="flex flex-col gap-4 xl:gap-8 mt-4 xl:mt-8">
        <div>
          <h2 className="text-2xl font-semibold">My active case</h2>
          <ActiveTickets
            activeTickets={[assignedTicket].filter(Boolean) as Ticket[]}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">All Active Cases</h2>
          <ActiveTickets activeTickets={activeTickets} />
        </div>
      </div>
    </>
  );
}
