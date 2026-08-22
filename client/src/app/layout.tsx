import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css"; // Tailwind imports
import AuthProvider from "../components/provider/AuthProvider";

export const metadata = {
  title: "SevaSarathi | AGV Management",
  description: "Automated Logistics for Modern Hospitals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        {/* Wrap children in the AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Global Toastify Configuration - Boxy styling applied via Tailwind classes in toast props */}
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm"
        />
      </body>
    </html>
  );
}