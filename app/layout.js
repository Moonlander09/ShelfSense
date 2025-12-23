import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./ReactQueryProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "ShelfSense",
  description: "Home inventory made simple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${manrope.className} antialiased`} style={{ backgroundImage: "var(--app-bg-gradient)", backgroundAttachment: "fixed" }}>
        <ReactQueryProvider>
          {/* Mobile container */}
          <div className="mx-auto w-full max-w-[420px] ">
            {children}
          </div>
        </ReactQueryProvider>

       <Toaster
  position="top-center"
  toastOptions={{
    success: {
      style: {
        background: "#2e7d32", // green
        color: "#fff",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#2e7d32",
      },
    },
    error: {
      style: {
        background: "#d32f2f", // red
        color: "#fff",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#d32f2f",
      },
    },
  }}
/>
      </body>
    </html>
  );
}
