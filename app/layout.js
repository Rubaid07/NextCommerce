import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthProvider from "./providers";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>{children}</AuthProvider>
                 <Toaster /> 
            </body>
        </html>
    );
}