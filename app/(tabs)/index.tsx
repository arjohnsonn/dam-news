import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useRouter } from 'expo-router';

const topics = [
  'Arts & Culture',
  'Human Rights',
  'Tech',
  'Health & Wellness',
  'Environment & Sustainability',
  'Animal Wellness',
  'Education',
  'Mental Health',
  'Science',
  'Disaster Relief',
  'Economics',
  'Politics',
  'Sports',
  'Fashion',
  'Entertainment',
  'Media',
  'Travel',
  'Crime',
  'Housing',
  'Immigration',
  'Transportation',
  'Innovation',
  'Startups',
  'Space',
  'Diversity',
  'Law',
  'Justice',
  'Religion',
  'Cybersecurity',
  'Privacy',
  'Employment',
  'Gender',
  'Military',
];

export default function TopicsScreen() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-5">
        {/* Top Header */}
        <Text className="mb-10 mt-4 text-center text-lg font-semibold">Create an Account</Text>

        {/* Progress bar and step text */}
        <View className="mb-16 flex-row items-center">
          <Text className="mr-4 text-xs text-gray-500">1 of 3</Text>
          <View className="h-1.5 flex-1 overflow-hidden rounded bg-gray-300">
            <View className="h-full w-1/3 bg-green-400" />
          </View>
        </View>

        {/* Sub-header */}
        <Text className="mb-6 text-left text-2xl font-bold text-gray-900">
          Choose the topics you want to explore
        </Text>

        {/* Horizontal ScrollView wrapping a multi-row grid */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}>
          {/* A wide container so that chips wrap into multiple rows */}
          <View className="w-[1000px] flex-row flex-wrap">
            {topics.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <TouchableOpacity
                  key={topic}
                  onPress={() => toggleTopic(topic)}
                  className={`mb-7 mr-3 items-center justify-center rounded-full px-4 py-2.5 ${
                    isSelected ? 'bg-[#a3cbcb]' : 'bg-[#c3edec]'
                  }`}>
                  <Text className={`text-center font-medium text-gray-800`}>{topic}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Continue button */}
        <TouchableOpacity
          disabled={selectedTopics.length === 0}
          onPress={() => {
            router.push('/demographics'); // Navigate to next step

            // TODO: Save selected topics to the database
          }}
          className={`mb-24 mt-5 items-center rounded-2xl py-3 ${
            selectedTopics.length === 0 ? 'bg-red-200' : 'bg-red-500'
          }`}>
          <Text className="text-base font-semibold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
