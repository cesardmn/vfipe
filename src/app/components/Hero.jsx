import { FiTrendingUp, FiCheck } from 'react-icons/fi'

const Hero = () => {
  return (
    <aside className="lg:w-1/4 lg:min-w-[300px] lg:h-full max-h-[40rem]">
      <article className="h-full bg-bk-2 rounded-xl p-6 shadow-lg flex flex-col justify-evenly">
        <header>
          <h2 className="text-2xl font-bold text-or-2">
            Consulta FIPE Simplificada
          </h2>
        </header>

        <div className="my-4">
          <p className="text-gr-1">
            Obtenha valores oficiais de veículos diretamente da tabela FIPE de
            forma rápida e intuitiva.
          </p>
        </div>

        <section className="bg-bk-1 p-4 rounded-lg">
          <h3 className="font-semibold text-or-1 mb-2 flex items-center">
            <FiTrendingUp className="w-5 h-5 mr-2" />
            Destaques:
          </h3>
          <ul className="space-y-2 text-gr-1">
            <FeatureItem text="Dados direto da tabela FIPE oficial" />
            <FeatureItem text="Consultas rápidas e sem complicação" />
            <FeatureItem text="Filtro avançado para melhor localização" />
          </ul>
        </section>
      </article>
    </aside>
  )
}

const FeatureItem = ({ text }) => (
  <li className="flex items-start">
    <FiCheck className="w-5 h-5 text-of-green-2 mr-2 flex-shrink-0" />
    {text}
  </li>
)

export default Hero
