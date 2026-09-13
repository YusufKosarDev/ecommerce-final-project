import axiosInstance from '../../api/axiosInstance'
import {
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
  TOGGLE_CART_ITEM,
} from './actionTypes'

// Sepete urun ekler. Ayni product.id varsa reducer count'u artirir.
export const addProductToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
})

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
})

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
})

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
})

// Cart satir islemleri (T18). Hepsi productId ile calisir.
export const incrementCartItem = (productId) => ({
  type: INCREMENT_CART_ITEM,
  payload: productId,
})

export const decrementCartItem = (productId) => ({
  type: DECREMENT_CART_ITEM,
  payload: productId,
})

export const removeCartItem = (productId) => ({
  type: REMOVE_CART_ITEM,
  payload: productId,
})

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
})

// ---- Order (T22) ----
// Gercek POST /order davranisi:
//   Istek : { address_id, order_date, card_no, card_name, card_expire_month,
//             card_expire_year, card_ccv, price, products: [{ product_id, count, detail }] }
//   Yanit : HTTP 201
//           { id, address_id, order_date, card_no, card_name, card_expire_month,
//             card_expire_year, price, products: [<olusan satir id'leri>] }
// NOT: card_ccv yanitta DONMEZ (saklanmiyor); yalnizca istekte gider.
// NOT: T21 kart API'si name_on_card kullanir, order payload'i card_name bekler.
export const createOrder = (orderPayload) => async () => {
  const response = await axiosInstance.post('/order', orderPayload)
  return response.data
}

// GET /order — login olmus kullanicinin gecmis siparisleri (T23).
// Gercek yanit (dogrulandi): ust seviye ARRAY
//   [{ id, user_id, address_id, order_date, card_no (number), card_name,
//      card_expire_month, card_expire_year, price (number),
//      products: [{ id, name, description, price, count, images: [{ url, index }] }] }]
// NOT: address objesi DONMEZ, yalnizca address_id gelir.
// NOT: card_ccv ve gonderilen product "detail" alani yanitta yer almaz.
export const fetchOrders = () => async () => {
  const response = await axiosInstance.get('/order')
  return Array.isArray(response.data) ? response.data : []
}
