const Hero = () => {
  return (
    <div className="h-full bg-bk-2 rounded-xl p-6 shadow-lg flex flex-col">
      <div className="flex flex-col justify-between h-full">
        <h2 className="text-2xl font-bold text-or-2">
          Consulta FIPE Simplificada
        </h2>
        <p className="text-gr-1">
          Obtenha valores oficiais de veículos diretamente da tabela FIPE de
          forma rápida e intuitiva.
        </p>

        <div className="bg-bk-1 p-4 rounded-lg">
          <h3 className="font-semibold text-or-1 mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            Destaques:
          </h3>
          <ul className="space-y-2 text-gr-1">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-of-green-2 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Dados direto da tabela FIPE oficial
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-of-green-2 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Consultas rápidas e sem complicação
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-of-green-2 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Filtro avançado para melhor localização das características
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Hero
