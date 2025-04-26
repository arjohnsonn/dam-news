// Article.tsx
import React from 'react';
import { SafeAreaView, View, Image, Text, ScrollView, Dimensions } from 'react-native';
import Interaction from '~/components/Interaction';
import { useLocalSearchParams } from 'expo-router';


interface ArticleProps {
  article: {
    id: string;
    headline: string;
    author: string;
    summary: string;
    content: string;
    image: string;
  };
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const windowWidth = Dimensions.get('window').width;
  //const { docId } = useLocalSearchParams();
  const docId  = 'pEeD7Lno6x1sOpAyKQ58';
  console.log('docId in Article screen:', docId);


  return (
    <SafeAreaView style={{ width: windowWidth }}>
      <View className="flex-1 px-5">
        <ScrollView>
          <Image source={{ uri: article.image }} className="h-32 w-full rounded-lg" />

          {/* HEADLINE/TITLE */}
          <Text className="mt-2 text-left font-serif text-lg font-bold">{article.headline}</Text>

          <Interaction
            author={article.author}
            url={article.id}
            title={article.headline}
            summary={article.summary}
            docId={typeof docId === 'string' ? docId : ''}
          />

          {/* SUMMARY */}
          <View className="rounded-lg bg-[#DCEFEF] p-3">
            <Text className="text-md text-left font-serif leading-5">{article.summary}</Text>
          </View>

          {/* ARTICLE CONTENT */}
          <Text className="text-md mt-2 font-serif leading-6">{article.content}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Article;
