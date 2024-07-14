import "@/app/_styles/globals.css";
import { Lato } from "next/font/google";
import { ChildrenOnlyProps } from "@/app/_types/types";
import { Toaster } from "react-hot-toast";

import ReduxProvider from "@/app/_components/ReduxProvider";

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin-ext"],
  display: "swap",
});

function RootLayout({ children }: ChildrenOnlyProps) {
  return (
    <html>
      <body
        className={`${lato.className} bg-primary-900 text-slate-200 min-h-dvh`}
      >
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
        <ReduxProvider>
          <div>{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
