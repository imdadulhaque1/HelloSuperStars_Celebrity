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
  Toast,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';
import {AuthContext} from '../../Constants/context';
import {Picker} from '@react-native-picker/picker';
import AppUrl from '../../RestApi/AppUrl';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import LoaderComp from '../../Components/LoaderComp';
import {androidCameraPermission} from '../../../permission';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-player';
import CustomHeader from '../../Components/CustomHeader';
// create a component
const LearningCreate = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [assignment, setAssignment] = useState('');
  const [bannerOrVideo, setBannerOrVideo] = useState('Banner');
  const [open, setOpen] = useState(false);
  const {axiosConfig} = useContext(AuthContext);
  const [timePicker, setTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [imageLoad, setImageLoad] = useState(true);
  const [time, setTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [picDate, setPicDate] = useState({
    start: false,
    end: false,
  });

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
      // banner_or_video: '',
      image: '',
      video: '',
      title: '',
      // assignment: '',
      registration_start_date: '',
      registration_end_date: '',
      event_date: '',
      start_time: '',
      end_time: '',
      fee: '',
      participant_number: '',
      description: '',
      instruction: '',
    },
  });

  function onTimeSelected(event, value) {
    setValue('start_time', moment(value).format('LT'), {required: true});
    setTime(value);
    setTimePicker(false);
  }

  function openEndTimeSelected(event, value) {
    console.log(value);

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
  const [videoData, setVideoData] = useState(null);

  const onCameraClick = async () => {
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
  const onCameraRecord = async () => {
    console.log('onCameraRecord');

    let options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'video',
        videoQuality: 'medium',
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
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => {
          setVideoData({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: res,
            oldImage: '',
          });
        });
      }
    });
  };
  const onChoose = async select => {
    const permissionStatus = await androidCameraPermission();
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {
          text: 'Camera',
          onPress: select === 'Banner' ? onCameraClick : onCameraRecord,
        },
        {
          text: 'Gallery',
          onPress: select === 'Banner' ? choseImage : choseVideo,
        },
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const choseVideo = () => {
    console.log('image com');

    let options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'video',
        videoQuality: 'medium',
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
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => {
          setVideoData({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: res,
            oldImage: '',
          });
        });
      }
    });
  };

  const choseImage = async () => {
    console.log('image com');
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
    console.log('video Dataaaaaa', videoData);
    setUploadStatus({...uploadStatus, beforSubmit: true});
    setBuffer(true);
    const newData = {
      ...data,
      banner_or_video: bannerOrVideo,
      assignment: parseInt(assignment),
      img: imageData,
      video: videoData,
    };
    console.log('new Data', newData);
    setUploadStatus({...uploadStatus, beforSubmit: false});
    axios
      .post(AppUrl.createLeaning, newData, axiosConfig)
      .then(res => {
        console.log('backend side', res.data);
        setBuffer(false);
        setUploadStatus({...uploadStatus, Submit: false});
        console.log(res.data);
        if (res.data.status == 200) {
          Toast.show(res.data.message, Toast.durations.SHORT);
          navigation.goBack();
        } else {
          setError(res.data.validation_errors);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView>
      <CustomHeader backFunc={() => navigation.goBack()} />
      {buffer && <LoaderComp />}
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.containerChild}>
            <View style={{padding: 12}}>
              {/* title start */}
              <View>
                <View>
                  <Text style={styles.title}> Title</Text>
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
                      placeholder="Enter Title"
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
                {error?.title && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    {error?.title}
                  </Text>
                )}
              </View>
              {/* title end */}

              {/* select video or banner started  */}
              <View style={{padding: 5}}>
                <View>
                  <Text style={styles.title}>Select Video Or Banner</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    borderWidth: 1,
                    height: 40,
                    borderColor: '#ffad00',
                    borderRadius: 10,
                    marginTop: 10,
                    color: '#ffffff',
                  }}>
                  <Picker
                    dropdownIconColor="white"
                    mode="dialog"
                    style={{
                      color: '#9e9e9e',
                    }}
                    selectedValue={bannerOrVideo}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                      setBannerOrVideo(itemValue);
                    }}>
                    <Picker.Item label="Banner" value="Banner" />
                    <Picker.Item label="Video" value="Video" />
                  </Picker>
                </View>
              </View>
              {/* select video or banner ended  */}

              {/* file uplad start */}
              <View>
                <Text style={styles.title}>{bannerOrVideo}</Text>
              </View>

              <View>
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
                          onPress={() => {
                            onChoose(bannerOrVideo);
                          }}>
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
                        Please upload {bannerOrVideo} first !
                      </Text>
                    )}
                  </View>
                ) : bannerOrVideo === 'Banner' ? (
                  <>
                    <TouchableOpacity
                      style={styles.uploadFileBtn}
                      onPress={() => {
                        onChoose(bannerOrVideo);
                      }}>
                      <Entypo name="video-camera" color={'#ffaa00'} size={15} />
                      <Text
                        style={{
                          color: '#9e9e9e',
                          paddingLeft: 8,
                          fontSize: 13,
                        }}>
                        Upload {bannerOrVideo}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : bannerOrVideo !== 'Banner' && !videoData ? (
                  <>
                    <TouchableOpacity
                      style={styles.uploadFileBtn}
                      onPress={() => {
                        onChoose(bannerOrVideo);
                      }}>
                      <Entypo name="video-camera" color={'#ffaa00'} size={15} />
                      <Text
                        style={{
                          color: '#9e9e9e',
                          paddingLeft: 8,
                          fontSize: 13,
                        }}>
                        Upload {bannerOrVideo}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={{margin: 20}}>
                    <VideoPlayer
                      video={{
                        uri: `${videoData.uri}`,
                      }}
                      videoWidth={160}
                      videoHeight={90}
                      thumbnail={{
                        uri: 'https://cdn.dribbble.com/users/2083345/screenshots/4553395/sakib.png',
                      }}
                    />
                  </View>
                )}
              </View>
              {/* file uplad end */}

              {/* discription start */}
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
                {error?.description && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    {error?.description}
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
                {error?.instruction && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    {error?.instruction}
                  </Text>
                )}
              </View>
              {/* instruction end */}

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
                    style={{
                      color: '#9e9e9e',
                      marginHorizontal: 4,
                      fontSize: 13,
                    }}>
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
                {error?.event_date && (
                  <Text style={{color: 'red', marginLeft: 10}}>
                    This is required.
                  </Text>
                )}
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
                  setValue('registration_start_date', date, {required: true});
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
                  setValue('registration_end_date', date, {required: true});
                }}
                onCancel={() => {}}
              />

              {/* Event Type Started  */}
              <View style={{padding: 12}}>
                <View>
                  <Text style={styles.title}>Event Type</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    borderWidth: 1,
                    height: 40,
                    borderColor: '#ffad00',
                    borderRadius: 10,
                    marginTop: 10,
                    color: '#ffffff',
                  }}>
                  <Picker
                    dropdownIconColor="white"
                    mode="dialog"
                    style={{
                      color: '#9e9e9e',
                    }}
                    selectedValue={assignment}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                      setAssignment(itemValue);
                    }}>
                    <Picker.Item label="--- Choose One ---" value="" />
                    <Picker.Item label="Without Assignment" value="0" />
                    <Picker.Item label="With Assignment" value="1" />
                  </Picker>
                </View>
              </View>
              {/* Event Type Ended  */}

              {/* Start Time  */}

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
                    <AntDesign
                      name="clockcircleo"
                      color={'#ffaa00'}
                      size={15}
                    />
                  </TouchableOpacity>
                  {errors.end_time && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
                    </Text>
                  )}
                  {error?.end_time && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
                    </Text>
                  )}
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
                    <AntDesign
                      name="clockcircleo"
                      color={'#ffaa00'}
                      size={15}
                    />
                  </TouchableOpacity>
                  {errors.start_time && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
                    </Text>
                  )}
                  {error?.start_time && (
                    <Text style={{color: 'red', marginLeft: 10}}>
                      This is required.
                    </Text>
                  )}
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

              {/* Start-end time ended  */}

              {/* Enter Fee stated  */}

              <View style={{marginVertical: 8}}>
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
                      placeholder="Fee"
                      placeholderTextColor={'#9e9e9e'}
                    />
                  )}
                  name="fee"
                />
                {errors.fee && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    This is required.
                  </Text>
                )}
                {error?.fee && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    {error?.fee}
                  </Text>
                )}
              </View>

              {/* Enter Fee stated  */}

              {/* Enter Participant number stated  */}

              <View style={{marginVertical: 8}}>
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
                      placeholder="Participant Number"
                      placeholderTextColor={'#9e9e9e'}
                    />
                  )}
                  name="participant_number"
                />
                {errors.participant_number && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    This is required.
                  </Text>
                )}
                {error?.participant_number && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    {error?.fee}
                  </Text>
                )}
              </View>

              {/* Enter Participant number ended  */}

              {/* Registration Timing Started  */}
              <View style={{flexDirection: 'row', marginVertical: 8}}>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Registration Start Date</Text>
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
                  {error?.registration_start_date && (
                    <Text style={{color: 'red', marginLeft: 10}}>
                      This is required.
                    </Text>
                  )}
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Registration End Date</Text>
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
                  {error?.registration_end_date && (
                    <Text style={{color: 'red', marginLeft: 10}}>
                      This is required.
                    </Text>
                  )}
                </View>
              </View>
              {/* Registration Timing Ended  */}

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
    // flexDirection: 'row',
    // justifyContent: 'center',
    borderWidth: 0.7,
    // borderColor: '#ffad00',
    // borderRadius: 18,
    // backgroundColor: '#181818',
    padding: 10,
    fontSize: 13,
    height: 43,
    // color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 40,
    borderColor: '#ffad00',
    borderRadius: 10,
    marginTop: 10,
    color: '#ffffff',
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
    borderRadius: 10,
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
export default LearningCreate;
