import React from 'react';
import { Image, Text, View } from 'react-native';

const streakDayNotCompleted = require('images/day_streak_incomplete.png');
const streakDayCompleted = require('images/day_streak_complete.png');

function getCurrentDayAsIndex() {
  const date = new Date();
  const day = date.getDay();
  return day;
}

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type Props = {
  day: number;
  completed?: boolean;
};

const Day = (props: Props) => {
  const currentDay = getCurrentDayAsIndex();
  return (
    <View
      className={`flex h-20 w-12 items-center rounded-2xl ${currentDay != props.day ? 'bg-[#DBEFEF]' : 'bg-[#069D9D]'} p-3`}>
      <Text className="text-sm">{days[props.day]}</Text>
      <Image
        source={
          !props.completed && currentDay < props.day ? streakDayNotCompleted : streakDayCompleted
        }
        className={`h-10 w-10 rounded-full`}
      />
    </View>
  );
};

export default Day;
