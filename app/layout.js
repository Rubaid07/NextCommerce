import "./globals.css";
import AuthProvider from "./providers";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 

export const metadata = {
  title: "Next Commerce", 
  description: "A modern web application built with Next.js, offering seamless authentication, elegant design, and a smooth user experience.",
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}