/* eslint-disable no-trailing-spaces */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
// In App.js in a new project

import * as React from 'react';

import MainNavigationString from '../Constants/MainNavigationString';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardStack from './DashboardStack/DashboardStack';
import NotificationStack from './NotificationStack/NotificationStack';
import { AuthContext } from '../Constants/context';
import MenuStack from './MenuStack/MenuStack';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, View } from 'react-native';
const Tab = createBottomTabNavigator();

function TabRoutes() {
  const { totalNotification } = React.useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          //   position: 'absolute',
          backgroundColor: '#272727',
          
        },
      }}>
    <Tab.Screen
        name={MainNavigationString.DASHBORD}
        component={DashboardStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="home"
                      color={focused ? '#FFAD00' : 'white'}
                      size={22}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="home"
                      color={focused ? '#FFAD00' : 'white'}
                      size={22}
                    />
                  </View>
                )}
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />









      {/* <Tab.Screen
        name={'DASHBORD'}
        component={DashboardStack}
        options={{
          tabBarIcon: ({ focused }) => {
            
            return <MaterialIcons name="home" size={23}   color={focused ? '#FFAD00' : 'white'} />;
          },
          tabBarShowLabel: false,
        }}
      /> */}




      {/* <Tab.Screen
        name={'NOTIFICATION'}
        component={NotificationStack}
        options={{
          tabBarBadge: totalNotification,
          tabBarIcon: ({ focused }) => {
            return <MaterialIcons name="notifications" size={23}   color={focused ? '#FFAD00' : 'white'} />;
          },
          tabBarShowLabel: false,
        }}
      /> */}



<Tab.Screen
            name={'NOTIFICATION'}
            component={NotificationStack}
        options={{
          tabBarBadge: totalNotification,
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialIcons
                      name="notifications"
                      color={focused ? '#FFAD00' : 'white'}
                      size={22}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialIcons
                      name="notifications"
                      color={focused ? '#FFAD00' : 'white'}
                      size={22}
                    />
                  </View>
                )}
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />



<Tab.Screen
            name={MainNavigationString.MENUSTACK}
            component={MenuStack}
        options={{
          tabBarBadge: totalNotification,
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="menu"
                      color={focused ? '#FFAD00' : 'white'}
                      size={22}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                     name="menu"
                      color={focused ? '#FFAD00' : 'white'}
                      size={22}
                    />
                  </View>
                )}
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />




      {/* <Tab.Screen
        name={MainNavigationString.MENUSTACK}
        component={MenuStack}
        options={{
        
          tabBarIcon: ({ focused }) => {
            return <MaterialCommunityIcons name="menu" size={23}   color={focused ? '#FFAD00' : 'white'} />;
          },
          tabBarShowLabel: false,
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    position: 'absolute',
    borderColor: '#FFAD00',
    borderWidth: 1,
    // backgroundColor: '#ffffff7c',
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTab: {
    position: 'absolute',

    borderWidth: 1,
    backgroundColor:'black',
 
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabRoutes;
