import { useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { TOKEN_STORAGE_KEY } from '../store/actions/clientActions'

function hasStoredToken() {
  try {
    return Boolean(localStorage.getItem(TOKEN_STORAGE_KEY))
  } catch {
    return false
  }
}

// React Router v5 icin minimum korumali route.
// Login degilse /login'e yonlendirir; location.state.from sayesinde
// kullanici giris sonrasi ayni sayfaya geri doner.
//
// ONEMLI: Sayfa yenilendiginde auto-login (GET /verify) asenkron calisir ve
// ilk render'da client.user henuz bostur. localStorage'da token varsa dogrulama
// bitene kadar bekleriz; aksi halde gecerli oturum haksiz yere /login'e atilirdi.
// Verify basarisiz olursa token temizlenir ve bir sonraki render'da redirect calisir.
function ProtectedRoute({ children, ...routeProps }) {
  const user = useSelector((state) => state.client.user)
  const location = useLocation()

  const isLoggedIn = Boolean(user && user.email)
  const isVerifying = !isLoggedIn && hasStoredToken()

  return (
    <Route {...routeProps}>
      {isLoggedIn ? (
        children
      ) : isVerifying ? (
        <div
          data-testid="auth-checking"
          className="flex w-full items-center justify-center gap-2 py-20 text-sm font-bold text-muted"
        >
          <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
          Oturum dogrulaniyor...
        </div>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
      )}
    </Route>
  )
}

export default ProtectedRoute
