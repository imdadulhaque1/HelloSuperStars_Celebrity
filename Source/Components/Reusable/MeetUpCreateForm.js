/* eslint-disable prettier/prettier */
//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';
import {AuthContext} from '../../Constants/context';

import AppUrl from '../../RestApi/AppUrl';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import LoaderComp from '../LoaderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import {androidCameraPermission} from '../../../permission';
import CustomHeader from '../CustomHeader';
// create a component
const MeetUpCreateForm = ({route}) => {
  const {setRefresh} = route.params;
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {axiosConfig, dashboardCount} = useContext(AuthContext);
  const [timePicker, setTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [imageLoad, setImageLoad] = useState(true);
  const [time, setTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));
  const [picDate, setPicDate] = useState({
    start: false,
    end: false,
  });
  const [meetupType, setMeetupType] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({
    afterSubmit: false,
    beforSubmit: false,
  });
  const [buffer, setBuffer] = useState(false);
  //form data
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, shouldValidate},
  } = useForm({
    defaultValues: {
      title: '',
      instruction: '',
      description: '',
      event_date: '',
      start_time: '',
      end_time: '',
      reg_start_date: '',
      reg_end_date: '',
      fee: '',
      image_path: '',
      meetup_type: 'Online',
      venue: '',
      slots: '',
    },
  });

  function onTimeSelected(event, value) {
    setValue('start_time', moment(value).format('LT'), {required: true});
    setTime(value);
    setTimePicker(false);
  }

  function openEndTimeSelected(event, value) {
    setValue('end_time', moment(value).format('LT'), {required: true});
    setEndTime(value);
    setEndTimePicker(false);
  }

  const [imageData, setImageData] = useState({
    uri: '',
    type: '',
    name: '',
    data: '',
    oldImage: '',
    for: '',
  });

  const cameraOrGallery = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCameraBanner},
        {text: 'Gallery', onPress: choseImage},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onCameraBanner = () => {
    let options = {
      title: 'Video Picker',
      mediaType: 'image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'image',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImageData({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          data: response.assets[0].base64,
          oldImage: '',
          for: 'liveChat',
        });
      }
    });
  };

  const choseImage = async () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'image',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImageData({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          data: response.assets[0].base64,
          oldImage: '',
          for: 'liveChat',
        });
      }
    });
  };

  const onSubmit = data => {
    console.log('form data', data);
    const newData = {
      ...data,
      banner: imageData,
    };
    axios
      .post(AppUrl.MeetUpCreate, newData, axiosConfig)
      .then(res => {
        console.log('backend side', res.data);
        setBuffer(false);
        setUploadStatus({...uploadStatus, Submit: false});
        if (res.data.status == 200) {
          Toast.show(res.data.message, Toast.durations.SHORT);
          navigation.goBack();
          setRefresh(1);
          dashboardCount();
        } else {
          setError(res.data.validation_errors);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      <CustomHeader backFunc={() => navigation.goBack()} />
      {buffer && <LoaderComp />}
      <ScrollView style={styles.container}>
        <View style={styles.containerChild}>
          <View style={{padding: 12}}>
            {/* <View style={styles.createPostRow}>
            <Text style={{color: '#fff'}}>Learning Session Title</Text>
          </View> */}

            <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
              <TouchableOpacity
                style={meetupType ? styles.removeBtn2 : styles.removeBtnActive}
                onPress={() => {
                  setMeetupType(false);
                  setValue('meetup_type', 'Online', {required: true});
                }}>
                <View style={{marginHorizontal: 2}}>
                  <MaterialIcons
                    name="online-prediction"
                    color={meetupType ? '#ffaa00' : '#fff'}
                    size={22}
                  />
                </View>
                <View>
                  <Text style={{fontSize: 13, color: 'white'}}>online</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={!meetupType ? styles.removeBtn2 : styles.removeBtnActive}
                onPress={() => {
                  setMeetupType(true);
                  setValue('meetup_type', 'Offline', {required: true});
                }}>
                <View style={{marginHorizontal: 2}}>
                  <Icon
                    name="group"
                    color={!meetupType ? '#ffaa00' : '#fff'}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={{fontSize: 13, color: 'white'}}>offline</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* title start */}
            <View style={{marginTop: 20}}>
              <View>
                <Text style={styles.title}>Event Name</Text>
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.createMeetupRow}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter event name"
                    placeholderTextColor="#9e9e9e"
                  />
                )}
                name="title"
              />
              {errors.title && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* title end */}

            {/* Description start */}
            <View style={{marginVertical: 8}}>
              <View>
                <Text style={styles.title}>Description</Text>
              </View>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.createPostDescription}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Write Description"
                    placeholderTextColor={'#9e9e9e'}
                  />
                )}
                name="description"
              />
              {errors.description && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* discription end */}

            {/* instruction start */}
            <View style={{marginVertical: 8}}>
              <View>
                <Text style={styles.title}>Instruction</Text>
              </View>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.createPostDescription}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Write Instruction"
                    placeholderTextColor={'#9e9e9e'}
                  />
                )}
                name="instruction"
              />
              {errors.instruction && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* instruction end */}

            {/* Event Date Started  */}
            <View style={{marginVertical: 8}}>
              <View>
                <Text style={styles.title}>Event Date</Text>
              </View>

              <DatePicker
                mode="date"
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setDate(date);
                  setOpen(false);
                  setValue('event_date', date, {required: true});
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.createMeetupRow}>
                <Text
                  style={{color: '#9e9e9e', marginHorizontal: 4, fontSize: 13}}>
                  {moment(date).format('LL')}
                </Text>
                <View>
                  <MaterialIcons
                    name="date-range"
                    color={'#ffaa00'}
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* start date */}
            <DatePicker
              mode="date"
              modal
              open={picDate.start}
              date={startDate}
              onConfirm={date => {
                setStartDate(date);
                setPicDate({start: false});
                setValue('reg_start_date', date, {required: true});
              }}
              onCancel={() => {}}
            />

            {/* end data */}

            <DatePicker
              mode="date"
              modal
              open={picDate.end}
              date={endDate}
              onConfirm={date => {
                setEndDate(date);
                setPicDate({end: false});
                setValue('reg_end_date', date, {required: true});
              }}
              onCancel={() => {}}
            />

            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>Registaion Start Date</Text>
                <TouchableOpacity
                  style={styles.uploadFileBtn}
                  onPress={() => setPicDate({start: true, end: false})}>
                  <Text
                    style={{color: '#9e9e9e', paddingRight: 8, fontSize: 13}}>
                    {' '}
                    {moment(startDate).format('LL')}
                  </Text>

                  <MaterialIcons
                    name="date-range"
                    color={'#ffaa00'}
                    size={15}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>Registaion End Date</Text>
                <TouchableOpacity
                  style={styles.uploadFileBtn}
                  onPress={() => setPicDate({end: true, start: false})}>
                  <Text
                    style={{color: '#9e9e9e', paddingRight: 8, fontSize: 13}}>
                    {' '}
                    {moment(endDate).format('LL')}
                  </Text>
                  <MaterialIcons
                    name="date-range"
                    color={'#ffaa00'}
                    size={15}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>Start Time</Text>
                <TouchableOpacity
                  style={styles.uploadFileBtn}
                  onPress={() => setTimePicker(true)}>
                  <Text
                    style={{color: '#9e9e9e', paddingRight: 8, fontSize: 13}}>
                    {' '}
                    {moment(time).format('LT')}
                  </Text>
                  <AntDesign name="clockcircleo" color={'#ffaa00'} size={15} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>End Time</Text>
                <TouchableOpacity
                  style={styles.uploadFileBtn}
                  onPress={() => setEndTimePicker(true)}>
                  <Text
                    style={{color: '#9e9e9e', paddingRight: 8, fontSize: 13}}>
                    {' '}
                    {moment(endTime).format('LT')}
                  </Text>
                  <AntDesign name="clockcircleo" color={'#ffaa00'} size={15} />
                </TouchableOpacity>
              </View>
            </View>

            {timePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                open={timePicker}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={false}
                onChange={onTimeSelected}
              />
            )}

            {endTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={false}
                onChange={openEndTimeSelected}
              />
            )}

            {/* venue started  */}
            {meetupType && (
              <View style={{marginVertical: 8}}>
                <View>
                  <Text style={styles.title}>Venue</Text>
                </View>
                {/* <Text style={styles.title}>Fee per Minute (TK)</Text> */}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.createMeetupRow}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter Venue"
                      placeholderTextColor={'#9e9e9e'}
                    />
                  )}
                  name="venue"
                />
                {errors.venue && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    This is required.
                  </Text>
                )}
              </View>
            )}
            {/* venue ended  */}

            <View style={{marginVertical: 8}}>
              <View>
                <Text style={styles.title}>Slots</Text>
              </View>
              {/* <Text style={styles.title}>Fee per Minute (TK)</Text> */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.createMeetupRow}
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter slot"
                    placeholderTextColor={'#9e9e9e'}
                  />
                )}
                name="slots"
              />
              {errors.slots && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>

            {/* file uplad start */}
            <View>
              <Text style={styles.title}>Upload Banner</Text>
            </View>

            <View>
              {/* <TouchableOpacity
              style={styles.uploadFileBtn}
              onPress={openDocumentFile}>
              <FontAwesome5 name="file-export" color={'#ffaa00'} size={15} />
              <Text style={{ color: '#9e9e9e', paddingLeft: 8, fontSize: 13 }}>Upload File</Text>
            </TouchableOpacity> */}
              {imageData.uri != '' ? (
                <View style={{margin: 5}}>
                  <Image
                    source={{uri: imageData.uri}}
                    style={{height: 130, width: '100%', borderRadius: 10}}
                  />
                  {imageLoad && (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={{
                          marginLeft: 10,
                          backgroundColor: '#0000006b',
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={cameraOrGallery}>
                        <Entypo name="ccw" size={25} color="#ffffffc0" />
                      </TouchableOpacity>
                    </View>
                  )}
                  {uploadStatus.beforSubmit && (
                    <Text
                      style={{
                        color: 'red',
                        position: 'absolute',
                        marginLeft: 10,
                        top: 2,
                      }}>
                      Please upload Image first !
                    </Text>
                  )}
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.uploadFileBtn}
                    onPress={cameraOrGallery}>
                    <Entypo name="video-camera" color={'#ffaa00'} size={15} />
                    <Text
                      style={{color: '#9e9e9e', paddingLeft: 8, fontSize: 13}}>
                      Upload Image
                    </Text>
                  </TouchableOpacity>
                  {uploadStatus.beforSubmit && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      Please upload Image first !
                    </Text>
                  )}
                </>
              )}
            </View>
            {/* file uplad end */}

            <View style={{marginVertical: 8}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.createMeetupRow}
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Fee"
                    placeholderTextColor={'#9e9e9e'}
                  />
                )}
                name="fee"
              />
              {errors.fee && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  {errors.fee}
                </Text>
              )}
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => navigation.goBack()}>
                <Text style={{fontSize: 13, color: 'white'}}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.confirmBtn}>
                <LinearGradient
                  colors={['#E19A04', '#E7A725', '#FFAD55', '#FACF55']}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <Text style={{fontSize: 13, color: 'white'}}>CONFIRM</Text>
                </LinearGradient>
              </TouchableOpacity>
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
    borderRadius: 15,
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
    borderRadius: 25,
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
  removeBtnActive: {
    flexDirection: 'row',
    backgroundColor: '#17CC9C',

    borderRadius: 10,
    width: '47%',
    height: 30,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtn2: {
    flexDirection: 'row',
    borderColor: '#ffaa00',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '47%',
    height: 30,
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
export default MeetUpCreateForm;
