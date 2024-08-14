import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import { BlurView } from 'expo-blur';
import CustomIcon from '../components/CustomIcon';
import UserProfileScreen from '../screens/UserProfileScreen';
import HomeStack from './HomeStack';




const Tab = createBottomTabNavigator();




const DashboardNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.bottomTab, { display: 'flex' }, null],
        tabBarBackground: () => (
          <BlurView style={styles.blurStyle} intensity={100} tint='light' />
        ),
      }}
 
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomIcon
              name={focused ? 'home' : 'home-outline'}
              color={focused ? 'black' : 'black'}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomIcon
              name={focused ? 'heart' : 'heart-outline'}
              color={focused ? 'red' : 'gray'}
              size={size}
              badgeBackgroundColor={focused ? '#027aa6' : 'red'}
              badgeNumber={10}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabLabel,
                focused && styles.focusedTabLabelFavorites,
              ]}
            >
              Favorites
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomIcon
              name={focused ? 'shopping' : 'shopping-outline'}
              color={focused ? 'midnightblue' : 'gray'}
              size={size}
              badgeNumber={4}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>
              Cart
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomIcon
              name={focused ? 'view-grid' : 'view-grid-outline'}
              color={focused ? 'black' : 'gray'}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>
              Categories
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name='UserProfile'
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomIcon
              name={focused ? 'account' : 'account-outline'}
              color={focused ? 'black' : 'gray'}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>
              Account
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    height: 85,
    position: 'absolute',
    backgroundColor: 'rgba(7, 22, 46,0.1)',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tabLabel: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 3,
  },
  focusedTabLabel: {
    color: 'black',
  },
  focusedTabLabelFavorites: {
    color: 'red',
  },
});

export default DashboardNavigator;
