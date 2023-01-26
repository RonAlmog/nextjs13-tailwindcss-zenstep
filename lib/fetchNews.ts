import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // graphql query

  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
          author
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  // fetch function with nextjs13 caching
  const res = await fetch("https://springe.stepzen.net/api/stepzen/__graphql", {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      },
    }),
  });

  console.log("loading data from api for category >>>", category, keywords);
  // sort functions by images vs not images
  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);
  // return res
  return news;
};

export default fetchNews;

// http://api/mediastack.com/v1/news?access_key=c0090a6ea0bf3ec543a77633efb745d3&sources=business,sports

// stepzen import curl

// stepzen import curl "http://api/mediastack.com/v1/news?access_key=c0090a6ea0bf3ec543a77633efb745d3&sources=business,sports" --header "Authentication: springe::stepzen.net+1000::6e6d16c3f38a5696e122c8d19cdd2117a6dc89b3bd9ec059ce358a87b7724bd1
