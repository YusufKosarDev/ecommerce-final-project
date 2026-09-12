// Sadece bilinen ekip uyeleri. Uydurma kisi veya sahte profil linki eklenmiyor.
// Gercek profil fotografi / sosyal medya URL'si saglandiginda buradan guncellenecek.
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Gökhan Özdemir',
    role: 'Project Manager',
    avatarClass: 'bg-primary',
  },
  {
    id: 2,
    name: 'Yusuf Koşar',
    role: 'Full Stack Developer',
    avatarClass: 'bg-[#23856D]',
  },
]

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase('tr-TR'))
    .join('')
}
