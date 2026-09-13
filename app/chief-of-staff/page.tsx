import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chief of Staff',
  description: 'A private personal assistant being developed by Aysajan Eziz for planning, scheduling, research, and coordination.',
  alternates: { canonical: 'https://www.aysajaneziz.com/chief-of-staff' },
}

export default function ChiefOfStaffPage() {
  return (
    <article className="container py-8 prose prose-sm sm:prose">
      <h1>Chief of Staff</h1>
      <p>
        A personal assistant for planning, scheduling, research, and coordination,
        developed and operated by Aysajan Eziz for his own use.
      </p>

      <h2>Development status</h2>
      <p>
        Chief of Staff is under development. Google account connections are not
        yet enabled, and the application does not currently access or store
        Google account data. This website provides public information about the
        project. The assistant is intended for private use and has no public signup.
      </p>

      <h2>Planned features</h2>
      <ul>
        <li>
          Read selected calendars and availability, propose private events, and
          create them only after the owner approves.
        </li>
        <li>
          Work with Google Drive files explicitly selected by the owner to
          summarize documents and support research.
        </li>
        <li>
          Organize research and prepare written or audio briefings, using
          external AI or speech services only for data the owner has approved
          for that processing.
        </li>
      </ul>
      <p>
        These features are planned, not currently available. Google permissions
        will be limited to implemented features. Gmail access is not part of the
        initial integration.
      </p>

      <h2>Privacy and contact</h2>
      <p>
        Read the <Link href="/chief-of-staff/privacy">privacy policy</Link> for
        current website data practices and the requirements for future Google
        connections, and the <Link href="/chief-of-staff/terms">terms of service</Link> for
        the intended conditions of use.
      </p>
      <p>
        Contact: <a className="break-words" href="mailto:eziz.aysajan@gmail.com">eziz.aysajan@gmail.com</a>.
      </p>
    </article>
  )
}
