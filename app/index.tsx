import { SafeAreaView, View, Image, Text, ScrollView } from 'react-native';
import Interaction from '~/components/Interaction';

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex items-center p-5" style={{ flex: 1 }}>
        <Image source={require('../images/grid.png')} className="h-32 w-full rounded-xl" />

        {/* HEADLINE/TITLE */}
        <Text className="mt-2 w-full text-left font-serif text-xl font-bold">
          This is the headline of a breaking news article. Support the cause here.
        </Text>

        <Interaction author="John Doe" />

        {/* SUMMARY */}
        <View className="text-md w-full rounded-xl bg-[#DCEFEF] p-3 leading-4">
          <Text className="font-seri text-left ">
            The article discusses the ongoing issues with hospital price transparency, where
            unclear, inconsistent data hinders patients from predicting surgery costs.
          </Text>
        </View>

        {/* ARTICLE CONTENT */}
        <ScrollView className="leading-2 mt-4 h-full text-left font-serif">
          <Text className="text-md leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur mi nec
            enim interdum, quis luctus lorem posuere. Cras id dui vitae justo gravida interdum.
            Mauris sodales, lacus sit amet facilisis fermentum, velit libero luctus diam, quis
            gravida quam est at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Nulla facilisi. Integer auctor elit ut metus convallis,
            sit amet malesuada nisl tristique. Sed non metus id neque pharetra varius.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
