import NewsList from "@/app/NewsList";
import { categories } from "@/constants";
import fetchNews from "@/lib/fetchNews";

// name of param, category, is in the parent folder name, [category] , could be id or whatever
type Props = {
  params: { category: Category };
};

async function NewsCategory({ params: { category } }: Props) {
  const news = await fetchNews(category);
  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category }));
}

// localhost:3000/news/business
// localhost:3000/news/science
// localhost:3000/news/sports
// ...
// prebuild these pages
