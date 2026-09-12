import axiosInstance, { setAuthToken } from '../../api/axiosInstance'
import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from './actionTypes'

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
