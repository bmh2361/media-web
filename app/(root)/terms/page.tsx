import type { Metadata } from "next";
import Link from "next/link";
import { RadarShell } from "@/components/radar/RadarShell";
export const metadata: Metadata = {
  title: "Business Radar Terms of Service | Venus Bridge",
  description: "Terms for Venus Bridge’s internal business research and company-directory tool.",
  alternates: { canonical: "https://www.venusbridge.co.uk/terms" },
  robots: { index: true, follow: true }
};
export default function Page() {
  return (
    <RadarShell title="Business Radar Terms of Service">
      <p>
        Effective 21 September 2026. <Link href="/radar">Venus Bridge Business Radar</Link> is operated by
        Venus Bridge for internal commercial research and directory management.
      </p>
      <section>
        <h2>Research information</h2>
        <p>
          Sources are mainly publicly available information. They may be delayed, incomplete, inaccurate or
          changed after collection. Material decisions require checking the underlying evidence.
        </p>
        <p>
          A company’s inclusion in the research directory does not establish purchase intent, completed
          legal-entity verification, or a commercial relationship, partnership or endorsement involving Venus
          Bridge.
        </p>
      </section>
      <section>
        <h2>Use and limits</h2>
        <p>
          The radar does not automatically contact companies or publish content. Research records do not
          authorise outreach or commercial commitments. The tool and its records are not legal, financial or
          compliance advice or guarantees.
        </p>
      </section>
      <section>
        <h2>Google data and control</h2>
        <p>
          Google data is handled under the <Link href="/privacy">Privacy Policy</Link> and the owner’s limited
          file authorisation. The owner controls the selected Google files and may revoke access. Availability
          depends on the local Mac, connectivity and the relevant services.
        </p>
      </section>
      <p>
        Questions: <a href="mailto:minghb22@gmail.com">minghb22@gmail.com</a>. General website terms remain
        available <Link href="/en/terms">here</Link>.
      </p>
    </RadarShell>
  );
}
