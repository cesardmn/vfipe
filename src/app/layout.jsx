import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

import ClientProvider from '@/app/providers/ClientProvider'

export const metadata = {
  title: 'V FIPE',
  description: 'O jeito mais simples de obter dados da Tabela Fipe.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="bg-bk-3 text-wt-3 h-full flex flex-col">
        <ClientProvider>
          <Header className="shrink-0" />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  )
}
