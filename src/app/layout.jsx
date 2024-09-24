import "./globals.css";

export const metadata = {
  title: "V FIPE",
  description: "O jeito mais simples de obter dados da Tabela Fipe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
