import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
        <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    )
}