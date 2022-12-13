/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
// In App.js in a new project

import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Dashboard from '../Screens/Dashboard/Dashboard'
import MainNavigationString from '../Constants/MainNavigationString';

// import MainStack from './MainStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import CustomDrawer from '../Components/CustomDrawer/CustomDrawer';
import AuthStack from './AuthStack';
import { AuthContext } from '../Constants/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import linking from "../videoSdk/navigators/linking";

// Socket io
import io from 'socket.io-client';
import AppUrl from '../RestApi/AppUrl';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import TestSdk from '../Screens/TestSdk';
import VideoSdkv2 from '../../VideoSdkv2';
import MainStack from './MainStack';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function Routes() {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [useInfo, setUserInfo] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [totalNotification, setTotalNotification] = useState();

  const [loginStatus, setLoginStatus] = useState(null);
  const [socketData, setSocketData] = useState();
  const socket = useRef();

  const [allEvent, setAllEvent] = useState(0);

  const dashboardCount = () => {
    axios
      .get(AppUrl.dashboard, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setAllEvent(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const updateNotification = () => {
    axios
      .get(AppUrl.totalNotificationCount, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          console.log(res.data);
          setTotalNotification(res.data.totalNotification);
        }
      })
      .catch(err => {
        console.log('noti error', err);
      });
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_token');
      console.log(value);
      if (value !== null) {
        setUserToken(value);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    } catch (error) { }
  };

  //token set
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('auth_token', value);
    } catch (e) {
      // saving error
    }
  };

  //login information save
  const LoginStatusSet = async value => {
    try {
      await AsyncStorage.setItem('loginStaus', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  //user information set
  const setUserInformation = async value => {
    setUserInfo(value);
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(value));
    } catch (e) {
      console.log(e.message);
    }
  };

  //login information get
  const LoginStatusGet = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('auth_token');
      const userInfo = await AsyncStorage.getItem('userInfo');

      console.log('auth information');
      if (userInfo !== null) {
        setUserInfo(JSON.parse(userInfo));
      }

      if (loginStatus !== null) {
        setUserToken(loginStatus);
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userToken}`,
      enctype: 'multipart/form-data',
    },
  };

  const authContext = useMemo(() => ({
    demoLogin: () => {
      setIsLogin(true);
    },
    signIn: (value, userInfo) => {
      const UserInFormation = {
        id: userInfo.id,
        name: userInfo.first_name + userInfo.last_name,
        image: userInfo.image,
      };
      console.log('user info comming', UserInFormation);

      socketData.emit('addUser', UserInFormation);

      setUserInformation(userInfo);
      storeData(value.token);
      setUserToken(value.token);
      setLoading(false);
    },
    signOut: () => {
      setIsLogin(false);
      AsyncStorage.removeItem('auth_token');
      AsyncStorage.removeItem('loginStaus');
      setUserToken(null);
      setLoginStatus(null);
      setLoading(false);
    },
    signUp: token => {
      storeData(token);
      setUserToken(token);

      //user information update with signup
      // setUserInfo(userInfo);
      // LoginStatusSet(userInfo);
    },
    Otp: () => {
      if (userToken) {
        LoginStatusSet(userToken);
      }
    },

    category: () => {
      setLoginStatus('login');
      LoginStatusSet(useInfo);
    },
    token: async () => {
      try {
        const value = await AsyncStorage.getItem('auth_token');
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.log(error);
      }
    },
  }));

  useEffect(() => {
    // console.log('user inforamtion...', useInfo);
    socket.current = io(AppUrl.socketUrl);
    console.log('socket.current', socket.current);
    setSocketData(socket.current);
    retrieveData();
    LoginStatusGet();
    updateNotification();
    dashboardCount();

    createChannels();
  }, []);
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  return (
    <AuthContext.Provider
      value={{
        authContext,
        userToken,
        axiosConfig,
        useInfo,
        socket,
        socketData,
        updateNotification,
        totalNotification,
        dashboardCount,
        allEvent,
        setUserInformation,
        LoginStatusGet,
      }}>
      <NavigationContainer linking={linking}>
        {isLogin ? (

          <Stack.Navigator screenOptions={{headerShown:false}}>
            {/* <Drawer.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#272727',
                },

                headerTintColor: 'white',
              }}
              drawerContent={props => <CustomDrawer {...props} />}>
              <Drawer.Screen
                name={MainNavigationString.TAB}
                component={TabRoutes}
              />

              <Drawer.Screen
                name={'VideoSdk'}
                component={VideoSdkv2}
              />
            </Drawer.Navigator> */}
            {MainStack(Stack)}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {AuthStack(Stack)}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Routes;
