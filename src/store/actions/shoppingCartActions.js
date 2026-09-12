import { ADD_TO_CART, SET_ADDRESS, SET_CART, SET_PAYMENT } from './actionTypes'

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
