import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, View, Image, Text, ScrollView } from 'react-native';
import Interaction from '~/components/Interaction';

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex items-center p-5" style={{ flex: 1 }}>
        <Image source={require('../assets/grid.png')} className="h-32 w-full rounded-xl" />
        <Text className="mt-2 w-full text-left font-serif text-xl font-bold">
          This is the headline of a breaking news article. Support the cause here.
        </Text>

        <Interaction author="John Doe" />

        <Text className="text-md w-full text-left font-serif leading-6">
          This is a description of the headlining article. All the news will come here and it will
          be read by the user. Yap yap yap this is a demonstration of text and I am typing this
          randomly as I make this. Is the sky blue? Yes. This product is made for Texas Convergent.
          Hook 'em horns, OU sucks, and A&M is UT's lil bro.
        </Text>
      </View>
    </SafeAreaView>
  );
}
