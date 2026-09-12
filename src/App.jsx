import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './layout/Footer'
import Header from './layout/Header'
import PageContent from './layout/PageContent'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} newestOnTop />
    </div>
  )
}

export default App
