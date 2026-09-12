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

  try {
    if (rememberMe && token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } else {
      // Remember Me secili degilse eski token da temizlenir
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  } catch {
    // localStorage erisilemiyorsa (private mode vb.) login akisi bozulmasin
  }

  return user
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
