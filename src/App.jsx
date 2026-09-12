import Footer from './layout/Footer'
import Header from './layout/Header'
import PageContent from './layout/PageContent'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PageContent />
      <Footer />
    </div>
  )
}

export default App
