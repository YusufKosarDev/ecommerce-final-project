import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './layout/Footer'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import { verifyToken } from './store/actions/clientActions'
import { fetchCategories } from './store/actions/productActions'

function App() {
  const dispatch = useDispatch()

  // Auto-login: uygulama acilisinda bir kez calisir.
  // localStorage'da token yoksa thunk hic istek atmaz.
  // Yonlendirme yapilmaz; kullanici actigi route'ta kalir.
  useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch])

  // Kategoriler Header dropdown dahil tum sayfalarda kullanildigi icin acilista bir kez yuklenir.
  // Thunk tekrar istek atmaz; ShopPage ayni thunk i dispatch etse bile tek istek gider.
  useEffect(() => {
    dispatch(fetchCategories()).catch(() => {
      // Hata gosterimi ilgili sayfada yapilir
    })
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
