import React, {useEffect, useState} from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '~/lib/firebaseConfig';
import { useLocalSearchParams } from 'expo-router';

// TODO: use firebase to get saved articles and bills
type SavedArticle = {
  id: string;
  title: string;
  summary: string;
  url: string;
  savedAt: Date;
};

const Saved = () => {
  const { docId } = useLocalSearchParams();
  const [articles, setArticles] = useState<SavedArticle[]>([]);

  useEffect(() => {
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
  }, [docId]);

  return (
    <View className="flex flex-col rounded-xl bg-[#DBEFEF] p-3 shadow-sm">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-md font-serif font-medium">Saved Articles and Bills</Text>
        <Text className="font-md flex text-center text-xs text-slate-500">Show All</Text>
      </View>

      <ScrollView>
        {articles.length > 0 ? (
          articles.map((article) => (
            <View key={article.id} className="mb-3 rounded-lg bg-white p-3 shadow-sm">
              <Text className="text-base font-semibold text-black">{article.title}</Text>
              <Text className="text-xs text-slate-600 pt-1">{article.summary}</Text>
            </View>
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-6">
            <Text className="text-center text-slate-500">You have no saved articles!</Text>
          </View>
        )}
      </ScrollView>
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