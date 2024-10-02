import "@/app/_styles/globals.css";
import { Lato } from "next/font/google";
import { ChildrenOnlyProps } from "@/app/_types/types";
import { Toaster } from "react-hot-toast";

import ReduxProvider from "@/app/_components/ReduxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin-ext"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | useGuitar",
    default: "Home | useGuitar",
  },
  description:
    "useGuitar online music shop. Bass, guitars, amplifiers, multi effects, pickups and more!",
};

function RootLayout({ children }: ChildrenOnlyProps) {
  return (
    <html>
      <body
        className={`${lato.className} bg-primary-900 text-fontPrimary-500 min-h-dvh`}
      >
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 10000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#181C28",
              color: "#e5e5e5",
              border: "#384661",
            },
          }}
        />
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="dark"
          >
            <div>{children}</div>
          </ThemeProvider>
        </ReduxProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
