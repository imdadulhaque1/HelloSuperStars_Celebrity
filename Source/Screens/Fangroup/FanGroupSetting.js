import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useContext, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
export default function FanGroupSetting({joinFanGroup, postFanGroup, slug}) {
  console.log('joinFanGroup-----', joinFanGroup);
  console.log('postFanGroup-----', postFanGroup);
  const [join, setJoin] = useState(joinFanGroup);
  const [postFan, setPostFan] = useState(postFanGroup);
  const {axiosConfig} = useContext(AuthContext);

  const handleJoinApproveChange = itemValue => {
    setJoin(itemValue);
    axios
      .post(AppUrl.fanGroupJoinPermission + slug + '/' + itemValue, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          ToastAndroid.show('Changed', ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log('changed to', itemValue);
  };
  const handlePostApproveChange = itemValue => {
    setPostFan(itemValue);
    axios
      .post(AppUrl.fanGroupPostPermission + slug + '/' + itemValue, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          ToastAndroid.show('Changed', ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(AppUrl.fanGroupPostPermission + slug + '/' + itemValue);
        console.log(err);
      });
    console.log('changed to', itemValue);
  };
  return (
    <View style={{margin: 16}}>
      <View
        style={{
          backgroundColor: '#292929',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        <Text
          style={{
            color: '#7CF8CF',
            fontSize: 15,
          }}>
          Join Approve
        </Text>
        <Picker
          style={{color: '#fff', placeholderTextColor: '#fff'}}
          selectedValue={String(join)}
          onValueChange={(itemValue, itemIndex) => {
            handleJoinApproveChange(itemValue);
            console.log(itemValue);
          }}>
          <Picker.Item label="-- Select Join Approval --" value="2" />
          <Picker.Item label="Approve by Admin/Star" value="0" />
          <Picker.Item label="Anyone can Join" value="1" />
        </Picker>
      </View>
      <View
        style={{
          backgroundColor: '#292929',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        <Text
          style={{
            color: '#7CF8CF',
            fontSize: 15,
          }}>
          Post Approve
        </Text>
        <Picker
          style={{color: '#fff', placeholderTextColor: '#fff'}}
          selectedValue={String(postFan)}
          onValueChange={(itemValue, itemIndex) => {
            handlePostApproveChange(itemValue);
          }}>
          <Picker.Item label="-- Select Post Approval --" value="2" />
          <Picker.Item label="Approve by Admin/Star" value="0" />
          <Picker.Item label="Anyone can Join" value="1" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
