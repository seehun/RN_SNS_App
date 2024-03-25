import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './pages/Home';
import Search from './pages/Search';
import Add from './pages/Add';
import Shorts from './pages/Shorts';
import Person from './pages/Person';

import Splash from './pages/splash';

import CustomBottomTabs from './components/CustomBottomTabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomBottomTabs {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Shorts" component={Shorts} />
      <Tab.Screen name="Person" component={Person} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default Router;
