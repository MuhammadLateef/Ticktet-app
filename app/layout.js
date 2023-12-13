import { Inter } from 'next/font/google';
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import './globals.css';
const inter = Inter({ subsets: ['latin'] })
import Navheader from './(components)/Navheader'
export const metadata = {
  title: 'ticket app',
  description: 'Ticket app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <Navheader />
          <div className=" flex-grow overflow-y-auto bg-page text-default-text ">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
