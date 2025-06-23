# V FIPE - Consulta de Veículos

## Visão Geral

O **V FIPE** é uma aplicação web que simplifica a consulta de valores de veículos utilizando os dados oficiais da Tabela FIPE. Com uma interface intuitiva e responsiva, os usuários podem obter informações atualizadas sobre preços de carros, motos e veículos pesados de forma rápida e direta.

## Funcionalidades

- **Consulta completa:** Acesse valores FIPE por marca, modelo, ano e tipo de veículo
- **Dados atualizados:** Integração direta com a API oficial da FIPE
- **Cache inteligente:** Armazenamento local para melhor performance
- **Tipos de veículos:**
- **Interface amigável:**
  - Busca por texto em marcas e modelos
  - Visualização organizada por ano e combustível
  - Design responsivo para todos os dispositivos

## Como Utilizar

1. **Selecione a tabela de referência** mais recente (atualizada mensalmente)
2. **Escolha o tipo de veículo** (Carro, Moto ou Pesado)
3. **Selecione a marca** desejada na lista completa
4. **Escolha o modelo** específico
5. **Visualize os anos disponíveis** e seus respectivos valores FIPE

## Instalação e Execução

### Pré-requisitos

- Node.js >= 18
- npm >= 9

### Passos

```sh
git clone https://github.com/seu-usuario/v-fipe.git
cd v-fipe
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts

- `npm run dev` — Inicia o ambiente de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run start` — Inicia o servidor de produção
- `npm run lint` — Executa análise estática de código
- `npm run format` — Formata o código automaticamente

## Estrutura do Projeto

```
v-fipe/
├── app/
│   ├── api/                     # Endpoints da API
│   │   ├── anomodelo/           # Consulta ano/modelo
│   │   ├── marcas/              # Consulta marcas
│   │   ├── modelos/             # Consulta modelos
│   │   ├── referencia/          # Consulta tabela de referência
│   │   └── vehicle/             # Consulta veículo completo
│   ├── components/              # Componentes da UI
│   ├── store/                   # Gerenciamento de estado (Zustand)
│   ├── services/                # Serviços auxiliares
│   ├── layout.jsx               # Layout principal
│   └── page.jsx                 # Página inicial
├── public/                      # Assets estáticos
├── styles/                      # Estilos globais
```

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (Gerenciamento de estado)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Licença

MIT © 2025 [Cesar Dimi]

---

uma ferramenta [autoflux](https://autoflux.app.br/)
