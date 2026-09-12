import { useDispatch, useSelector } from 'react-redux'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  toggleCartItem,
} from '../store/actions/shoppingCartActions'
import { formatPrice, getProductImage } from '../utils/products'

const iconButton =
  'flex h-8 w-8 items-center justify-center border border-gray-200 text-dark transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40'

function ShoppingCartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)

  // Yalnizca secili (checked) satirlarin toplami.
  // Detayli Order Summary T19 kapsaminda.
  const selectedTotal = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + Number(item.product?.price ?? 0) * item.count, 0)

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 py-10 md:py-16">
        <h1 className="text-2xl font-bold text-dark md:text-3xl">Sepetim</h1>

        {cart.length === 0 ? (
          <div
            data-testid="cart-page-empty"
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <ShoppingCart size={40} className="text-gray-300" aria-hidden="true" />
            <p className="text-sm font-bold text-muted">Sepetiniz bos.</p>
            <Link
              to="/shop"
              className="rounded bg-primary px-8 py-3 text-sm font-bold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-4" data-testid="cart-page-list">
              {cart.map((item) => (
                <li
                  key={item.product.id}
                  data-testid="cart-row"
                  data-product-id={item.product.id}
                  className="flex flex-col gap-4 border border-gray-200 p-4 md:flex-row md:items-center md:gap-6"
                >
                  <div className="flex items-center gap-4 md:flex-1">
                    <input
                      type="checkbox"
                      aria-label={`${item.product.name} secimi`}
                      checked={item.checked}
                      onChange={() => dispatch(toggleCartItem(item.product.id))}
                      className="h-4 w-4 shrink-0 rounded border-gray-300 accent-primary"
                    />

                    <img
                      src={getProductImage(item.product)}
                      alt={item.product.name}
                      className="h-20 w-20 shrink-0 object-cover"
                    />

                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="truncate text-sm font-bold text-dark">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted" data-testid="unit-price">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Azalt"
                        data-testid="decrement"
                        disabled={item.count <= 1}
                        onClick={() => dispatch(decrementCartItem(item.product.id))}
                        className={iconButton}
                      >
                        <Minus size={14} />
                      </button>

                      <span
                        data-testid="item-count"
                        className="min-w-8 text-center text-sm font-bold text-dark"
                      >
                        {item.count}
                      </span>

                      <button
                        type="button"
                        aria-label="Artir"
                        data-testid="increment"
                        onClick={() => dispatch(incrementCartItem(item.product.id))}
                        className={iconButton}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p
                      data-testid="row-total"
                      className="min-w-24 text-right text-sm font-bold text-dark"
                    >
                      {formatPrice(Number(item.product?.price ?? 0) * item.count)}
                    </p>

                    <button
                      type="button"
                      aria-label="Urunu kaldir"
                      data-testid="remove"
                      onClick={() => dispatch(removeCartItem(item.product.id))}
                      className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-stretch gap-3 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-end md:gap-6">
              <p className="text-sm font-bold text-muted">
                Selected total:{' '}
                <span className="text-lg text-dark" data-testid="selected-total">
                  {formatPrice(selectedTotal)}
                </span>
              </p>

              <Link
                to="/shop"
                className="rounded border border-primary px-8 py-3 text-center text-sm font-bold text-primary"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ShoppingCartPage
