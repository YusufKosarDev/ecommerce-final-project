import { useHistory } from 'react-router-dom'
import { formatPrice } from '../utils/products'
import {
  DISCOUNT_THRESHOLD,
  FREE_SHIPPING_THRESHOLD,
  calculateOrderSummary,
} from '../utils/order'

function SummaryRow({ label, value, hint, testId, emphasis = false, negative = false }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-4">
        <span className={emphasis ? 'text-base font-bold text-dark' : 'text-sm text-muted'}>
          {label}
        </span>
        <span
          data-testid={testId}
          className={
            emphasis
              ? 'text-lg font-bold text-dark'
              : `text-sm font-bold ${negative ? 'text-[#23856D]' : 'text-dark'}`
          }
        >
          {negative && value > 0 ? `-${formatPrice(value)}` : formatPrice(value)}
        </span>
      </div>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  )
}

function OrderSummary({ cart }) {
  const history = useHistory()

  const { productsTotal, shipping, discount, grandTotal, isFreeShipping, hasDiscount } =
    calculateOrderSummary(cart)

  const hasSelection = productsTotal > 0

  return (
    <aside
      data-testid="order-summary"
      className="flex w-full flex-col gap-4 border border-gray-200 p-6 md:w-80 md:shrink-0"
    >
      <h2 className="text-lg font-bold text-dark">Siparis Ozeti</h2>

      <SummaryRow label="Products Total" value={productsTotal} testId="summary-products" />

      <SummaryRow
        label="Shipping"
        value={shipping}
        testId="summary-shipping"
        hint={
          hasSelection && !isFreeShipping
            ? `${formatPrice(FREE_SHIPPING_THRESHOLD)} ve uzeri alisverislerde kargo bedava.`
            : undefined
        }
      />

      <SummaryRow
        label="Discount"
        value={discount}
        testId="summary-discount"
        negative
        hint={
          hasSelection && !hasDiscount
            ? `${formatPrice(DISCOUNT_THRESHOLD)} ve uzeri alisverislerde %10 indirim.`
            : undefined
        }
      />

      <hr className="border-gray-200" />

      <SummaryRow label="Grand Total" value={grandTotal} testId="summary-grand-total" emphasis />

      <button
        type="button"
        data-testid="create-order"
        disabled={!hasSelection}
        onClick={() => history.push('/checkout/address')}
        className="w-full rounded bg-primary px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Order
      </button>
    </aside>
  )
}

export default OrderSummary
