import { Link, Route, Switch } from 'react-router-dom'
import AboutPage from '../pages/AboutPage'
import ProtectedRoute from '../components/ProtectedRoute'
import CheckoutAddressPage from '../pages/CheckoutAddressPage'
import CheckoutPaymentPage from '../pages/CheckoutPaymentPage'
import ContactPage from '../pages/ContactPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import PreviousOrdersPage from '../pages/PreviousOrdersPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ShopPage from '../pages/ShopPage'
import ShoppingCartPage from '../pages/ShoppingCartPage'
import SignupPage from '../pages/SignupPage'
import TeamPage from '../pages/TeamPage'

function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/shop">
          <ShopPage />
        </Route>
        <Route exact path="/shop/:gender/:categoryName/:categoryId">
          <ShopPage />
        </Route>
        <Route exact path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetailPage />
        </Route>
        <ProtectedRoute exact path="/checkout/address">
          <CheckoutAddressPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/checkout/payment">
          <CheckoutPaymentPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/orders">
          <PreviousOrdersPage />
        </ProtectedRoute>
        <Route exact path="/cart">
          <ShoppingCartPage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/contact">
          <ContactPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/team">
          <TeamPage />
        </Route>

        {/* Eslesmeyen adresler (menudeki Blog/Pages dahil) bos sayfa yerine
            bilgilendirici bir icerik gorur. */}
        <Route>
          <section className="w-full bg-white">
            <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-20 text-center">
              <p className="text-sm font-bold text-primary">404</p>
              <h1 className="text-2xl font-bold text-dark md:text-3xl">Sayfa bulunamadi</h1>
              <p className="text-sm text-muted">
                Aradiginiz sayfa yayinda degil ya da adres hatali olabilir.
              </p>
              <Link
                to="/shop"
                className="rounded bg-primary px-8 py-3 text-sm font-bold text-white"
              >
                Alisverise devam et
              </Link>
            </div>
          </section>
        </Route>
      </Switch>
    </main>
  )
}

export default PageContent
