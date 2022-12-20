/* eslint-disable prettier/prettier */
//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';
import {AuthContext} from '../../Constants/context';

import AppUrl from '../../RestApi/AppUrl';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import LoaderComp from '../../Components/LoaderComp';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';

// create a component
const EditPassWord = () => {
  const navigation = useNavigation();
  const [buffer, setBuffer] = useState(false);
  const [eyeIconOne, setEyeIconOne] = useState(false);
  const [eyeIconTwo, setEyeIconTwo] = useState(false);
  const [eyeIconThree, setEyeIconThree] = useState(false);
  const [oldPass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confirmNewPass, setConfirmPass] = useState(null);
  const {axiosConfig} = useContext(AuthContext);

  const handleUpdate = () => {
    const data = {
      current_password: oldPass,
      new_password: newPass,
      password_confirm: confirmNewPass,
    };
    setBuffer(true);
    axios.post(AppUrl.updateInfo, data, axiosConfig).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        setBuffer(true);
        Toast.show('Password Updated', Toast.durations.SHORT);
        navigation.goBack();
      }
    });
  };

  return (
    <SafeAreaView>
      {buffer && <LoaderComp />}
      <CustomHeader backFunc={() => navigation.goBack()} />
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View style={styles.container}>
          <View style={{marginHorizontal: 10}}>
            <TitleHeader title={'Update password'} />
          </View>
          <View style={styles.containerChild}>
            <View style={{padding: 12}}>
              <View>
                <View>
                  <Text style={styles.title}>Old Password</Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TextInput
                    secureTextEntry={!eyeIconThree ? true : false}
                    style={styles.createMeetupRow}
                    placeholder="*****"
                    placeholderTextColor="#9e9e9e"
                    onChangeText={setOldPass}
                    value={oldPass}
                  />
                  <TouchableOpacity
                    onPress={() => setEyeIconThree(!eyeIconThree)}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '35%',
                      marginRight: 20,
                    }}>
                    <Entypo
                      name={!eyeIconOne ? 'eye-with-line' : 'eye'}
                      color={'#ffaa00'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.title}>New Password</Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TextInput
                    secureTextEntry={!eyeIconOne ? true : false}
                    style={styles.createMeetupRow}
                    placeholder="*****"
                    placeholderTextColor="#9e9e9e"
                    onChangeText={setNewPass}
                    value={newPass}
                  />
                  <TouchableOpacity
                    onPress={() => setEyeIconOne(!eyeIconOne)}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '35%',
                      marginRight: 20,
                    }}>
                    <Entypo
                      name={!eyeIconOne ? 'eye-with-line' : 'eye'}
                      color={'#ffaa00'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.title}>Confirm Password</Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TextInput
                    secureTextEntry={!eyeIconTwo ? true : false}
                    style={styles.createMeetupRow}
                    placeholder="*****"
                    placeholderTextColor="#9e9e9e"
                    onChangeText={setConfirmPass}
                    value={confirmNewPass}
                  />
                  <TouchableOpacity
                    onPress={() => setEyeIconTwo(!eyeIconTwo)}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '35%',
                      marginRight: 20,
                    }}>
                    <Entypo
                      name={!eyeIconTwo ? 'eye-with-line' : 'eye'}
                      color={'#ffaa00'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleUpdate}>
                  <LinearGradient
                    colors={['#E19A04', '#E7A725', '#FFAD55', '#FACF55']}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                    }}>
                    <Text style={{fontSize: 13, color: 'white'}}>
                      Update Password
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  title: {
    color: '#9e9e9e',
    marginHorizontal: 8,
    fontSize: 13,

    marginBottom: 6,
    // textAlign: 'center',
    color: '#C9B049',
  },
  textInput: {
    borderWidth: 0.7,
    borderRadius: 23,
    marginVertical: 7,
    borderColor: '#ffad00',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#181818',
  },
  textInputMax: {
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 0.7,
    borderRadius: 23,
    marginVertical: 7,
    borderColor: '#ffad00',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#181818',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerChild: {
    backgroundColor: '#181819',
    margin: 15,
    borderRadius: 20,
  },
  createPostRow: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',

    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#181818',
  },
  createPostRowMain: {
    // flex: 1,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
  },
  createPostRowMainSlot: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    backgroundColor: '#181818',
    padding: 10,
  },
  createMeetupRow: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#ffad00',
    borderRadius: 23,
    backgroundColor: '#181818',
    padding: 10,
    fontSize: 13,
    height: 43,
    color: 'white',
  },
  createPostTitle: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
  },
  createPostDescription: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 0.7,
    backgroundColor: '#181818',
    borderColor: '#ffad00',
    borderRadius: 35,
    padding: 10,
    minHeight: 70,
    fontSize: 13,
  },
  uploadFile: {
    flex: 1,
    flexDirection: 'row',
  },
  uploadFileBtn: {
    backgroundColor: '#181818',
    flex: 1,
    margin: 6,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 0.7,
    borderColor: '#ffad00',
    borderRadius: 23,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadFileBtnMain: {
    flex: 1,
    // margin: 8,
    // margin: 8,
    // flexDirection: 'row',
    color: 'white',
    // height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#2A2B2E',
    borderRadius: 20,
    width: '47%',
    height: 40,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    width: '47%',
    backgroundColor: '#0B3E92',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  freeBtn: {
    flex: 1,
    height: 40,
    marginTop: 8,
    marginBottom: 8,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // tkStyle: {
  //   marginTop: 5,
  //   flex: 1,
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: '#fff',
  //   color: '#fff',
  //   flexDirection: 'row',
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   width: 25,
  //   height: 25,
  // },
  tkStyle: {
    marginTop: 10,
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  tkStyleOffline: {
    // marginTop: 10,
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  parentOnlineView: {
    flexDirection: 'row',
  },
  onlineTab: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 8,
  },
  offlineTab: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 8,
  },
  activeOnline: {
    backgroundColor: 'coral',
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 8,
  },
  activeOnlineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeOfflineText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tkInput: {
    color: '#fff',
    flex: 10,
    textAlign: 'center',
  },
});

//make this component available to the app
export default EditPassWord;
