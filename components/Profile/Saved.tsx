import React, { useEffect, useState } from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '~/lib/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';

// TODO: use firebase to get saved articles and bills

type SavedArticle = {
  id: string;
  title: string;
  summary: string;
  url: string;
  savedAt: Date;
};

const Saved = () => {
  const docId = 'pEeD7Lno6x1sOpAyKQ58';
  const [articles, setArticles] = useState<SavedArticle[]>([]);

  useFocusEffect(
    React.useCallback(() => {
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
    <View className="flex flex-col rounded-xl bg-[#DBEFEF] p-3 shadow-sm">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-md font-serif font-medium">Saved Articles and Bills</Text>
        <Text className="font-md flex text-center text-xs text-slate-500">Show All</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          router.navigate('/(tabs)/savedArticles');
        }}>
        <View className="h-[115px] items-center justify-center pt-2">
          {articles.length > 0 ? (
            (() => {
              const latest = articles.reduce((prev, curr) =>
                prev.savedAt > curr.savedAt ? prev : curr
              );

              const MAX_SUMMARY_LENGTH = 100;

              return (
                <View
                  key={latest.id}
                  className="w-full items-center justify-center rounded-lg bg-white p-3 shadow-sm">
                  <Text className="text-md w-full pb-3 text-left font-semibold text-black">
                    {latest.title}
                  </Text>
                  <Text className="w-full pt-1 text-left text-xs text-slate-600">
                    {latest.summary.length > MAX_SUMMARY_LENGTH
                      ? `${latest.summary.slice(0, MAX_SUMMARY_LENGTH)}…`
                      : latest.summary}
                  </Text>
                </View>
              );
            })()
          ) : (
            <View className="flex-1 items-center justify-center py-6">
              <Text className="text-center text-slate-500">You have no saved articles!</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Saved;

//<View className="flex flex-row items-center justify-between pt-2">
//        {/* <Image source={require('images/grid.png')} className="h-24 w-24 rounded-xl" /> */}
//       {/* <Image source={require('images/grid.png')} className="h-24 w-24 rounded-xl" /> */}
//       {/* <Image source={require('images/grid.png')} className="h-24 w-24 rounded-xl" /> */}
//        <View className="flex-1 items-center justify-center py-6">
//         <Text className="text-center text-slate-500">You have no saved articles!</Text>
//        </View>
//     </View>
