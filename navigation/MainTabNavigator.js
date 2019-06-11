import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ListCardView from '../screens/ListCardView'
import NewCard from '../screens/NewCard';
import ManagerCard from '../screens/ManagerCard'

const HomeStack = createStackNavigator({
  HomeStack: ListCardView,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Lista',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const NewCardView = createStackNavigator({
  NewCard: NewCard,
  ManagerCard: ManagerCard
});

NewCardView.navigationOptions = {
  tabBarLabel: 'Novo Cartão',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  NewCardView,
});
