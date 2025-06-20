// layout.jsx
import './globals.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ClientProvider from '@/app/providers/ClientProvider'

export const metadata = {
  title: 'V FIPE',
  description: 'O jeito mais simples de obter dados da Tabela Fipe.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="bg-bk-3 text-wt-3 h-full flex flex-col">
        <Header className="shrink-0" />
        <main className="container mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          <div className="lg:w-1/4 lg:min-w-[300px] lg:h-full">
            <Hero />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <ClientProvider>{children}</ClientProvider>
          </div>
        </main>
      </body>
    </html>
  )
}
