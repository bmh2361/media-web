import type { Metadata } from "next";
import Link from "next/link";
import { RadarShell } from "@/components/radar/RadarShell";
export const metadata: Metadata = {
  title: "Business Radar Privacy Policy | Venus Bridge",
  description:
    "How Venus Bridge Business Radar handles owner-selected Google files, local credentials and research data.",
  alternates: { canonical: "https://www.venusbridge.co.uk/privacy" },
  robots: { index: true, follow: true }
};
export default function Page() {
  return (
    <RadarShell title="Business Radar Privacy Policy">
      <p>
        Effective 21 September 2026. This policy covers <Link href="/radar">Venus Bridge Business Radar</Link>
        , operated by Venus Bridge for internal commercial research and company-directory management. Contact:{" "}
        <a href="mailto:minghb22@gmail.com">minghb22@gmail.com</a>. General website-enquiry information is
        described in our <Link href="/en/privacy">website privacy notice</Link>.
      </p>
      <section>
        <h2>Google authorisation and access</h2>
        <p>
          The application uses Google OAuth and requests only{" "}
          <code>https://www.googleapis.com/auth/drive.file</code>. The owner actively selects the existing
          files and folders to authorise through Google Picker. The application also creates private
          synchronisation snapshots for the authorised purpose. It does not scan or read the whole Google
          Drive. Google account identity and selected-resource metadata are checked to verify the intended
          account and private access permissions.
        </p>
      </section>
      <section>
        <h2>Why Google data is used</h2>
        <ul>
          <li>Read the designated research directory.</li>
          <li>
            Update the designated Google Sheet with authorised local research records while preserving owner
            feedback and decisions.
          </li>
          <li>Save private radar synchronisation snapshots in the selected Drive folder.</li>
          <li>Read back results and verify synchronisation integrity, resource identity and access.</li>
        </ul>
        <p>
          These functions are performed by the owner’s local application. Google processes hosted files under
          the owner’s Google account and Google’s applicable terms.
        </p>
      </section>
      <section>
        <h2>Local storage and safeguards</h2>
        <p>
          The OAuth refresh token is stored in the owner’s protected local application directory on their Mac,
          in a file restricted to that operating-system user. It is not included in research snapshots,
          source-control repositories or ordinary business logs. Local research records, synchronisation
          receipts and recovery backups are stored in the configured owner-controlled data location. These
          controls reduce risk; no storage system can be guaranteed risk-free.
        </p>
      </section>
      <section>
        <h2>Use and sharing limits</h2>
        <p>
          Venus Bridge does not sell Google user data, share it with advertisers, use it for advertising or
          advertising targeting, or use it to train general-purpose AI or machine-learning models. The radar
          does not use Google user data for purposes unrelated to the owner’s authorisation, and it does not
          automatically contact companies, send marketing emails or publish social-media content.
        </p>
      </section>
      <section>
        <h2>Retention and deletion</h2>
        <p>
          Research files, private snapshots and recovery receipts are retained while needed for the owner’s
          research, synchronisation and recovery. There is no automatic fixed-age deletion of research
          snapshots at present; the owner reviews and removes files that are no longer needed. OAuth
          credentials are retained while Google access is in use. A replaced credential may be retained
          briefly for rollback during a verified migration and should be removed when no longer needed. If
          Google access is discontinued, unneeded credentials should be deleted.
        </p>
      </section>
      <section>
        <h2>Owner control and revocation</h2>
        <p>
          The owner can revoke the application’s Google access through their Google Account permissions. They
          can pause the local radar and delete its local OAuth credentials; without those credentials the
          application cannot obtain future access tokens. A request or short-lived access token already in
          progress may remain valid until it expires or Google revokes it. Deleting local credentials does not
          delete Google files: those remain under the owner’s Google account control, where the owner can
          retain or delete them independently.
        </p>
        <p>
          For access, correction or deletion questions, contact{" "}
          <a href="mailto:minghb22@gmail.com">minghb22@gmail.com</a>.
        </p>
      </section>
    </RadarShell>
  );
}
