import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme";
import QueryClientWrapper from "~/components/query-client-wrapper";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata = {
  title: "Movie Tracker",
  description:
    "Discover new movies and track your progress with this handy tool!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <CookiesProvider>
          <QueryClientWrapper>
            <ThemeProvider
              disableTransitionOnChange
              defaultTheme="dark"
              attribute="class"
            >
              {children}
            </ThemeProvider>
          </QueryClientWrapper>
        </CookiesProvider>
      </body>
    </html>
  );
}
