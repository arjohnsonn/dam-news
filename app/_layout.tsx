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
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  const bottomSheetModalRef = useSheetRef();

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
          <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
            <View>
              <Text className="text-center text-2xl font-bold">Step Up!</Text>
              <Text className="text-center text-lg">Here is an example of things to do</Text>
            </View>
          </Sheet>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      <View className="flex flex-row items-center justify-between bg-white p-6 pb-10">
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../images/search.png')} className="mx-8 h-10 w-10" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            bottomSheetModalRef.current?.present();
          }}>
          <Image source={require('../images/stepup.png')} className="mx-8 h-10 w-10 rounded-full" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../images/profile2.png')} className="mx-8 h-8 w-8" />
        </TouchableOpacity>
      </View>
      {/* </ExampleProvider> */}
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
