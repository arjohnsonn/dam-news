import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Day from '~/components/Profile/Day';
import Progress from '~/components/Profile/Progress';
import RecentImpact from '~/components/Profile/RecentImpact';
import Saved from '~/components/Profile/Saved';
import Streak from '~/components/Profile/Streak';

const completedDays = [0, 1];

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <Text className="mt-2 px-5 font-serif text-3xl font-bold">Hello, {`Aiden`}!</Text>
      <Text className="px-5 text-xl font-bold">Day streak!</Text>

      <View>
        <Streak completedDays={completedDays} />
      </View>

      <View className="flex w-full justify-center px-5 pt-2">
        <Progress progress={0} />
      </View>

      <View className="flex w-full justify-center px-5 pt-3">
        <Saved />
      </View>

      <View className="flex w-full justify-center px-5 pt-3">
        <RecentImpact />
      </View>
    </SafeAreaView>
  );
}
