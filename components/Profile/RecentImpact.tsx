import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

// TODO: use firebase to get saved articles and bills

type Props = {};

const RecentImpact = (props: Props) => {
  return (
    <View className="flex flex-col rounded-xl bg-[#F8F4EC] p-3 shadow-sm">
      <TouchableOpacity
        onPress={() => {
          router.navigate('/(tabs)/recentImpacts');
        }}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-md font-serif font-medium">Most Recent Impact Made</Text>
        </View>
        <Text className="py-4 text-center italic">No recent impacts yet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecentImpact;
