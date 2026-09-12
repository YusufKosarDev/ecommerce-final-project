// Backend /roles su sekilde donuyor:
//   [{ id: 1, name: "Yönetici", code: "admin" },
//    { id: 2, name: "Mağaza",   code: "store" },
//    { id: 3, name: "Müşteri",  code: "customer" }]
// name alani Turkce, ayirt edici alan code. Bu yuzden once code, yedek olarak name eslestirilir.
// Hicbir yerde sabit id varsayimi yapilmaz.

const normalize = (value) => String(value ?? '').trim().toLowerCase()

export function roleMatches(role, key) {
  const target = normalize(key)
  return normalize(role?.code) === target || normalize(role?.name) === target
}

export function findRoleByKey(roles, key) {
  if (!Array.isArray(roles)) return undefined
  return roles.find((role) => roleMatches(role, key))
}

export function findRoleById(roles, roleId) {
  if (!Array.isArray(roles)) return undefined
  return roles.find((role) => String(role?.id) === String(roleId))
}

export function isStoreRoleId(roles, roleId) {
  const role = findRoleById(roles, roleId)
  return Boolean(role) && roleMatches(role, 'store')
}

// Customer rolu bulunamazsa listedeki ilk role guvenli sekilde dusulur.
export function getDefaultRoleId(roles) {
  if (!Array.isArray(roles) || roles.length === 0) return ''
  const customer = findRoleByKey(roles, 'customer')
  return String((customer ?? roles[0]).id)
}
