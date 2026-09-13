// Siparis ozeti hesaplari TEK yerde tutulur.
// T19 kapsaminda shipping/discount API'den gelmiyor; asagidaki demo kurallar kullaniliyor.

export const SHIPPING_FEE = 29.99
export const FREE_SHIPPING_THRESHOLD = 150

export const DISCOUNT_RATE = 0.1
export const DISCOUNT_THRESHOLD = 1000

export function getProductsTotal(cart) {
  if (!Array.isArray(cart)) return 0
  return cart
    .filter((item) => item?.checked)
    .reduce((sum, item) => sum + Number(item?.product?.price ?? 0) * Number(item?.count ?? 0), 0)
}

export function calculateOrderSummary(cart) {
  const productsTotal = getProductsTotal(cart)

  // Secili urun yoksa kargo da indirim de uygulanmaz.
  if (productsTotal <= 0) {
    return {
      productsTotal: 0,
      shipping: 0,
      discount: 0,
      grandTotal: 0,
      isFreeShipping: false,
      hasDiscount: false,
    }
  }

  const isFreeShipping = productsTotal >= FREE_SHIPPING_THRESHOLD
  const shipping = isFreeShipping ? 0 : SHIPPING_FEE

  const hasDiscount = productsTotal >= DISCOUNT_THRESHOLD
  const discount = hasDiscount ? productsTotal * DISCOUNT_RATE : 0

  return {
    productsTotal,
    shipping,
    discount,
    grandTotal: productsTotal + shipping - discount,
    isFreeShipping,
    hasDiscount,
  }
}

// Backend order_date'i iki formatta donebiliyor:
//   "2026-09-13T12:00:00.000Z" (ISO) ve "2026-09-10 08:30:00" (SQL datetime).
// Cozulemeyen deger crash yerine ham metin olarak gosterilir.
export function formatOrderDate(value) {
  if (!value) return '-'

  const normalized = typeof value === 'string' ? value.replace(' ', 'T') : value
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return String(value)

  try {
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  } catch {
    return date.toISOString()
  }
}

// Siparisteki toplam parca adedi (satir sayisi degil, count toplami)
export function getOrderItemCount(order) {
  const products = Array.isArray(order?.products) ? order.products : []
  return products.reduce((sum, item) => sum + (Number(item?.count) || 0), 0)
}
