import React, { useState, useEffect, useRef } from 'react';
import { FlatList, ActivityIndicator, ListRenderItemInfo, View } from 'react-native';
import { getTopArticles } from '~/lib/newsApi';
import Article from '~/components/Article';
import { ArticleData } from '~/store/articleStore';
import { useArticleStore } from '~/store/articleStore';

const Screen: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getTopArticles();
      const newArticles: ArticleData[] = data.articles.map((article) => ({
        id: article.url, // using URL as a unique identifier
        headline: article.title,
        author: article.author || 'Unknown',
        summary: article.description || '',
        content: article.content || '',
        image: article.urlToImage || '',
      }));

      // Get empty articles from newArticles
      const filteredArticles = newArticles.filter(
        (article) => article.summary != '' && article.content != ''
      );

      setArticles(filteredArticles);
      if (filteredArticles.length > 0) {
        setCurrentArticle(filteredArticles[0]);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (currentArticle) {
      useArticleStore.getState().setCurrentArticle(currentArticle);
    }
  }, [currentArticle]);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const updateCurrentArticle = (info: { viewableItems: Array<{ item: ArticleData }> }) => {
    if (info.viewableItems.length > 0) {
      const visibleItem = info.viewableItems[0].item;
      setCurrentArticle(visibleItem);
    }
  };

  return loading ? (
    <View className="h-full w-full items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Article article={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={updateCurrentArticle}
        viewabilityConfig={viewabilityConfig}
      />

      {currentArticle && (
        <View style={{ padding: 10 }}>
          <Article article={currentArticle} />
        </View>
      )}
    </>
  );
};

export default Screen;
