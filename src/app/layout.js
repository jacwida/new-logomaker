import { Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const font = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Pixiapp Logomaker",
  icons: {
    icon: "/icon.svg",
  },
  description: "Make logo for free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("overflow-y-hidden", font.className)}>
        {children}
      </body>
    </html>
  );
}
