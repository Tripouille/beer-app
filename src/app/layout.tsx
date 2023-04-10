import { MainLayout } from "@/components/MainLayout";
import { ServerStyleSheet } from "@/components/ServerStyleSheet";
import { QueryProvider } from "@/providers/QueryProvider";
import { createMetadata } from "@/utils/createMetadata";
import { Quicksand } from "next/font/google";

export const metadata = createMetadata({
  type: "website",
  title: "Search Brewdog's Beer Catalogue for your favorite brews",
  description:
    "Discover the ultimate beer search tool with Beer App. Easily search through Brewdog's expansive beer catalogue to find your favorite brews, whether you're looking for something with a high ABV or a perfect pairing for your meal. With Beer App, the world of craft beer is at your fingertips",
});

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <QueryProvider>
          <ServerStyleSheet>
            <MainLayout>{children}</MainLayout>
          </ServerStyleSheet>
        </QueryProvider>
      </body>
    </html>
  );
}
