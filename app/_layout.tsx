import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';

import { getBulletedList } from '~/lib/gpt';
import { useState } from 'react';
import { useArticleStore } from '~/store/articleStore';
//
//adding a new comment to step-up
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [stepUpText, setStepUpText] = useState<string | null>(null);

  let modalOpen: boolean = false;
  const bottomSheetModalRef = useSheetRef();

  // Cache so we don't call the API every time
  let cachedTitle: string;

  async function stepUp() {
    const currentArticle = useArticleStore.getState().currentArticle;
    if (!currentArticle) {
      console.warn('No current article found');
      return;
    }

    setStepUpText('Loading action items...');

    try{
      let text;
      if (currentArticle.headline != cachedTitle) {
        text = await getBulletedList(currentArticle?.summary);
        cachedTitle = currentArticle.headline;
      } else {
        text = stepUpText;
      }
    

      setStepUpText(text);
    } catch(error) {
      console.error('Error fetching action items:', error);
      setStepUpText('Failed to load action items. Please try again.');
    }

    bottomSheetModalRef.current?.present();
    modalOpen = true;
  }

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      {/* WRAP YOUR APP WITH ANY ADDITIONAL PROVIDERS HERE */}
      {/* <ExampleProvider> */}

      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen name="index" options={INDEX_OPTIONS} />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
          <Sheet
            ref={bottomSheetModalRef}
            snapPoints={[stepUpText ? stepUpText.length / 1.4 : 350]}>
            <View>
              <Text className="text-center text-2xl font-black text-[#E32722]">Step Up!</Text>
              <ScrollView>
                <Text className="text-md p-3 text-center leading-4">
                  {stepUpText?.replace(/\n/g, '\n\n')}
                </Text>
              </ScrollView>
            </View>
          </Sheet>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      <View className="flex flex-row items-center justify-between bg-white p-6 pb-10">
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../images/search.png')} className="mx-8 h-10 w-10" />
        </TouchableOpacity>
        <TouchableOpacity onPress={stepUp}>
          <Image source={require('../images/stepup.png')} className="mx-8 h-10 w-10 rounded-full" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../images/profile.png')} className="mx-8 h-8 w-8" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
  headerTitle: '',
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: false,
  headerLeft: () => <Text className="pl-2 font-serif text-2xl font-bold">Trending For You</Text>,
} as const;
