import "@/styles/globals.css";
import { Suspense } from "react";
import Header from "./Header";
import Loading from "./loading";
import Providers from "./Providers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-gray-100 dark:bg-zinc-900 transition-all duration-700">
        <Providers>
          <Header />
          <Suspense fallback={<Loading />}>
            <div className="max-w-6xl mx-auto">{children}</div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
