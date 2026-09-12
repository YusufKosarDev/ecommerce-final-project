import { SET_ADDRESS, SET_CART, SET_PAYMENT } from './actionTypes'

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
