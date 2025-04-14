import React from 'react';
import { Text, View } from 'react-native';

// TODO: use firebase to get saved articles and bills

type Props = {
  progress: number;
};

const Progress = (props: Props) => {
  return (
    <View className="rounded-xl bg-[#F8F4EC] p-3 shadow-sm">
      <Text className="text-md flex w-full text-left font-serif font-bold">Your Progress</Text>
      <View className="flex flex-row items-center justify-between">
        <Text className="flex pt-1 text-left text-sm font-bold text-red-500">
          {props.progress}% to complete
        </Text>
        <Text className="font-md flex text-center text-xs text-slate-500">27min</Text>
      </View>

      <View className="w-full">
        <View className="w-full">
          <View className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <View style={{ width: `${props.progress}%` }} className="h-2 rounded-full bg-red-500" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Progress;
