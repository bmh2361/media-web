import { Eyebrow } from "@/components/ui/Eyebrow";
import { transactionEnablement, weiricUrl } from "@/content/transaction-enablement";
import type { Language } from "@/lib/i18n";

export function TransactionEnablement({ language }: { language: Language }) {
  const copy = transactionEnablement[language];
  return (
    <section
      className="mt-16 grid gap-9 border-y border-ink/15 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14"
      aria-labelledby="transaction-enablement-title"
      data-transaction-enablement
    >
      <div>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2
          id="transaction-enablement-title"
          className="mt-5 max-w-[26ch] text-balance text-3xl font-medium leading-tight md:text-4xl"
        >
          {copy.headline}
        </h2>
        <div className="mt-6 hidden max-w-xl space-y-4 text-base leading-7 text-ink/65 md:block">
          <p>{copy.context}</p>
          <p>{copy.body}</p>
        </div>
        <p className="mt-5 text-sm leading-7 text-ink/65 md:hidden">{copy.mobileBody}</p>
      </div>
      <div
        className="border-t border-ink/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
        data-weiric-relationship
      >
        <Eyebrow>{copy.relationship}</Eyebrow>
        <h3 className="mt-5 text-2xl font-medium">{copy.name}</h3>
        <p className="mt-3 max-w-sm text-base font-medium leading-6">{copy.category}</p>
        <div className="mt-5 hidden max-w-xl space-y-4 text-sm leading-7 text-ink/65 md:block">
          <p>{copy.description}</p>
          <p>{copy.connection}</p>
        </div>
        <p className="mt-4 text-sm leading-7 text-ink/65 md:hidden">{copy.mobileDescription}</p>
        <a
          href={weiricUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4 hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          {copy.link}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> ({copy.newTab})</span>
        </a>
        <p
          className="mt-4 max-w-xl border-t border-ink/15 pt-4 text-xs leading-6 text-ink/60"
          data-transaction-qualification
        >
          {copy.qualification}
        </p>
      </div>
    </section>
  );
}
