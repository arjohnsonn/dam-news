import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

type Props = {
  author: string;
  authorImage?: string;
};

const Interaction = (props: Props) => {
  return (
    <View className="my-3 flex w-full flex-row justify-between">
      <View className="flex flex-row items-center gap-x-3">
        <View className="rounded-full bg-gray-300 p-1">
          <Image
            source={props.authorImage ?? require('../images/Profile.png')}
            className="h-5 w-5"
          />
        </View>
        <Text className="text-left text-lg font-semibold">{props.author}</Text>
      </View>
      <View className="flex flex-row items-center gap-x-2">
        <TouchableOpacity>
          <View className="rounded-full bg-gray-300 p-2">
            <Image source={require('../images/save.png')} className="h-4 w-4" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="rounded-full bg-gray-300 p-2">
            <Image source={require('../images/share.png')} className="h-4 w-4" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="rounded-full bg-gray-300 p-2">
            <Image source={require('../images/like.png')} className="h-4 w-4" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interaction;
