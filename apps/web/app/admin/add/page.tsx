import { AddAgent } from "./AddAgent";

export default async function EditPage({ params }) {
  return (
    <div className="flex flex-col items-center px-2 xl:px-4">
      <h1 className="text-2xl font-bold">Add Support Agent</h1>
      <AddAgent />
    </div>
  );
}
