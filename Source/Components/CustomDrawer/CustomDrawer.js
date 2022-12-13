/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {View, Text, Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainNavigationString from '../../Constants/MainNavigationString';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';

function CustomDrawer(props) {
  const Navigation = useNavigation();
  const {authContext, useInfo} = useContext(AuthContext);

  return (
    <DrawerContentScrollView style={{backgroundColor: 'black'}} {...props}>
      {/* <DrawerItemList {...props} /> */}
      <ImageBackground
        source={
          useInfo?.cover_photo
            ? {
                uri: `${AppUrl.MediaBaseUrl + useInfo?.cover_photo}`,
              }
            : null
        }
        resizeMode="cover"
        style={{
          backgroundColor: '#292C3B',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{marginLeft: 10, paddingVertical: 20}}>
          <Image
            source={
              useInfo?.image
                ? {
                    uri: `${AppUrl.MediaBaseUrl + useInfo?.image}`,
                  }
                : imagePath.defultImage
            }
            resizeMode="stretch"
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'gold',
            }}
          />
          <Text style={{color: 'white', fontSize: 18, marginVertical: 3}}>
            {useInfo?.first_name + ' ' + useInfo?.last_name}
          </Text>
          <Text style={{color: 'gray', fontSize: 10}}>{useInfo?.email}</Text>
          {/* <Text style={{color: 'gray', fontSize: 10}}>{useInfo?.image}</Text> */}
          <Text style={{color: 'gold', fontSize: 14, marginVertical: 1}}>
            {useInfo?.user_type}
          </Text>
        </View>
      </ImageBackground>
      <DrawerItem
        label="Schedule"
        icon={() => <Icon name="calendar-o" size={20} color="gold" />}
        labelStyle={{color: '#f2f2f2', borderColor: '#a8a8a8'}}
        onPress={() => Navigation.navigate(MainNavigationString.SCHEDULE)}
        style={{borderColor: '#2e2d2d', borderBottomWidth: 2, borderRadius: 10}}
      />
      <DrawerItem
        label="Wallet"
        icon={() => <Entypo name="wallet" size={20} color="gold" />}
        labelStyle={{color: '#f2f2f2'}}
        onPress={() => Navigation.navigate(MainNavigationString.WALLET)}
        style={{borderColor: '#2e2d2d', borderBottomWidth: 2, borderRadius: 10}}
      />
      <DrawerItem
        label="Setting"
        icon={() => (
          <Ionicons name="ios-settings-sharp" size={20} color="gold" />
        )}
        labelStyle={{color: '#f2f2f2'}}
        onPress={() => Navigation.navigate(MainNavigationString.SETTING)}
        style={{borderColor: '#2e2d2d', borderBottomWidth: 2, borderRadius: 10}}
      />
      <DrawerItem
        label="Logout"
        icon={() => <Entypo name="log-out" size={20} color="gold" />}
        labelStyle={{color: '#f2f2f2'}}
        onPress={() => authContext.signOut()}
        style={{borderColor: '#2e2d2d', borderBottomWidth: 2, borderRadius: 10}}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
