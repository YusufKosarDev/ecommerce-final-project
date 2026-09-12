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
