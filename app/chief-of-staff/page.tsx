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
        Chief of Staff is under development. Its owner can connect Google for
        read-only Calendar checks and tests of explicitly selected Drive files
        through a private local setup tool. Google consent is required. This website
        provides public project information and has no public signup.
      </p>

      <h2>Planned assistant features</h2>
      <ul>
        <li>
          Planned: use selected-calendar availability to propose private events and create
          them only after the owner approves.
        </li>
        <li>
          Planned: summarize and research Google Drive documents explicitly selected by
          the owner.
        </li>
        <li>
          Planned: organize research and prepare written or audio briefings, using
          external AI or speech services only for data the owner has approved
          for that processing.
        </li>
      </ul>
      <p>
        Research, document summaries, briefings, and event creation remain planned.
        Current connection tests use read-only Calendar permissions. Google&apos;s
        selected-file Drive permission also permits changes, but this application
        only reads or exports selected files. Gmail access is not requested.
      </p>

      <h2>Privacy and contact</h2>
      <p>
        Read the <Link href="/chief-of-staff/privacy">privacy policy</Link> for
        current website data practices and the private Google connection tools, and the <Link href="/chief-of-staff/terms">terms of service</Link> for
        the intended conditions of use.
      </p>
      <p>
        Contact: <a className="break-words" href="mailto:eziz.aysajan@gmail.com">eziz.aysajan@gmail.com</a>.
      </p>
    </article>
  )
}
