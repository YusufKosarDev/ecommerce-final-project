import {
  ADD_TO_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
} from '../actions/actionTypes'

const initialState = {
  cart: [],
  payment: {},
  address: {},
}

// Cart item shape: { count, checked, product }
function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload
      if (!product || product.id === undefined) return state

      const exists = state.cart.some((item) => item.product?.id === product.id)

      // Mevcut urun: yeni satir acilmaz, yalnizca count artar.
      // checked degeri korunur (yeni urunlerde true).
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product?.id === product.id ? { ...item, count: item.count + 1 } : item,
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { count: 1, checked: true, product }],
      }
    }
    case SET_CART:
      return { ...state, cart: action.payload }
    case SET_PAYMENT:
      return { ...state, payment: action.payload }
    case SET_ADDRESS:
      return { ...state, address: action.payload }
    default:
      return state
  }
}

export default shoppingCartReducer
