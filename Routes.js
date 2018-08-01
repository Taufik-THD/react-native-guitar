import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Tuning from './src/components/Tuning';
import Scale from './src/components/Scale';
import Profile from './src/components/Profile';
import ChordPractice from './src/components/ChordPractice';
import Quiz from './src/components/Tabs';
// import Comingsoon from './src/components/Comingsoon';

const userStackNavigation = createStackNavigator(
  {
    Profile: { screen: Profile },
    Login: { screen: Login },
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);

const homeStackNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Tuning: { screen: Tuning },
    Scale: { screen: Scale },
    ChordPractice: { screen: ChordPractice },
    Quiz: { screen: Quiz },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: { header: null },
  },
);

homeStackNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: homeStackNavigation },
    Profile: userStackNavigation,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
          } else if (routeName === 'Profile') {
            iconName = `ios-contact${focused ? '' : '-outline'}`;
          }
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: '#ff6f00',
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: '#20242b',
          },
        },
      };
    },
  },
);

export default bottomNavigation;
