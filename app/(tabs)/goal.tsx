import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { useUIStore } from '~/store/bottomBar';

export default function LastOnboardingStep() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(30);
  const setBottomBarEnabled = useUIStore(
    (s: { setBottomBarEnabled: any }) => s.setBottomBarEnabled
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pb-24 pt-5">
        {/* Header */}
        <Text className="mb-10 mt-4 text-center text-lg font-semibold">Create an Account</Text>

        {/* Progress */}
        <View className="mb-2.5 w-full flex-row items-center">
          <Text className="mr-4 text-xs text-gray-500">3 of 3</Text>
          <View className="h-1.5 flex-1 overflow-hidden rounded bg-gray-300">
            <View
              className="h-full bg-green-400"
              style={{ width: '100%' }} // width computed inline
            />
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text className="mb-10 mt-10 text-center text-4xl font-bold">
          Set your daily goal to start your streak
        </Text>
        <Text className="mb-6 px-10 text-center text-sm text-gray-900">
          How much time would you like to spend reading each day?
        </Text>

        {/* Numeric Display */}
        <Text className="mb-4 text-center text-6xl font-bold">
          {minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}m`}
        </Text>

        {/* Slider */}
        <Slider
          className="mb-2 h-5 w-full"
          minimumValue={5}
          maximumValue={180}
          step={5}
          value={minutes}
          onValueChange={setMinutes}
          minimumTrackTintColor="#4ade80"
          maximumTrackTintColor="#d1f5d3"
          thumbTintColor="#FFFFFF"
        />

        {/* Helper Text */}
        <Text className="mb-8 text-center text-xs text-gray-500">Please use the slider</Text>

        {/* Continue Button */}                       
        <TouchableOpacity
          onPress={() => {
            setBottomBarEnabled(true);
            router.navigate('/(tabs)/main' as any);
            // TODO: Save goal to the database
          }}
          className="mt-5 items-center rounded-2xl bg-red-500 py-3">
          <Text className="text-base font-semibold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
