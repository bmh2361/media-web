import type { Metadata } from "next";
import Link from "next/link";
import { RadarShell } from "@/components/radar/RadarShell";
export const metadata: Metadata = {
  title: "Venus Bridge Business Radar",
  description:
    "Venus Bridge’s internal tool for public company research and owner-authorised Google Sheet synchronisation.",
  alternates: { canonical: "https://www.venusbridge.co.uk/radar" },
  robots: { index: true, follow: true }
};
export default function Page() {
  return (
    <RadarShell title="Venus Bridge Business Radar">
      <p>
        Business Radar is operated by Venus Bridge for internal commercial research and company-directory
        management. It is not a public prospecting service.
      </p>
      <section>
        <h2>What the radar does</h2>
        <ul>
          <li>
            Collects and organises publicly available signals about Chinese companies’ international activity.
          </li>
          <li>
            Maintains Venus Bridge’s Chinese company research directory and monitors public project and
            information changes for recorded companies.
          </li>
          <li>Synchronises owner-authorised local research records with a designated Google Sheet.</li>
        </ul>
      </section>
      <section>
        <h2>Limited, owner-selected Google access</h2>
        <p>
          The radar requests only Google’s <code>drive.file</code> permission. It accesses only files and
          folders the owner explicitly authorises through Google Picker, together with private synchronisation
          files the application creates for that purpose. It does not scan or read the owner’s entire Google
          Drive.
        </p>
        <p>
          Google Drive and Sheets are used for the designated research directory, private synchronisation
          snapshots and integrity checks. The local application runs on the owner’s Mac; this information page
          does not request Google access.
        </p>
      </section>
      <section>
        <h2>Research, not automated outreach</h2>
        <p>
          The radar does not automatically contact companies, send marketing emails or publish social-media
          posts. Inclusion in research is not evidence of buying intent or a relationship with Venus Bridge.
        </p>
      </section>
      <section>
        <h2>Your Google data</h2>
        <p>
          Venus Bridge does not sell Google user data, share it with advertisers, use it for advertising or
          use it to train AI or machine-learning models. Google data is used only for the authorised
          research-directory and synchronisation purposes described here.
        </p>
        <p>
          Read the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>
          . Questions: <a href="mailto:minghb22@gmail.com">minghb22@gmail.com</a>.
        </p>
      </section>
    </RadarShell>
  );
}
