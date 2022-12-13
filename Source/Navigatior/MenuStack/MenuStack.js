import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigationString from '../../Constants/MainNavigationString';
import Menu from '../../Screens/Menu/Menu';
import Wallet from '../../Screens/Wallet/Wallet';
import Setting from '../../Screens/Setting/Setting';
import Schedule from '../../Screens/Schedule/Schedule';
import ScheduleForm from '../../Screens/Schedule/ScheduleForm';
import PersonalInfoForm from '../../Screens/Setting/PersonalInfoForm';
import EditName from '../../Screens/Setting/EditName';
import EditPassword from '../../Screens/Setting/EditPassword';


export default function MenuStack() {
  const MenuStack = createNativeStackNavigator();
  return (
    <MenuStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <MenuStack.Screen
        name={MainNavigationString.MENU}
        component={Menu}
      />

      <MenuStack.Screen
        name={MainNavigationString.WALLET}
        component={Wallet}
      />

      <MenuStack.Screen
        name={MainNavigationString.SETTING}
        component={Setting}
      />

      {/*============== Setting==============  */}
      <MenuStack.Screen
        name={MainNavigationString.SCHEDULE}
        component={Schedule}
      />


      <MenuStack.Screen
        name={MainNavigationString.SCHEDULESFORM}
        component={ScheduleForm}
      />


<MenuStack.Screen
        name={MainNavigationString.PERSONALINFO}
        component={PersonalInfoForm}
      />
        <MenuStack.Screen
        name={MainNavigationString.EDITNAME}
        component={EditName}
      />
        <MenuStack.Screen
        name={MainNavigationString.EDITPASSWORD}
        component={EditPassword}
      />
    </MenuStack.Navigator>
  );
}

const styles = StyleSheet.create({});
