import { getProductImage, formatPrice } from '../utils/products'

// T18'de quantity / remove / cart page eklenecek; T17'de yalnizca listeleme.
function CartDropdown({ cart }) {
  return (
    <div
      data-testid="cart-dropdown"
      className="absolute right-0 top-full z-20 mt-3 flex w-80 flex-col gap-3 border border-gray-200 bg-white px-4 py-4 shadow-md"
    >
      <p className="text-sm font-bold text-dark">Sepetim</p>

      {cart.length === 0 ? (
        <p data-testid="cart-empty" className="py-4 text-center text-sm text-muted">
          Sepetiniz bos.
        </p>
      ) : (
        <ul className="flex max-h-80 flex-col gap-3 overflow-y-auto">
          {cart.map((item) => (
            <li
              key={item.product.id}
              data-testid="cart-item"
              className="flex items-center gap-3"
            >
              <img
                src={getProductImage(item.product)}
                alt={item.product.name}
                className="h-14 w-14 shrink-0 object-cover"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="truncate text-sm font-bold text-dark">{item.product.name}</p>
                <p className="text-xs text-muted">
                  <span data-testid="cart-item-count">Adet: {item.count}</span>
                </p>
                <p className="text-xs font-bold text-[#23856D]">
                  {formatPrice(item.product.price)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartDropdown
