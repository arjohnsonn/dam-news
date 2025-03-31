// // NewsAPI.ts
// export interface NewsAPIConfig {
//   apiKey: string;
//   baseUrl?: string; // defaults to "https://newsapi.org/v2"
// }

// export interface NewsSource {
//   id: string | null;
//   name: string;
// }

// export interface NewsArticle {
//   source: NewsSource;
//   author: string | null;
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   publishedAt: string;
//   content: string;
// }

// export interface NewsResponse {
//   status: 'ok' | 'error';
//   totalResults: number;
//   articles: NewsArticle[];
//   code?: string; // for errors
//   message?: string; // for errors
// }

// // Internal configuration stored as module-level variables.
// let _apiKey: string = process.env.EXPO_PUBLIC_NEWS_API_KEY!;
// let _baseUrl: string = 'https://newsapi.org/v2';

// /**
//  * Build a full URL for the request.
//  */
// function buildUrl(endpoint: string, params: Record<string, any> = {}): string {
//   const url = new URL(endpoint, _baseUrl);
//   url.searchParams.append('apiKey', _apiKey);
//   Object.keys(params).forEach((key) => {
//     if (params[key] !== undefined) {
//       url.searchParams.append(key, params[key].toString());
//     }
//   });
//   return url.toString();
// }

// /**
//  * Generic request function using async/await.
//  */
// export async function request<T = any>(
//   endpoint: string,
//   params: Record<string, any> = {}
// ): Promise<T> {
//   const url = buildUrl(endpoint, params);
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`NewsAPI request failed with status ${response.status}`);
//   }
//   const data = await response.json();
//   return data as T;
// }

// /**
//  * Get top headlines.
//  * Example: getTopHeadlines({ country: "us" })
//  */
// export async function getTopHeadlines(params: Record<string, any> = {}): Promise<NewsResponse> {
//   return await request<NewsResponse>('/top-headlines', params);
// }

// /**
//  * Get all articles matching certain criteria.
//  */
// export async function getEverything(params: Record<string, any> = {}): Promise<NewsResponse> {
//   return await request<NewsResponse>('/everything', params);
// }
