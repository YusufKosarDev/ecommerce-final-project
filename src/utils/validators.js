export const PASSWORD_RULES = [
  { key: 'length', label: 'en az 8 karakter', test: (v) => String(v).length >= 8 },
  { key: 'lower', label: 'en az 1 kucuk harf', test: (v) => /[a-z]/.test(v) },
  { key: 'upper', label: 'en az 1 buyuk harf', test: (v) => /[A-Z]/.test(v) },
  { key: 'digit', label: 'en az 1 rakam', test: (v) => /\d/.test(v) },
  {
    key: 'special',
    label: 'en az 1 ozel karakter',
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
]

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// T + 10 rakam
export const TAX_NO_PATTERN = /^T\d{10}$/

// +905xxxxxxxxx / 05xxxxxxxxx / 5xxxxxxxxx (bosluk, tire, parantez tolere edilir)
export function isValidTrPhone(value) {
  const cleaned = String(value).replace(/[\s()\-.]/g, '')
  return /^(?:\+90|0090|0)?5\d{9}$/.test(cleaned)
}

// TR IBAN: TR + 24 rakam, ardindan mod-97 checksum dogrulamasi
export function isValidTrIban(value) {
  const iban = String(value).replace(/\s+/g, '').toUpperCase()
  if (!/^TR\d{24}$/.test(iban)) return false

  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, (char) => char.charCodeAt(0) - 55)

  let remainder = 0
  for (const digit of numeric) {
    remainder = (remainder * 10 + Number(digit)) % 97
  }

  return remainder === 1
}
