import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chief of Staff Terms of Service',
  description: 'Personal-use terms and development status for the Chief of Staff application operated by Aysajan Eziz.',
  alternates: { canonical: 'https://www.aysajaneziz.com/chief-of-staff/terms' },
}

export default function ChiefOfStaffTermsPage() {
  return (
    <article className="container py-8 prose prose-sm sm:prose">
      <h1>Chief of Staff Terms of Service</h1>
      <p>Last updated: September 13, 2026</p>

      <h2>Purpose and availability</h2>
      <p>
        Chief of Staff is developed and operated by Aysajan Eziz for his own
        personal planning, research, and coordination. It is under development,
        has no public signup, and is not currently offered as a service to others.
        Read-only Calendar and selected-file Drive connection tests are available to the owner after consent; other features described as planned are not yet enabled.
      </p>

      <h2>Use and responsibilities</h2>
      <p>
        The owner is responsible for choosing which accounts, calendars,
        documents, and tasks the assistant may access, and must have permission
        to use any supplied data. Connected services remain subject to their
        own terms and the permissions actually granted.
      </p>
      <p>
        When the planned assistant features become available, generated research, summaries, and proposed actions will require review for
        accuracy and suitability. Planned Calendar actions require explicit
        approval before execution. The project makes no guarantee of uninterrupted
        availability or error-free outputs.
      </p>

      <h2>Privacy and Google data</h2>
      <p>
        The <Link href="/chief-of-staff/privacy">privacy policy</Link> explains
        current website data practices and the private Google connection tools. Chief of Staff commits to following the Google
        API Services User Data Policy and its Limited Use requirements for all
        use and transfer of Google API data. Publishing these pages does not grant
        access to a Google account.
      </p>

      <h2>Changes and contact</h2>
      <p>
        Features and these terms may change as development proceeds. Any expansion
        beyond personal use will require updated terms and privacy disclosures
        before it becomes available.
      </p>
      <p>
        Contact: <a className="break-words" href="mailto:eziz.aysajan@gmail.com">eziz.aysajan@gmail.com</a>.
      </p>
      <p>
        <Link href="/chief-of-staff">About Chief of Staff</Link>{' · '}
        <Link href="/chief-of-staff/privacy">Privacy policy</Link>
      </p>
    </article>
  )
}
