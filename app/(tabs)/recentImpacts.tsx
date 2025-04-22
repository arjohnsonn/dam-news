import { router } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import SavedArticle from '~/components/Profile/SavedArticle';

export default function recentImpacts() {
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
      {Object.keys([1]).map((key) => (
        <SavedArticle key={key} />
      ))}
    </View>
  );
}
