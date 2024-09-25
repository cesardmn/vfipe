import "./globals.css";
import Header from "./components/Header";
import styles from  './page.module.css'

export const metadata = {
  title: "V FIPE",
  description: "O jeito mais simples de obter dados da Tabela Fipe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main className={styles.main} >
          {children}
        </main>
      </body>
    </html>
  );
}
