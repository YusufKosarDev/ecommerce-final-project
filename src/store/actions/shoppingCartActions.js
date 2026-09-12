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
