import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createRequestUrl } from "../../../../api";
import { Ticket } from "../../../../types";
import Link from "next/link";
import { TicketDisplay } from "./TicketDisplay";

async function getTicket(ticketId: number): Promise<Ticket | null> {
  const cookie = cookies().get("authentication");

  const url = createRequestUrl(`/ticket/${ticketId}`);

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  const data = await res.json();

  return data.ticket;
}

interface TicketViewPageProps {
  params: {
    id: number;
  };
}

export default async function TicketViewPage({ params }: TicketViewPageProps) {
  const ticket = await getTicket(params.id);

  if (!ticket) {
    redirect("/support");
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <Link href="/support" className="text-indigo-600">
        Back to ticket list
      </Link>
      <h1 className="text-3xl font-bold">Ticket {ticket.id}</h1>
      <TicketDisplay ticket={ticket} />
    </div>
  );
}
