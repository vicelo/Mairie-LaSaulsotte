import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getAllActualites, getActualiteBySlug } from "@/lib/actualites";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllActualites().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getActualiteBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      locale: "fr_FR",
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getActualiteBySlug(params.slug);
  if (!article) notFound();

  const dateFormatted = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(article.date));

  // Convert simple markdown-like content to HTML paragraphs
  // (since we're not using a full MDX processor)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="mb-3 mt-8 text-xl font-bold text-encre">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="mb-2 mt-6 text-lg font-semibold text-encre">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(lines[i].replace(/^- /, ""));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="mb-4 ml-4 list-disc space-y-1 text-encre-courant">
            {listItems.map((item, j) => (
              <li
                key={j}
                dangerouslySetInnerHTML={{
                  __html: item.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}
          </ul>
        );
        continue;
      } else if (line.startsWith("| ")) {
        // Table
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].startsWith("|")) {
          if (!lines[i].match(/^\|[-| ]+\|$/)) {
            tableLines.push(lines[i]);
          }
          i++;
        }
        const [headerRow, ...bodyRows] = tableLines;
        const headers = headerRow
          .split("|")
          .filter(Boolean)
          .map((h) => h.trim());
        elements.push(
          <div key={`table-${i}`} className="mb-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-sable text-sm">
              <thead>
                <tr className="bg-surface">
                  {headers.map((h, j) => (
                    <th key={j} className="px-4 py-2 text-left font-semibold text-encre-courant">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-sable-clair">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row
                      .split("|")
                      .filter(Boolean)
                      .map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2 text-encre-courant">
                          {cell.trim()}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else if (line.trim() !== "") {
        elements.push(
          <p
            key={i}
            className="mb-4 leading-relaxed text-encre-courant"
            dangerouslySetInnerHTML={{
              __html: line
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(
                  /\[(.+?)\]\((.+?)\)/g,
                  '<a href="$2" class="text-terre-fonce underline hover:text-terre-fonce">$1</a>'
                ),
            }}
          />
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: article.title },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        {/* En-tête */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <Badge color="green">{article.category}</Badge>
            <time dateTime={article.date} className="text-sm text-encre-secondaire">
              {dateFormatted}
            </time>
          </div>
          <h1 className="text-3xl font-bold text-encre sm:text-4xl">{article.title}</h1>
          <p className="mt-3 text-lg text-encre-courant">{article.excerpt}</p>
        </header>

        {/* Corps de l'article */}
        <div className="prose-like border-t border-sable pt-8">
          {renderContent(article.content)}
        </div>

        {/* Navigation retour */}
        <div className="mt-10 border-t border-sable pt-6">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 rounded text-sm font-medium text-terre-fonce hover:underline focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            ← Retour aux actualités
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}
