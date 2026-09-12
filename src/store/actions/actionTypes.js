// Client
export const SET_USER = 'client/SET_USER'
export const SET_ROLES = 'client/SET_ROLES'
export const SET_ADDRESS_LIST = 'client/SET_ADDRESS_LIST'
export const SET_CREDIT_CARDS = 'client/SET_CREDIT_CARDS'
export const SET_THEME = 'client/SET_THEME'
export const SET_LANGUAGE = 'client/SET_LANGUAGE'

// Product
export const SET_CATEGORIES = 'product/SET_CATEGORIES'
export const SET_PRODUCT_LIST = 'product/SET_PRODUCT_LIST'
export const SET_PRODUCT = 'product/SET_PRODUCT'
export const SET_TOTAL = 'product/SET_TOTAL'
export const SET_FETCH_STATE = 'product/SET_FETCH_STATE'
export const SET_LIMIT = 'product/SET_LIMIT'
export const SET_OFFSET = 'product/SET_OFFSET'
export const SET_FILTER = 'product/SET_FILTER'

// Shopping cart
export const SET_CART = 'shoppingCart/SET_CART'
export const ADD_TO_CART = 'shoppingCart/ADD_TO_CART'
export const INCREMENT_CART_ITEM = 'shoppingCart/INCREMENT_CART_ITEM'
export const DECREMENT_CART_ITEM = 'shoppingCart/DECREMENT_CART_ITEM'
export const REMOVE_CART_ITEM = 'shoppingCart/REMOVE_CART_ITEM'
export const TOGGLE_CART_ITEM = 'shoppingCart/TOGGLE_CART_ITEM'
export const SET_PAYMENT = 'shoppingCart/SET_PAYMENT'
export const SET_ADDRESS = 'shoppingCart/SET_ADDRESS'

// fetchState icin izin verilen degerler
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
}
