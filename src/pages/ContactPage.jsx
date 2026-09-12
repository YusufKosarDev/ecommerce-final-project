import { Mail, MapPin, PhoneCall } from 'lucide-react'
import ContactCard from '../components/ContactCard'
import { Facebook, Instagram, Twitter } from '../components/icons/SocialIcons'

const CONTACT_METHODS = [
  {
    id: 'phone',
    icon: PhoneCall,
    lines: ['georgia.young@example.com', 'georgia.young@ple.com'],
    action: 'Get Support',
    highlighted: false,
  },
  {
    id: 'mail',
    icon: Mail,
    lines: ['georgia.young@example.com', 'georgia.young@ple.com'],
    action: 'Get Support',
    highlighted: true,
  },
  {
    id: 'address',
    icon: MapPin,
    lines: ['georgia.young@example.com', 'georgia.young@ple.com'],
    action: 'Get Support',
    highlighted: false,
  },
]

function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10 px-4 py-12 md:flex-row md:gap-12 md:py-20">
          <div className="flex w-full flex-col items-center gap-6 text-center md:w-1/2 md:items-start md:text-left">
            <p className="text-sm font-bold tracking-widest text-dark">CONTACT US</p>

            <h1 className="text-3xl font-bold leading-tight text-dark md:text-5xl">
              Get in touch today!
            </h1>

            <p className="max-w-md text-base text-muted md:text-lg">
              We know how large objects will act, but things on a small scale.
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold text-dark">Phone : +451 215 215</p>
              <p className="text-lg font-bold text-dark">Fax : +451 215 215</p>
            </div>

            <div className="flex items-center gap-5 text-dark">
              <Twitter size={28} />
              <Facebook size={28} />
              <Instagram size={28} />
            </div>
          </div>

          <div className="flex w-full justify-center md:w-1/2">
            <img
              src="https://picsum.photos/seed/bandage-contact-hero/800/700"
              alt="Get in touch with our team"
              className="h-72 w-full max-w-md object-cover md:h-[420px] md:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-10 px-4 py-12 md:py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-bold tracking-widest text-dark">VISIT OUR OFFICE</p>
            <h2 className="max-w-xl text-2xl font-bold leading-snug text-dark md:text-4xl">
              We help small businesses with big ideas
            </h2>
          </div>

          <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
            {CONTACT_METHODS.map((method) => (
              <div key={method.id} className="flex w-full md:w-1/3">
                <ContactCard {...method} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-6 px-4 pb-16 text-center md:pb-24">
          <p className="text-sm font-bold tracking-widest text-dark">
            WE CAN&apos;T WAIT TO MEET YOU
          </p>

          <h2 className="text-3xl font-bold text-dark md:text-5xl">Let&apos;s Talk</h2>

          <button
            type="button"
            className="rounded bg-primary px-10 py-4 text-sm font-bold text-white"
          >
            Try it free now
          </button>
        </div>
      </section>
    </>
  )
}

export default ContactPage
