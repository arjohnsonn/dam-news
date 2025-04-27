import React from 'react';
import { Text, View } from 'react-native';

type SavedArticleProps = {
  title: string;
  date: string;
  summary: string;
  highlights?: string[];
};

const SavedArticle = ({ title, date, summary, highlights = [] }: SavedArticleProps) => {
  return (
    <View className="mt-2 flex flex-col rounded-xl bg-[#DBEFEF] p-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-md font-serif font-medium">{title}</Text>
        <Text className="font-md flex text-center text-xs">{date}</Text>
      </View>
      <View className="mt-2">
        <Text className="text-xs text-slate-700">{summary}</Text>
        {highlights.map((point, i) => (
          <Text key={i} className="pt-1 text-xs text-slate-700">
            • {point}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default SavedArticle;
