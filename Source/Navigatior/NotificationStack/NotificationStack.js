import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigationString from '../../Constants/MainNavigationString';
import Notification from '../../Screens/Notification/Notification';

export default function NotificationStack() {
  const StackNotification = createNativeStackNavigator();
  return (
    <StackNotification.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={MainNavigationString.NOTIFICATION}>
      <StackNotification.Screen
        name={MainNavigationString.NOTIFICATION}
        component={Notification}
      />
    </StackNotification.Navigator>
  );
}

const styles = StyleSheet.create({});
