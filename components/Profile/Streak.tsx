import React from 'react';
import Day from './Day';
import { Image, View } from 'react-native';

// TODO: use firebase to get saved articles and bills

type Props = {
  completedDays: number[];
};

const Streak = (props: Props) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-center">
        <Image source={require('images/streak.png')} className="h-24 w-32 rounded-xl" />
      </View>
      <View className="flex flex-row items-center justify-between px-5 pt-2">
        {Array.from({ length: 7 }, (_, index) => (
          <Day
            key={index}
            day={index}
            completed={props.completedDays.find((day) => day === index) != undefined}
          />
        ))}
      </View>
    </View>
  );
};

export default Streak;
