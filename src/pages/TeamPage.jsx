import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import TeamMemberCard from '../components/TeamMemberCard'
import { TEAM_MEMBERS } from '../data/teamData'

function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-12 text-center md:py-16">
          <p className="text-sm font-bold tracking-widest text-muted">WHAT WE DO</p>

          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-dark md:text-5xl">
            Innovation tailored for you
          </h1>

          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-bold">
              <li>
                <Link to="/" className="text-dark">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center text-gray-300">
                <ChevronRight size={16} />
              </li>
              <li className="text-muted">Team</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Team members */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-10 px-4 py-12 md:py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-bold text-dark md:text-4xl">Meet Our Team</h2>
            <p className="max-w-xl text-sm text-muted">
              Problems trying to resolve the conflict between the two major realms of
              Classical physics: Newtonian mechanics
            </p>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:flex-wrap md:justify-center md:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="w-full md:w-1/3 lg:w-1/4">
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-6 px-4 py-12 text-center md:py-16">
          <h2 className="text-2xl font-bold text-dark md:text-4xl">
            Start your 14 days free trial
          </h2>

          <p className="max-w-md text-sm text-muted">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </p>

          <Link
            to="/contact"
            className="rounded bg-primary px-10 py-4 text-sm font-bold text-white"
          >
            Try it free now
          </Link>
        </div>
      </section>
    </>
  )
}

export default TeamPage
