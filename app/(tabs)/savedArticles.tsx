import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import SavedArticle from '~/components/Profile/SavedArticle';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/lib/firebaseConfig';
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

type SavedArticle = {
  id: string;
  title: string;
  summary: string;
  url: string;
  savedAt: Date;
};

export default function RecentImpacts() {
  const docId = 'pEeD7Lno6x1sOpAyKQ58';
  const [articles, setArticles] = useState<SavedArticle[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchSavedArticles = async () => {
        if (typeof docId !== 'string') {
          console.error('Invalid docId');
          return;
        }

        try {
          const savedRef = collection(db, 'profiles', docId, 'savedArticles');
          const snapshot = await getDocs(savedRef);
          const fetched = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              summary: data.summary,
              url: data.url,
              savedAt: data.savedAt?.toDate() || new Date(),
            };
          });
          setArticles(fetched);
        } catch (e) {
          console.error('Error fetching saved articles:', e);
        }
      };

      fetchSavedArticles();
    }, [docId])
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-3">
        <TouchableOpacity onPress={() => router.navigate('/profile')}>
          <Image source={require('~/images/move-left.png')} className="h-6 w-6" />
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1 px-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 12 }}>
        {(() => {
          // Dedupe articles by title and summary
          const seen = new Set<string>();
          const uniqueArticles = articles.filter((article) => {
            const key = `${article.title}||${article.summary}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          // Sort by savedAt descending (newest first)
          uniqueArticles.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());

          return uniqueArticles.length > 0 ? (
            uniqueArticles.map((article) => (
              <View
                key={`${article.id}-${article.title}`}
                className="mb-3 rounded-lg bg-[#DBEFEF] p-3 shadow-sm">
                <Text className="text-base font-semibold text-black">{article.title}</Text>
                <Text className="pt-1 text-xs text-slate-600">{article.summary}</Text>
              </View>
            ))
          ) : (
            <View className="flex-1 items-center justify-center py-6">
              <Text className="text-center text-slate-500">You have no saved articles!</Text>
            </View>
          );
        })()}
      </ScrollView>
    </SafeAreaView>
  );
}
