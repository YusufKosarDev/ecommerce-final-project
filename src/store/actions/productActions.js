import axiosInstance from '../../api/axiosInstance'
import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
} from './actionTypes'

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
})

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
})

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
})

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
})

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
})

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
})

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
})

// Ucusta olan istegi paylasmak icin modul seviyesinde referans.
// Ayni anda birden fazla component fetchCategories dispatch etse bile tek istek atilir.
let categoriesRequest = null

// Thunk: GET /categories
// - Redux'ta categories doluysa istek atmaz
// - Ayni anda gelen cagriler ayni promise'i paylasir
// - Hata cagiran tarafa iletilir (component loading/error gosterir)
export const fetchCategories = () => (dispatch, getState) => {
  const existing = getState().product.categories

  if (Array.isArray(existing) && existing.length > 0) {
    return Promise.resolve(existing)
  }

  if (categoriesRequest) return categoriesRequest

  categoriesRequest = axiosInstance
    .get('/categories')
    .then((response) => {
      const categories = Array.isArray(response.data) ? response.data : []
      dispatch(setCategories(categories))
      return categories
    })
    .finally(() => {
      categoriesRequest = null
    })

  return categoriesRequest
}
