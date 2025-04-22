import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import SavedArticle from '~/components/Profile/SavedArticle';
import { getUserImpact, SavedImpact } from '~/lib/profileService';

export default function RecentImpacts() {
  const { docId } = useLocalSearchParams();
  const [impacts, setImpacts] = useState<SavedImpact[]>([]);

  useEffect(() => {
    async function fetchImpacts() {
      if (typeof docId !== 'string') return;

      try {
        const data = await getUserImpact(docId);
        setImpacts(data);
      } catch (e) {
        console.error('Failed to load impacts:', e);
      }
    }

    fetchImpacts();
  }, [docId]);

  return (
    <View className="mt-16 flex flex-col items-center justify-center gap-y-3 p-3">
      <View className="flex w-full flex-row items-center justify-between pl-3">
        <TouchableOpacity
          onPress={() => {
            router.navigate('/profile');
          }}>
          <Image source={require('~/images/move-left.png')} className="h-6 w-6" />
        </TouchableOpacity>
      </View>

      {impacts.length === 0 ? (
        <Text className="pt-8 text-slate-500">No saved impacts yet</Text>
      ) : (
        impacts.map((impact) => (
          <SavedArticle
            key={impact.id}
            title={impact.title}
            date={impact.date}
            summary={impact.summary}
            highlights={impact.highlights}
          />
        ))
      )}
    </View>
  );
}


// export default function recentImpacts() {
//   return (
//     <View className="mt-16 flex flex-col items-center justify-center gap-y-3 p-3">
//       <View className="flex w-full flex-row items-center justify-between pl-3">
//         <TouchableOpacity
//           onPress={() => {
//             router.navigate('/profile');
//           }}>
//           <Image source={require('~/images/move-left.png')} className="h-6 w-6" />
//         </TouchableOpacity>
//       </View>
//       {Object.keys([1]).map((key) => (
//         <SavedArticle key={key} />
//       ))}
//     </View>
//   );
// }
