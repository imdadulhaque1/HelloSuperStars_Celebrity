import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./Source/videoSdk/scenes/splash/SplashScreen";
import { SCREEN_NAMES } from "./Source/videoSdk/navigators/screenNames";

import MeetingInfoScreen from "./Source/videoSdk/scenes/meetingInfo";
import MeetingInitializerScreen from "./Source/videoSdk/scenes/meetingInitializer";
import UpcomingMeetingScreen from "./Source/videoSdk/scenes/upcomingMeeting";

import { Colors } from "./Source/videoSdk/styles";
import { convertRFValue } from "./Source/videoSdk/styles/spacing";
import { ROBOTO_FONTS } from "./Source/videoSdk/styles/fonts";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const RootStack = createStackNavigator();

export default function VideoSdkv2() {



  return(
    <>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          animationEnabled: false,
        }}
        initialRouteName={SCREEN_NAMES.UpcomingMeeting}
      >
        <RootStack.Screen
          name={SCREEN_NAMES.UpcomingMeeting}
          component={UpcomingMeetingScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={SCREEN_NAMES.MeetingInfo}
          component={MeetingInfoScreen}
          options={{
            headerStyle: {
              backgroundColor: Colors.BLUE_MAGENTA,
            },
            title: "Meeting",
            headerTitleStyle: {
              fontSize: convertRFValue(16),
              fontFamily: ROBOTO_FONTS.RobotoMedium,
              color: Colors.WHITE,
            },
            headerTintColor: "white",
          }}
        />

        <RootStack.Screen
          name={SCREEN_NAMES.MeetingInitializer}
          component={MeetingInitializerScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </>
  );
}
