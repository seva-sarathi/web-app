import { Space_Grotesk } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css"; // Tailwind imports
import AuthProvider from "../components/provider/AuthProvider";

// Configure the bold, boxy font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-space',
});

export const metadata = {
  title: "SevaSarathi | AGV Management",
  description: "Automated Logistics for Modern Hospitals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased bg-white text-black`}>
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