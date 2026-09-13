import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chief of Staff Privacy Policy',
  description: 'Website data practices and owner-authorized Google connection testing for Chief of Staff.',
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
        and the Google connection tools available to its owner.
      </p>

      <h2>Current status</h2>
      <p>
        Chief of Staff has private, local connection tools for Google Calendar
        and selected Drive files. Access begins only after the owner consents in
        Google and selects the resources to test. Visiting this public website
        does not connect an account or grant access to calendars or files.
      </p>

      <h2>Public website visits and contact</h2>
      <p>
        This website is hosted by Vercel and includes Vercel Web Analytics.
        When enabled for a deployment, analytics records aggregate website usage.
        Hosting services process technical requests, and analytics may include pages visited, referring
        sites, approximate location, and browser or device information. These
        services are separate from the private Google connection tools. See{' '}
        <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel&apos;s analytics privacy documentation</a>{' '}
        and <a href="https://vercel.com/legal/privacy-policy">privacy policy</a>.
      </p>
      <p>
        If you email the contact address below, your address and message are
        handled through the operator&apos;s email service to respond to your request.
        Please do not include passwords, access tokens, or sensitive account data.
      </p>

      <h2>Google access and its limits</h2>
      <ul>
        <li>
          <strong>Calendar:</strong> calendar names and identifiers are shown so
          the owner can choose calendars. Connection tests read event identifiers,
          start and end times, and availability from selected calendars. Calendar
          access is read-only; event creation and changes are not implemented.
          Chief of Staff requests calendar.calendarlist.readonly to list accessible calendars
          and calendar.events.freebusy to query availability.
          It requests calendar.events.readonly to verify event identifiers and times,
          which availability queries do not provide. Google permits full event details
          across accessible calendars with this scope. The connector restricts both
          availability queries and event reads to selected calendars, and requests
          only event IDs, start times, and end times for event reads.
        </li>
        <li>
          <strong>Drive:</strong> Google Picker lets the owner select individual
          files. The connector verifies selected file metadata and reads or exports
          their contents into memory for a connection test, limited to 1 MiB per
          file. It supports Google documents, text, Markdown, and PDF files. It does
          not synchronize whole accounts or folders, write files, or generate summaries.
        </li>
      </ul>
      <p>
        Sign-in uses openid and email permissions to verify the owner&apos;s email and stable Google account
        identifier. Google&apos;s selected-file permission, drive.file, can allow
        file changes; this application exposes only read and export operations.
        Gmail access is not requested. Permission to access data will not by itself authorize
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
        The connection tools are undergoing owner testing. The database is stored on the operator&apos;s Linux host in a
        directory accessible only to the operating-system user. It retains the
        email address, stable Google account identifier, granted permissions, encrypted refresh token,
        selected resource identifiers, connection status, and last successful
        verification time until the owner deletes the connection. The encryption
        key is stored separately with owner-only file permissions. This does not
        protect against someone already controlling the operator&apos;s account or host.
      </p>
      <p>
        Calendar test responses and selected file contents are processed transiently
        in memory for tests and are not saved in the database, logs, or reports.
        Access tokens remain in memory; a short-lived token limited to Drive is
        provided to Google Picker. The connector performs no background sync and
        creates no backups. Any independent host backups require separate protection
        and deletion by the operator; deleting the connection cannot erase those copies.
      </p>
      <p>
        The private setup provides “Revoke Google access,” which requests Google
        revocation and deletes local connection data after success. If Google does
        not confirm revocation, local records are retained and an error is shown.
        “Forget local connection” deletes the local identity, credentials, and
        selections without revoking Google&apos;s grant; the owner must separately
        revoke that grant in Google Account connections. Deletion removes application
        records; it is not a guarantee of forensic erasure from the host.
      </p>
      <p>
        Access can also be revoked through{' '}
        <a href="https://myaccount.google.com/connections">Google Account connections</a>.
        Revocation there does not delete the local connection records; use the
        private setup&apos;s “Forget local connection” control for those records. Removing a connection
        does not delete the original calendars or files in Google.
      </p>

      <h2>Questions, requests, and changes</h2>
      <p>
        For privacy questions or a request to delete information you have
        supplied, email{' '}
        <a className="break-words" href="mailto:eziz.aysajan@gmail.com">eziz.aysajan@gmail.com</a>.
        Requests sent by email are handled manually. The deletion controls above
        are in the private local application, not on these public pages.
      </p>
      <p>
        This policy must be updated before additional Google-data uses, external
        processing, content retention, or backup practices are enabled. New uses of Google data will require disclosure
        and consent before processing begins.
      </p>
      <p>
        <Link href="/chief-of-staff">About Chief of Staff</Link>{' · '}
        <Link href="/chief-of-staff/terms">Terms of service</Link>
      </p>
    </article>
  )
}
