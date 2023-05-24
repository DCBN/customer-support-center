"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { createRequestUrl } from "../../../../api";
import { Button } from "../../../../components/Button";
import { Ticket } from "../../../../types";

interface TicketDisplayProps {
  ticket: Ticket;
}

export const TicketDisplay: FC<TicketDisplayProps> = ({ ticket }) => {
  const router = useRouter();

  const onResolve = useCallback(async () => {
    try {
      await fetch(createRequestUrl(`/ticket/${ticket.id}/resolve`), {
        method: 'PUT',
        credentials: 'include'
      });

      router.refresh();
    } catch (err) {
      console.log('Err', err)
    }
  }, [ticket.id, router]);

  return (
    <div className="flex flex-col gap-4 w-[50%]">
      <div className="divide-y">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Title
          </span>
          <div className="mt-2 sm:col-span-2 sm:mt-0">{ticket.title}</div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            description
          </span>
          <div className="mt-2 sm:col-span-2 sm:mt-0">{ticket.description}</div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Resolved
          </span>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            {ticket.resolved ? "Resolved" : "Active"}
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Assigned to
          </span>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            {ticket.assignedTo?.name}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onResolve}>Resolve</Button>
      </div>
    </div>
  );
};
