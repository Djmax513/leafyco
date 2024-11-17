import { Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

import { COLORS } from '~/theme/themeColors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightGray,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 64,
          position: 'absolute',
          bottom: 25,
          marginHorizontal: 64,
          borderRadius: 120,
          backgroundColor: COLORS.darkGray,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon variant="material-icons" name="home-variant" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: 'Catálogo Plantas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              variant="material-icons"
              name={focused ? 'flower-tulip' : 'flower-tulip-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              variant="ion-icons"
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
