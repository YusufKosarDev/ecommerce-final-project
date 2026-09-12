import { useEffect, useState } from 'react'
import { getGravatarUrl, getInitials } from '../utils/gravatar'

// Gravatar yuklenemezse bas harf rozetine duser; UI kirilmaz.
function UserAvatar({ email, name, size = 32 }) {
  const src = getGravatarUrl(email, size * 2)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src])

  if (!src || hasError) {
    return (
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
      >
        {getInitials(name || email)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className="h-8 w-8 rounded-full object-cover"
    />
  )
}

export default UserAvatar
