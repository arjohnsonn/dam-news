import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getTopArticles } from '~/lib/newsApi';
import Article from '~/components/Article';
import { ArticleData } from '~/store/articleStore';
import { useArticleStore } from '~/store/articleStore';
import { Sheet } from '~/components/nativewindui/Sheet';
import { ScrollView } from 'react-native';
import { getBulletedList } from '~/lib/gpt';
import { useSheetRef } from '~/components/nativewindui/Sheet';

const Screen: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);

  const [stepUpText, setStepUpText] = useState<string | null>(null);

  const bottomSheetModalRef = useSheetRef();

  // Cache so we don't call the API every time
  let cachedTitle: string;

  async function stepUp() {
    const currentArticle = useArticleStore.getState().currentArticle;
    if (!currentArticle) {
      console.warn('No current article found');
      return;
    }

    setStepUpText('');

    bottomSheetModalRef.current?.present();

    try {
      let text;
      if (currentArticle.headline != cachedTitle) {
        text = await getBulletedList(currentArticle?.summary);
        cachedTitle = currentArticle.headline;
      } else {
        text = stepUpText;
      }

      setStepUpText(text);
    } catch (error) {
      console.error('Error fetching action items:', error);
      setStepUpText('Failed to load action items. Please try again.');
    }
  }

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
      <Text className="my-3 mt-16 px-5 font-serif text-2xl font-bold">Trending For You</Text>

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

      <TouchableOpacity
        onPress={stepUp}
        className="mx-auto mb-3 w-10/12 items-center rounded-full bg-red-600 py-4">
        <Text className="text-md font-bold text-white">Step Up</Text>
      </TouchableOpacity>

      <Sheet ref={bottomSheetModalRef} snapPoints={[stepUpText ? stepUpText.length / 1.1 : 350]}>
        <View>
          <Text className="text-center text-2xl font-black text-[#E32722]">Step Up!</Text>
          {stepUpText != '' ? (
            <ScrollView>
              <Text className="text-md p-3 text-center leading-4">
                {stepUpText?.replace(/\n/g, '\n\n')}
              </Text>
            </ScrollView>
          ) : (
            <View className="h-full w-full items-center justify-center">
              <ActivityIndicator size="small" />
            </View>
          )}
        </View>
      </Sheet>
    </>
  );
};

export default Screen;
