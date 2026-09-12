import {
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
  TOGGLE_CART_ITEM,
} from '../actions/actionTypes'

const initialState = {
  cart: [],
  payment: {},
  address: {},
}

const matchesProduct = (item, productId) => String(item.product?.id) === String(productId)

// Tek satiri immutable sekilde gunceller; eslesme yoksa item aynen birakilir.
const updateItem = (cart, productId, updater) =>
  cart.map((item) => (matchesProduct(item, productId) ? updater(item) : item))

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
          cart: updateItem(state.cart, product.id, (item) => ({
            ...item,
            count: item.count + 1,
          })),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { count: 1, checked: true, product }],
      }
    }
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cart: updateItem(state.cart, action.payload, (item) => ({
          ...item,
          count: item.count + 1,
        })),
      }
    case DECREMENT_CART_ITEM:
      // count 1'in altina dusmez; satir silme REMOVE_CART_ITEM ile yapilir.
      return {
        ...state,
        cart: updateItem(state.cart, action.payload, (item) =>
          item.count > 1 ? { ...item, count: item.count - 1 } : item,
        ),
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => !matchesProduct(item, action.payload)),
      }
    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: updateItem(state.cart, action.payload, (item) => ({
          ...item,
          checked: !item.checked,
        })),
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
