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
  SafeAreaView,
  Image,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
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
import LoaderComp from '../../Components/LoaderComp';
import CustomHeader from '../CustomHeader';

// create a component
const CreateReusableForm = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
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
      title: '',
      instruction: '',
      description: '',
      date: '',
      start_time: '',
      end_time: '',
      registration_start_date: '',
      registration_end_date: '',
      fee: '',
      max_time: '',
      min_time: '',
      interval: '',
      image_path: '',
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
    img: {
      uri: '',
      type: '',
      name: '',
      data: '',
      oldImage: '',
      for: '',
    },
  });

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
          img: {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].base64,
            oldImage: '',
            for: 'liveChat',
          },
        });
      }
    });
  };

  const upladImage = () => {
    setImageLoad(false);
    axios
      .post(AppUrl.ImageUpload, imageData, axiosConfig)
      .then(res => {
        setImageLoad(true);

        if (res.data.status == 200) {
          setUploadStatus({beforSubmit: false, afterSubmit: true});
          setValue('image_path', res.data.path, {shouldValidate: true});
          Toast.show('Banner added', Toast.durations.SHORT);
        }
      })
      .catch(err => {
        Toast.show(err.message, Toast.durations.SHORT);
        console.log(err);
      });
  };

  const onSubmit = data => {
    setBuffer(true);
    console.log('clint side', data);
    if (uploadStatus.afterSubmit) {
      setUploadStatus({...uploadStatus, beforSubmit: false});
      axios
        .post(AppUrl.LiveChatCreate, data, axiosConfig)
        .then(res => {
          console.log('backend side', res.data);
          setBuffer(false);
          setUploadStatus({...uploadStatus, Submit: false});
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
    } else {
      setBuffer(false);
      Toast.show('Please upload Image first !', Toast.durations.SHORT);
      setUploadStatus({...uploadStatus, beforSubmit: true});
    }
  };

  return (
    <SafeAreaView>
      <CustomHeader backFunc={() => navigation.goBack()} />
      {buffer && <LoaderComp />}
      <ScrollView style={{backgroundColor: '#000', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.containerChild}>
            <View style={{padding: 4}}>
              {/* <View style={styles.createPostRow}>
            <Text style={{color: '#fff'}}>Learning Session Title</Text>
          </View> */}

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
                      placeholder="Session Tittle"
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

              {/* discription start */}
              <View style={{marginVertical: 8}}>
                <View>
                  <Text style={styles.title}>Discription</Text>
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

              {/* file uplad start */}
              <View>
                <Text style={styles.title}>File & Image upload</Text>
              </View>

              <View>
                {/* <TouchableOpacity
              style={styles.uploadFileBtn}
              onPress={openDocumentFile}>
              <FontAwesome5 name="file-export" color={'#ffaa00'} size={15} />
              <Text style={{ color: '#9e9e9e', paddingLeft: 8, fontSize: 13 }}>Upload File</Text>
            </TouchableOpacity> */}
                {imageData.img.uri != '' ? (
                  <View style={{margin: 5}}>
                    <Image
                      source={{uri: imageData.img.uri}}
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
                            backgroundColor: '#34a500c0',
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onPress={upladImage}>
                          <Entypo
                            name="upload-to-cloud"
                            size={25}
                            color="#ffffffc0"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            marginLeft: 10,
                            backgroundColor: '#0000006b',
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onPress={choseImage}>
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
                      onPress={choseImage}>
                      <Entypo name="video-camera" color={'#ffaa00'} size={15} />
                      <Text
                        style={{
                          color: '#9e9e9e',
                          paddingLeft: 8,
                          fontSize: 13,
                        }}>
                        Upload Image
                      </Text>
                    </TouchableOpacity>
                    {uploadStatus.beforSubmit && (
                      <Text
                        style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                        Please upload Image first !
                      </Text>
                    )}
                  </>
                )}
              </View>
              {/* file uplad end */}

              <View style={{marginVertical: 8}}>
                <View>
                  <Text style={styles.title}>Date</Text>
                </View>

                <DatePicker
                  mode="date"
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setDate(date);
                    setOpen(false);
                    setValue('date', date, {required: true});
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
                {error?.date && (
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

              <View style={{marginVertical: 8}}>
                {/* <Text style={styles.title}>Fee per Minute (TK)</Text> */}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.textInput}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Fee Per min"
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

              <View style={{marginVertical: 8}}>
                {/* <Text style={styles.title}>Time Interval (MIN)</Text> */}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.textInput}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Time Interval min-5"
                      placeholderTextColor={'#9e9e9e'}
                    />
                  )}
                  name="interval"
                />
                {errors.interval && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    This is required.
                  </Text>
                )}
                {error?.interval && (
                  <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                    {error?.interval}
                  </Text>
                )}
              </View>

              <View style={{marginVertical: 8}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styles.title}>Max Time </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.title}>Min Time</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '50%'}}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          keyboardType="number-pad"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="5 min"
                          placeholderTextColor={'#9e9e9e'}
                          style={styles.textInputMax}
                        />
                      )}
                      name="min_time"
                    />
                    {errors.min_time && (
                      <Text
                        style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                        This is required.
                      </Text>
                    )}
                    {error?.min_time && (
                      <Text
                        style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                        {error?.min_time}
                      </Text>
                    )}
                  </View>

                  <View style={{width: '50%'}}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          keyboardType="number-pad"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="3 min"
                          placeholderTextColor={'#9e9e9e'}
                          style={styles.textInputMax}
                        />
                      )}
                      name="max_time"
                    />
                    {errors.max_time && (
                      <Text
                        style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                        This is required.
                      </Text>
                    )}
                    {error?.max_time && (
                      <Text
                        style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                        {error?.max_time}
                      </Text>
                    )}
                  </View>

                  {/* <View style={styles.createPostRowMainSlot}>
              <TouchableOpacity>
                <Text style={styles.tkStyle}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  flex: 10,
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                500Tk
              </Text>
              <TouchableOpacity>
                <Text style={styles.tkStyle}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.createPostRowMainSlot}>
              <TouchableOpacity>
                <Text style={styles.tkStyle}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  flex: 10,
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                {count}
              </Text>
              <TouchableOpacity>
                <Text style={styles.tkStyle}>+</Text>
              </TouchableOpacity>
            </View> */}
                </View>
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
export default CreateReusableForm;
