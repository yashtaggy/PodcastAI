import "./globals.css";
import AmplifyProvider from "@/components/AmplifyProvider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "PodCast AI",
  description: "AI-powered podcast intelligence platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AmplifyProvider>
            {children}
          </AmplifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
