import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useUIStore } from '~/store/bottomBar';

export default function TabLayout() {
  const bottomBarEnabled = useUIStore((s: { bottomBarEnabled: any }) => s.bottomBarEnabled);

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      {/* <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../images/search.png')}
              className="mt-7 h-10 w-10 rounded-full"
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="main"
        options={{
          href: !bottomBarEnabled ? null : undefined,
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require('../../images/stepup.png')} className="mt-6 h-8 w-8" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: !bottomBarEnabled ? null : undefined,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../images/profile.png')}
              className="mt-8 h-9 w-9 rounded-full"
            />
          ),
        }}
      />

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="demographics" options={{ href: null }} />
      <Tabs.Screen name="goal" options={{ href: null }} />
      <Tabs.Screen
        name="recentImpacts"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
