/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import TabRoutes from './TabRoutes';
import VideoSdkv2 from '../../VideoSdkv2';

const MainStack = Stack => {
  return (
    <>
      <Stack.Screen name="Tab" component={TabRoutes} />
      <Stack.Screen name="VideoSdk" component={VideoSdkv2} />
    </>
  );
};

export default MainStack;
