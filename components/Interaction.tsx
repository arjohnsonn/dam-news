import React from 'react';
import { View, Image, Text, TouchableOpacity, Share, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { saveArticle } from '~/lib/profileService';

type Props = {
  author: string;
  url: string;
  title: string; // <-- Add title
  summary: string; // <-- Add summary
  authorImage?: string;
  docId: string;
};

const TRUNCATE_LENGTH = 24;

const Interaction = (props: Props) => {
  //const { docId } = useLocalSearchParams();
  const docId  = 'pEeD7Lno6x1sOpAyKQ58';

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this article I found on StepUp!',
        url: props.url,
        title: props.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const onSave = async () => {
    if(!props.docId) {
      Alert.alert('Missing profile ID');
      return;
    }

    try {
      await saveArticle(props.docId, {
        title: props.title,
        summary: props.summary,
        url: props.url,
      });
      Alert.alert('Article saved!');
    } catch (e) {
      console.error('Error saving article:', e);
      Alert.alert('Failed to save article');
    }
  };

  return (
    <View className="my-3 flex w-full flex-row justify-between">
      <View className="flex flex-row items-center gap-x-2">
        <View className="rounded-full bg-[#DCEFEF] p-2">
          <Image
            source={props.authorImage ?? require('../images/profile.png')}
            className="h-3 w-3"
          />
        </View>
        <Text className="text-md text-left font-serif font-semibold">
          {props.author.length > TRUNCATE_LENGTH
            ? `${props.author.substring(0, TRUNCATE_LENGTH)}...`
            : props.author}
        </Text>
      </View>
      <View className="flex flex-row items-center gap-x-2">
        <TouchableOpacity onPress={onSave}>
          <View className="rounded-full bg-[#DCEFEF] p-2">
            <Image source={require('../images/save.png')} className="h-4 w-4" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <View className="rounded-full bg-[#DCEFEF] p-2">
            <Image source={require('../images/share.png')} className="h-4 w-4" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="rounded-full bg-[#DCEFEF] p-2">
            <Image source={require('../images/like.png')} className="h-4 w-4" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interaction;
