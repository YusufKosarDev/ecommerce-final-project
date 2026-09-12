import axios from 'axios'

export const API_BASE_URL = 'https://workintech-fe-ecommerce.onrender.com'

// Merkezi axios instance. Tum API cagrilari bu instance uzerinden yapilir.
// Backend Render uzerinde cold start yasayabildigi icin timeout genis tutuldu.
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Authorization header'ini ayarlar/kaldirir.
// ONEMLI: Backend token'i ham haliyle bekliyor. "Bearer " prefix'i EKLENMEZ;
// Bearer ile gonderildiginde GET /verify 401 "Not verified" donuyor.
export function setAuthToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = token
  } else {
    delete axiosInstance.defaults.headers.common.Authorization
  }
}

// Kullaniciya gosterilebilecek guvenli hata mesajini uretir.
// Ham response/request govdesi disariya sizdirilmaz.
export function getApiErrorMessage(error, fallback = 'Bir hata olustu. Lutfen tekrar deneyin.') {
  const data = error?.response?.data

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message
  }

  if (typeof data?.error === 'string' && data.error.trim()) {
    return data.error
  }

  if (error?.code === 'ECONNABORTED') {
    return 'Istek zaman asimina ugradi. Lutfen tekrar deneyin.'
  }

  if (!error?.response) {
    return 'Sunucuya ulasilamadi. Internet baglantinizi kontrol edin.'
  }

  return fallback
}

export default axiosInstance
