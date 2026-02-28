import "./globals.css";
import AmplifyProvider from "@/components/AmplifyProvider";

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
    <html lang="en">
      <body>
        <AmplifyProvider>
          {children}
        </AmplifyProvider>
      </body>
    </html>
  );
}