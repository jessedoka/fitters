import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fitters',
  description: 'Find your next fit',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="animate-loading bg-green-500 h-1.5 rounded-full fixed top-0 left-0"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
