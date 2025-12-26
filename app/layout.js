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
  gutter={12}
  toastOptions={{
    duration: 3000, // ⏱️ 3 seconds for all toasts

    style: {
      borderRadius: "14px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 500,
      boxShadow:
        "0 10px 25px -5px rgba(0,0,0,0.15), 0 4px 10px -6px rgba(0,0,0,0.1)",
    },

    success: {
      style: {
        background: "#2e7d32", // ✅ keep green
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#2e7d32",
      },
    },

    error: {
      style: {
        background: "#d32f2f", // ✅ keep red
        color: "#fff",
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
