import { Facebook, Instagram, Twitter } from './icons/SocialIcons'
import { getInitials } from '../data/teamData'

function TeamMemberCard({ name, role, avatarClass = 'bg-primary' }) {
  return (
    <article className="flex w-full flex-col items-center gap-4">
      {/* Gercek profil fotografi saglanmadigi icin bas harf avatari kullaniliyor */}
      <div
        className={`flex h-64 w-full items-center justify-center ${avatarClass}`}
        role="img"
        aria-label={name}
      >
        <span className="text-5xl font-bold tracking-wide text-white">
          {getInitials(name)}
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-base font-bold text-dark">{name}</h3>
        <p className="text-sm font-bold text-muted">{role}</p>
      </div>

      {/* Gercek profil URL'leri bilinmedigi icin ikonlar dekoratif, link verilmiyor */}
      <div className="flex items-center gap-5 text-primary" aria-hidden="true">
        <Facebook size={20} />
        <Instagram size={20} />
        <Twitter size={20} />
      </div>
    </article>
  )
}

export default TeamMemberCard
