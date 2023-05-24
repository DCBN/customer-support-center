"use client";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback } from "react";
import { createRequestUrl } from "../../api";
import { SupportAgent } from "../../types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface SupportAgentListProps {
  supportAgents: SupportAgent[];
}

export default function SupportAgentList({
  supportAgents,
}: SupportAgentListProps) {
  const router = useRouter();
  const onDelete = useCallback(
    async (id: number) => {
      try {
        await fetch(createRequestUrl(`/agent/${id}`), {
          method: "DELETE",
          credentials: 'include'
        });
      } catch {
        console.error("Failed to delete");
      }

      router.refresh();
    },
    [router]
  );

  if (!supportAgents) {
    return null;
  }

  return (
    <div className="mt-4 bg-slate-50 shadow-xl py-8 px-4 rounded">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Support Agents</h2>
        <Link href="/admin/add" className="text-sky-600 underline">
          Add agent
        </Link>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {supportAgents.map((agent) => (
          <li
            key={agent.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {agent.name}
              </p>
              <p className="text-sm font-light leading-6 text-gray-400">
                Created at {agent.createdAt}
              </p>
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`/admin/edit/${agent.id}`}
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Edit<span className="sr-only">, {agent.name}</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                          onClick={() => onDelete(agent.id as number)}
                        >
                          Delete<span className="sr-only">, {agent.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
