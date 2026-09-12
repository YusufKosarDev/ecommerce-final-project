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
