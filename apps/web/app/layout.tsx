import { Header } from "./LayoutHeader";
import "./global.css";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has('authentication');

  return (
    <html lang="en">
      <body>
        <Header isAuthenticated={isAuthenticated} />
        <div className="grid md:grid-cols-4">
          <div className="col-span-full md:col-start-2 md:col-span-2 py-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
