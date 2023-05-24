import CreateTicket from "./CreateTicket";

export default function CreateTicketPage() {
  return (
    <div className="flex flex-col items-center px-2 xl:px-4 w-full xl:max-w-md">
      <h1 className="text-2xl font-bold">Return your order.</h1>
      <CreateTicket />
    </div>
  );
}
