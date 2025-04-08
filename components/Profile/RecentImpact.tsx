import { Text, View } from 'react-native';
import React from 'react';

type Props = {};

const RecentImpact = (props: Props) => {
  return (
    <View className="flex flex-col rounded-xl bg-[#F8F4EC] p-3 shadow-sm">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-md font-serif font-medium">Most Recent Impact Made</Text>
      </View>
      <View className="mt-2 flex flex-col rounded-lg bg-[#EDEBE4] p-3">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-md font-serif font-medium">California Wildfire Cleanup</Text>
          <Text className="font-md flex text-center text-xs">3/24/25</Text>
        </View>
        <View className="mt-2">
          <Text className="text-xs text-slate-700">
            Here is a detailed description of the impact made. This section provides insight into
            the actions taken, outcomes achieved, and lessons learned from the day’s activities.
          </Text>
          <Text className="pt-3 text-xs text-slate-700">• Foundation 1 is here very cool</Text>
          <Text className="pt-1 text-xs text-slate-700">
            • Foundation 2 foundation of the founders
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecentImpact;
