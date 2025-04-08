import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {};

const Saved = (props: Props) => {
  return (
    <View className="flex flex-col rounded-xl bg-[#DBEFEF] p-3 shadow-sm">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-md font-serif font-medium">Saved Articles and Bills</Text>
        <Text className="font-md flex text-center text-xs text-slate-500">Show All</Text>
      </View>
      <View className="flex flex-row items-center justify-between pt-2">
        <Image source={require('images/grid.png')} className="h-24 w-24 rounded-xl" />
        <Image source={require('images/grid.png')} className="h-24 w-24 rounded-xl" />
        <Image source={require('images/grid.png')} className="h-24 w-24 rounded-xl" />
      </View>
    </View>
  );
};

export default Saved;
