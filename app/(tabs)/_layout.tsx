import { Tabs } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs initialRouteName="profile" screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
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
        name="index"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../images/stepup.png')}
              className="mt-7 h-10 w-10 rounded-full"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../images/profile.png')}
              className="mt-7 h-10 w-10 rounded-full"
            />
          ),
        }}
      />
    </Tabs>
  );
}
