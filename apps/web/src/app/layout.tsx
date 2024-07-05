import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme";
import QueryClientWrapper from "~/components/query-client-wrapper";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
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
        <QueryClientWrapper>
          <ThemeProvider
            disableTransitionOnChange
            defaultTheme="dark"
            attribute="class"
          >
            {children}
          </ThemeProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
