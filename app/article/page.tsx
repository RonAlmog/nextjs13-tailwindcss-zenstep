import { notFound } from "next/navigation";
import Article from "../Article";
import LiveTimestamp from "../LiveTimestamp";

type Props = {
  searchParams?: Article;
};
function ArticlePage({ searchParams }: Props) {
  if (
    (searchParams && Object.entries(searchParams).length === 0) ||
    !searchParams
  ) {
    return notFound();
  }
  const article: Article = searchParams;

  return (
    <article>
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {article.image && (
          <img
            className="h-50 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
            src={article.image}
            alt={article.title}
          />
        )}
        <div>
          <h1 className="headerTitle">{article.title}</h1>
          <div className="flex divide-x-2 space-x-4">
            <h2 className="font-bold">By: {article.author || "unknown"}</h2>
            <h2 className="font-bold pl-4">Source: {article.source}</h2>
            <p>
              <LiveTimestamp time={article.published_at} />
            </p>
          </div>
          <p className="p-2">{article.description}</p>
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;
