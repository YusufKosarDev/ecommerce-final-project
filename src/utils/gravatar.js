import md5 from 'blueimp-md5'

// Gravatar standart kullanim: email trim + lowercase, ardindan md5 hash.
// d=mp (mystery person) sayesinde hash eslesmese bile gecerli bir gorsel doner.
export function getGravatarUrl(email, size = 64) {
  const normalized = String(email ?? '').trim().toLowerCase()
  if (!normalized) return ''
  return `https://www.gravatar.com/avatar/${md5(normalized)}?s=${size}&d=mp`
}

export function getInitials(value) {
  const source = String(value ?? '').trim()
  if (!source) return '?'
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase('tr-TR'))
    .join('')
}
