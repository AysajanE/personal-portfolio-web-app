import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chief of Staff Privacy Policy',
  description: 'Current website data practices and planned Google data handling for the private Chief of Staff application.',
  alternates: { canonical: 'https://www.aysajaneziz.com/chief-of-staff/privacy' },
}

export default function ChiefOfStaffPrivacyPage() {
  return (
    <article className="container py-8 prose prose-sm sm:prose">
      <h1>Chief of Staff Privacy Policy</h1>
      <p>Last updated: September 13, 2026</p>
      <p>
        Chief of Staff is a private personal assistant being developed and
        operated by Aysajan Eziz. This policy covers its public information pages
        and describes the requirements for its planned Google integrations.
      </p>

      <h2>Current status</h2>
      <p>
        Google connections are not yet enabled. Chief of Staff does not currently
        access, collect, store, or share Google account data. Visiting these pages
        does not connect a Google account or grant access to a calendar or files.
      </p>

      <h2>Public website visits and contact</h2>
      <p>
        This website is hosted by Vercel and includes Vercel Web Analytics.
        When enabled for a deployment, analytics records aggregate website usage.
        Hosting services process technical requests, and analytics may include pages visited, referring
        sites, approximate location, and browser or device information. These
        services are separate from the planned Google connections. See{' '}
        <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel&apos;s analytics privacy documentation</a>{' '}
        and <a href="https://vercel.com/legal/privacy-policy">privacy policy</a>.
      </p>
      <p>
        If you email the contact address below, your address and message are
        handled through the operator&apos;s email service to respond to your request.
        Please do not include passwords, access tokens, or sensitive account data.
      </p>

      <h2>Planned Google access — not yet enabled</h2>
      <ul>
        <li>
          <strong>Calendar:</strong> selected calendar identifiers, event details
          such as titles, times and locations, and availability, to support
          scheduling. Private event creation will require the owner&apos;s approval.
        </li>
        <li>
          <strong>Drive:</strong> the names, identifiers, and contents of files
          explicitly selected by the owner, to support document summaries and
          research. Whole-account synchronization is not planned.
        </li>
      </ul>
      <p>
        Permissions will be requested only for implemented features and only
        with the owner&apos;s consent. Gmail access is not included in this initial
        integration. Permission to access data will not by itself authorize
        sending that data to an external AI or speech service.
      </p>

      <h2>External processing and Limited Use</h2>
      <p>
        Chief of Staff commits to following the{' '}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>{' '}
        and its Limited Use requirements for all use and transfer of Google API
        data. Google account data will not be
        sold, used for advertising, or used to train general-purpose AI models.
      </p>
      <p>
        Planned AI and speech features may require sending selected content to
        external providers. Before that is enabled, this policy and the private
        application must identify the actual providers, purposes, data shared,
        and applicable retention practices. Processing requires the owner&apos;s
        consent and provider settings compatible with Google&apos;s requirements.
        No external provider currently receives Google account data through
        Chief of Staff.
      </p>

      <h2>Storage, retention, and deletion</h2>
      <p>
        There is currently no Google account data stored by Chief of Staff to
        retain or delete. The intended assistant may retain authorized source
        material, generated briefings, and task records for the owner&apos;s work.
        Before Google access is enabled, the storage location, access controls,
        retention periods, backup expiry, and deletion procedure must be
        implemented and documented here. These controls have not yet been
        validated, and this page does not describe them as operational.
      </p>
      <p>
        Once a connection exists, access can be revoked through{' '}
        <a href="https://myaccount.google.com/connections">Google Account connections</a>.
        Revocation prevents future authorized access; it does not itself erase
        existing copies, generated outputs, or data already sent to a provider.
        Deletion will need to cover those records under the published retention
        policy as well.
      </p>

      <h2>Questions, requests, and changes</h2>
      <p>
        For privacy questions or a request to delete information you have
        supplied, email{' '}
        <a className="break-words" href="mailto:eziz.aysajan@gmail.com">eziz.aysajan@gmail.com</a>.
        Requests are handled manually; these pages do not offer an account or
        an automated deletion tool.
      </p>
      <p>
        This policy must be updated before Google connections are enabled or
        data practices change. New uses of Google data will require disclosure
        and consent before processing begins.
      </p>
      <p>
        <Link href="/chief-of-staff">About Chief of Staff</Link>{' · '}
        <Link href="/chief-of-staff/terms">Terms of service</Link>
      </p>
    </article>
  )
}
