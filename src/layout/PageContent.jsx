import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ShopPage from '../pages/ShopPage'

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
        <Route exact path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetailPage />
        </Route>
      </Switch>
    </main>
  )
}

export default PageContent
