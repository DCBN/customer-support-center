import Link from "next/link";
import { Ticket } from "../../types";

interface ActiveTicketsProps {
  activeTickets: Ticket[];
}

export function ActiveTickets({ activeTickets }: ActiveTicketsProps) {
  if (activeTickets.length < 1) {
    return (
      <div>
        <p>No active cases</p>
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              ID
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Assigned Agent
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {activeTickets.map(({ id, title, assignedTo }) => (
            <tr key={id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {id}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 ">
                {title}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 ">
                {assignedTo?.name}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium text-indigo-600 sm:pr-0">
                <Link href={`/support/view/${id}`}>
                  View<span className="sr-only">, Ticket #{id}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
