import { Route, Switch } from 'react-router-dom'
import AboutPage from '../pages/AboutPage'
import ProtectedRoute from '../components/ProtectedRoute'
import CheckoutAddressPage from '../pages/CheckoutAddressPage'
import CheckoutPaymentPage from '../pages/CheckoutPaymentPage'
import ContactPage from '../pages/ContactPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
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
      </Switch>
    </main>
  )
}

export default PageContent
