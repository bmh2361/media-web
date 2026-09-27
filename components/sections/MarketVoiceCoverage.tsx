import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { marketCoverage, type MarketCoverageItem } from "@/content/market-coverage";
import type { Language } from "@/lib/i18n";

export function MarketVoiceCoverage({
  language,
  items = marketCoverage
}: {
  language: Language;
  items?: MarketCoverageItem[];
}) {
  const published = items.filter((item) => item.status === "published").slice(0, 3);
  if (!published.length) return null;
  const zh = language === "zh";
  return (
    <Section compact className="bg-porcelain" data-phase5-section="market-coverage">
      <Container>
        <Eyebrow>{zh ? "市场观点与媒体关注" : "MARKET VOICE & COVERAGE"}</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-tight md:text-4xl">
          {zh
            ? "让采访、观点与市场故事延续项目之后的商业对话。"
            : "Ideas, interviews and market stories that continue the conversation."}
        </h2>
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {published.map((item) => (
            <article key={item.url} className="flex flex-col border-t border-ink/15 pt-6">
              <p className="text-xs text-slate">
                {item.type[language]} · {item.publication}
              </p>
              <h3 className="mt-4 text-xl font-medium">{item.headline[language]}</h3>
              <p className="mt-4 text-sm text-ink/65">{item.subject[language]}</p>
              <time dateTime={item.date} className="mt-2 text-sm text-ink/65">
                {item.date}
              </time>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
              >
                {zh ? `在 ${item.publication} 阅读` : `Read on ${item.publication}`} ↗
                <span className="sr-only"> ({zh ? "在新标签页打开" : "opens in a new tab"})</span>
              </a>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
