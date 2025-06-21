
import Hero from './components/Hero'
import Content from './components/Content'

const App = () => {

  return (
    <main className="container mx-auto px-4 py-4 flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
      <Hero />
      <Content />
    </main>

  )
}

export default App
