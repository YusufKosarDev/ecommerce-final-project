// Backend /user/card shape:
//   { id, user_id, card_no, expire_month, expire_year, name_on_card }
// NOT: card_ccv alani YOK. POST'a card_ccv eklenirse API 502 donuyor,
// bu yuzden CVV kalici kart verisine dahil edilmez.

export function normalizeCardNumber(value) {
  return String(value ?? '').replace(/\D/g, '')
}

// Listede tam numara gosterilmez: **** **** **** 1234
export function maskCardNumber(value) {
  const digits = normalizeCardNumber(value)
  if (!digits) return ''
  const last4 = digits.slice(-4)
  return `**** **** **** ${last4}`
}

// Yazarken 4'lu gruplama
export function formatCardNumber(value) {
  const digits = normalizeCardNumber(value).slice(0, 19)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

// Luhn algoritmasi ile kart numarasi dogrulamasi
export function isValidCardNumber(value) {
  const digits = normalizeCardNumber(value)
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i])
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum > 0 && sum % 10 === 0
}

export function getExpiryYears(count = 15) {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: count }, (_, index) => currentYear + index)
}

// Ay/yil kombinasyonu gecmiste mi
export function isExpired(month, year) {
  const numericMonth = Number(month)
  const numericYear = Number(year)
  if (!numericMonth || !numericYear) return false

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (numericYear < currentYear) return true
  if (numericYear === currentYear && numericMonth < currentMonth) return true
  return false
}

export function formatExpiry(month, year) {
  const paddedMonth = String(month ?? '').padStart(2, '0')
  return `${paddedMonth}/${year ?? ''}`
}
