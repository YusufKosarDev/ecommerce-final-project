import axiosInstance from '../../api/axiosInstance'
import {
  FETCH_STATES,
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

// Backend'in kabul ettigi sort degerleri. Gecersiz deger gonderilirse API hata donuyor.
export const VALID_SORT_VALUES = ['price:asc', 'price:desc', 'rating:asc', 'rating:desc']

// Bos/undefined degerler URL'ye eklenmez; category + filter + sort birlikte gonderilir.
export function buildProductQueryParams({ category, filter, sort } = {}) {
  const params = {}

  if (category !== undefined && category !== null && String(category).trim() !== '') {
    params.category = String(category).trim()
  }

  const trimmedFilter = String(filter ?? '').trim()
  if (trimmedFilter) params.filter = trimmedFilter

  const trimmedSort = String(sort ?? '').trim()
  if (trimmedSort && VALID_SORT_VALUES.includes(trimmedSort)) params.sort = trimmedSort

  return params
}

// Thunk: GET /products (T14 - category / filter / sort query parametreleri)
// fetchState akisi: FETCHING -> FETCHED | FAILED
// Hata cagirana iletilir ki component gerekirse detay gosterebilsin.
export const fetchProducts = (options = {}) => async (dispatch) => {
  dispatch(setFetchState(FETCH_STATES.FETCHING))

  try {
    const params = buildProductQueryParams(options)
    const response = await axiosInstance.get('/products', { params })
    const data = response.data ?? {}

    dispatch(setProductList(Array.isArray(data.products) ? data.products : []))
    dispatch(setTotal(Number(data.total) || 0))
    dispatch(setFetchState(FETCH_STATES.FETCHED))

    return data
  } catch (error) {
    dispatch(setFetchState(FETCH_STATES.FAILED))
    throw error
  }
}
