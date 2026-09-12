import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './layout/Footer'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import { verifyToken } from './store/actions/clientActions'

function App() {
  const dispatch = useDispatch()

  // Auto-login: uygulama acilisinda bir kez calisir.
  // localStorage'da token yoksa thunk hic istek atmaz.
  // Yonlendirme yapilmaz; kullanici actigi route'ta kalir.
  useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch])

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
