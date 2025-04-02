export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface TopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

/**
 * Fetches top headlines from NewsAPI.
 * @param country - The 2-letter ISO country code (default: 'us').
 * @param category - The news category (default: 'general').
 * @returns A promise resolving to a TopHeadlinesResponse object.
 */
export async function getTopArticles(
  country: string = 'us',
  category: string = 'general'
): Promise<TopHeadlinesResponse> {
  const apiKey = process.env.EXPO_PUBLIC_NEWS_API_KEY;
  if (!apiKey) {
    throw new Error('EXPO_PUBLIC_NEWS_API_KEY environment variable is not set.');
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching top articles: ${response.statusText}`);
  }

  const data: TopHeadlinesResponse = await response.json();
  return data;
}
