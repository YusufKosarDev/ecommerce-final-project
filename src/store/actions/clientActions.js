import axiosInstance, { setAuthToken } from '../../api/axiosInstance'
import {
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
} from './actionTypes'

export const TOKEN_STORAGE_KEY = 'token'

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
})

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
})

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
})

// Thunk: POST /login
// Gercek response shape: { token, name, email, role_id }
// rememberMe backend'e GONDERILMEZ; sadece token saklama davranisini belirler.
export const loginUser = ({ email, password, rememberMe }) => async (dispatch) => {
  const response = await axiosInstance.post('/login', { email, password })
  const { token, ...user } = response.data ?? {}

  dispatch(setUser(user))
  setAuthToken(token)

  // Remember Me secili degilse eski token da temizlenir
  writeStoredToken(rememberMe && token ? token : null)

  return user
}

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
    else localStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch {
    // localStorage erisilemiyorsa akis bozulmasin
  }
}

// Thunk: GET /verify ile token dogrulama (auto-login)
// Gercek response shape: { name, email, role_id, token }  -> token YENILENMIS gelir
// localStorage'da token yoksa hic istek atilmaz.
// Basarisizlikta sessizce temizlenir; kullaniciya zorunlu toast gosterilmez.
export const verifyToken = () => async (dispatch) => {
  const storedToken = readStoredToken()
  if (!storedToken) return null

  setAuthToken(storedToken)

  try {
    const response = await axiosInstance.get('/verify')
    const { token, ...user } = response.data ?? {}

    dispatch(setUser(user))

    const nextToken = token || storedToken
    setAuthToken(nextToken)
    writeStoredToken(nextToken)

    return user
  } catch {
    dispatch(setUser({}))
    setAuthToken(null)
    writeStoredToken(null)
    return null
  }
}

// Thunk: roles Redux'ta zaten doluysa yeniden istek atmaz.
// Hata cagiran tarafa iletilir; loading/error gosterimi component'te yonetilir.
export const fetchRoles = () => async (dispatch, getState) => {
  const existingRoles = getState().client.roles

  if (Array.isArray(existingRoles) && existingRoles.length > 0) {
    return existingRoles
  }

  const response = await axiosInstance.get('/roles')
  const roles = Array.isArray(response.data) ? response.data : []
  dispatch(setRoles(roles))
  return roles
}

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
})

// ---- Address CRUD (T20) ----
// Backend shape'leri:
//   GET    /user/address        -> [{ id, user_id, title, name, surname, phone,
//                                     city, district, neighborhood, address }]
//   POST   /user/address        -> { "0": {olusturulan adres} }
//   PUT    /user/address        -> { "0": {guncellenen adres} }  (id govdede)
//   DELETE /user/address/:id    -> "Address record deleted!"
// POST/PUT yanitlari {"0": ...} sarmalayicisiyla geldigi icin CRUD sonrasi
// listeyi yeniden cekiyoruz; boylece Redux her zaman sunucuyla birebir ayni olur.

export const fetchAddresses = () => async (dispatch) => {
  const response = await axiosInstance.get('/user/address')
  const addressList = Array.isArray(response.data) ? response.data : []
  dispatch(setAddressList(addressList))
  return addressList
}

export const createAddress = (address) => async (dispatch) => {
  await axiosInstance.post('/user/address', address)
  return dispatch(fetchAddresses())
}

export const updateAddress = (address) => async (dispatch) => {
  await axiosInstance.put('/user/address', address)
  return dispatch(fetchAddresses())
}

export const deleteAddress = (addressId) => async (dispatch) => {
  await axiosInstance.delete(`/user/address/${addressId}`)
  return dispatch(fetchAddresses())
}

export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards,
})

// ---- Credit card CRUD (T21) ----
// Backend shape'leri:
//   GET    /user/card       -> [{ id, user_id, card_no, expire_month, expire_year, name_on_card }]
//   POST   /user/card       -> { "0": {olusturulan kart} }
//   PUT    /user/card       -> { "0": {guncellenen kart} }  (id govdede)
//   DELETE /user/card/:id   -> "Credit card record deleted!"
// NOT: card_ccv alani YOK; POST'a eklenirse API 502 donuyor.
// Address CRUD'daki gibi, {"0": ...} sarmalayicisina guvenmek yerine
// CRUD sonrasi liste yeniden cekilir.

export const fetchCreditCards = () => async (dispatch) => {
  const response = await axiosInstance.get('/user/card')
  const creditCards = Array.isArray(response.data) ? response.data : []
  dispatch(setCreditCards(creditCards))
  return creditCards
}

export const createCreditCard = (card) => async (dispatch) => {
  await axiosInstance.post('/user/card', card)
  return dispatch(fetchCreditCards())
}

export const updateCreditCard = (card) => async (dispatch) => {
  await axiosInstance.put('/user/card', card)
  return dispatch(fetchCreditCards())
}

export const deleteCreditCard = (cardId) => async (dispatch) => {
  await axiosInstance.delete(`/user/card/${cardId}`)
  return dispatch(fetchCreditCards())
}
