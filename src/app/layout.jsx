import './globals.css'
import Header from './components/Header'
import styles from './page.module.css'

import ClientProvider from '@/app/providers/ClientProvider'
export const metadata = {
  title: 'V FIPE',
  description: 'O jeito mais simples de obter dados da Tabela Fipe.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main className={styles.main}>
          <ClientProvider>{children}</ClientProvider>
        </main>
      </body>
    </html>
  )
}
