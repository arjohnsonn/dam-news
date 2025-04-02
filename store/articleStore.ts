// articleStore.ts
import {create} from 'zustand';

export interface ArticleData {
  id: string;
  headline: string;
  author: string;
  summary: string;
  content: string;
  image: string;
}

interface ArticleStore {
  articles: ArticleData[];
  currentArticle: ArticleData | null;
  // Set the whole list of articles
  setArticles: (articles: ArticleData[]) => void;
  // Add a new article to the list
  addArticle: (article: ArticleData) => void;
  // Update an existing article by id (works for all fields)
  updateArticle: (id: string, updated: Partial<ArticleData>) => void;
  // Remove an article by id
  removeArticle: (id: string) => void;
  // Set the current article
  setCurrentArticle: (article: ArticleData | null) => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  currentArticle: null,
  setArticles: (articles) => set({ articles }),
  addArticle: (article) =>
    set((state) => ({
      articles: [...state.articles, article],
    })),
  updateArticle: (id, updated) =>
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, ...updated } : article
      ),
    })),
  removeArticle: (id) =>
    set((state) => ({
      articles: state.articles.filter((article) => article.id !== id),
    })),
  setCurrentArticle: (article) => set({ currentArticle: article }),
}));
