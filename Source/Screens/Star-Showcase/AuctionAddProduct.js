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
  ToastAndroid,
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

import AppUrl from '../../RestApi/AppUrl';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {androidCameraPermission} from '../../../permission';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-player';
import LoaderComp from '../../Components/LoaderComp';
import CustomHeader from '../../Components/CustomHeader';
// create a component
const AuctionAddProduct = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [dateResult, setDateResult] = useState(new Date());
  const [dateDelivery, setDateDelivery] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const {axiosConfig} = useContext(AuthContext);
  const [timePicker, setTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [imageLoad, setImageLoad] = useState(true);
  const [time, setTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [picDate, setPicDate] = useState({
    start: false,
    end: false,
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
      keyword: '',
      details: '',
      base_price: '',
      bid_from: '',
      bid_to: '',
      result_date: '',
      product_delivery_date: '',
      banner: '',
      product_image: '',
    },
  });

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
  });
  const [imageDataProduct, setImageDataProduct] = useState({
    uri: '',
    type: '',
    name: '',
    data: '',
    oldImage: '',
  });

  const onChoose = async type => {
    const permissionStatus = await androidCameraPermission();
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {
          text: 'Camera',
          onPress: () => {
            onCamera(type);
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            choseImage(type);
          },
        },
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onCamera = async type => {
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
        if (type === 'banner') {
          setImageData({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].base64,
            oldImage: '',
          });
        } else {
          setImageDataProduct({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].base64,
            oldImage: '',
          });
        }
      }
    });
  };

  const choseImage = async type => {
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
        if (type === 'banner') {
          setImageData({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].base64,
            oldImage: '',
          });
        } else {
          setImageDataProduct({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].base64,
            oldImage: '',
          });
        }
      }
    });
  };

  const onSubmit = data => {
    const newData = {
      ...data,
      bannerImage: imageData,
      productImage: imageDataProduct,
      status: 0,
    };
    console.log('new Data', newData);
    // setUploadStatus({...uploadStatus, beforSubmit: false});
    axios
      .post(AppUrl.auctionAdd, newData, axiosConfig)
      .then(res => {
        console.log('backend side', res.data);
        setBuffer(false);
        setUploadStatus({...uploadStatus, Submit: false});
        if (res.data.status == 200) {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          setError(res.data.validation_errors);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
    <CustomHeader backFunc={()=>navigation.goBack()}/>
      {buffer && <LoaderComp />}
      <ScrollView style={styles.container}>
        <View style={styles.containerChild}>
          <View style={{padding: 12}}>
            {/* <View style={styles.createPostRow}>
            <Text style={{color: '#fff'}}>Learning Session Title</Text>
          </View> */}

            {/* title start */}
            <View>
              <View>
                <Text style={styles.title}>Title</Text>
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
            </View>
            {/* title end */}
            {/* Keyword start */}
            <View>
              <View>
                <Text style={styles.title}>Keyword</Text>
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
                    placeholder="Enter Keyword"
                    placeholderTextColor="#9e9e9e"
                  />
                )}
                name="keyword"
              />
              {errors.keyword && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* Keyword end */}

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
                name="details"
              />
              {errors.details && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* discription end */}

            {/* base price start */}
            <View>
              <View>
                <Text style={styles.title}>Base Price</Text>
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
                    placeholder="Enter Base Price"
                    placeholderTextColor="#9e9e9e"
                  />
                )}
                name="base_price"
              />
              {errors.base_price && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* base price  end */}

            {/* Date started  */}

            {/* Bidding start  */}
            {/* start date */}
            <DatePicker
              mode="date"
              modal
              open={picDate.start}
              date={startDate}
              onConfirm={date => {
                setStartDate(date);
                setPicDate({start: false});
                setValue('bid_from', date, {required: true});
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
                setValue('bid_to', date, {required: true});
              }}
              onCancel={() => {}}
            />

            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>Bidding Start Date</Text>
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
                {errors.bid_from && (
                  <Text style={{color: 'red', marginLeft: 10}}>
                    This is required.
                  </Text>
                )}
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>Bidding End Date</Text>
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
                {errors.bid_to && (
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

            {/* Bidding start end  */}

            {/* Result Publish started  */}
            <View style={{marginVertical: 8}}>
              <View>
                <Text style={styles.title}>Result Published</Text>
              </View>

              <DatePicker
                mode="date"
                modal
                open={openResult}
                date={dateResult}
                onConfirm={date => {
                  setDateResult(date);
                  setOpenResult(false);
                  setValue('result_date', date, {required: true});
                }}
                onCancel={() => {
                  setOpenResult(false);
                }}
              />
              <TouchableOpacity
                onPress={() => setOpenResult(true)}
                style={styles.createMeetupRow}>
                <Text
                  style={{color: '#9e9e9e', marginHorizontal: 4, fontSize: 13}}>
                  {moment(dateResult).format('LL')}
                </Text>
                <View>
                  <MaterialIcons
                    name="date-range"
                    color={'#ffaa00'}
                    size={15}
                  />
                </View>
              </TouchableOpacity>
              {error?.result_date && (
                <Text style={{color: 'red', marginLeft: 10}}>
                  This is required.
                </Text>
              )}
            </View>

            {/* Result Publish ended  */}
            {/* Product Delivery started  */}
            <View style={{marginVertical: 8}}>
              <View>
                <Text style={styles.title}>Product Delivery</Text>
              </View>

              <DatePicker
                mode="date"
                modal
                open={openDelivery}
                date={dateDelivery}
                onConfirm={date => {
                  setDateDelivery(date);
                  setOpenDelivery(false);
                  setValue('product_delivery_date', date, {required: true});
                }}
                onCancel={() => {
                  setOpenDelivery(false);
                }}
              />
              <TouchableOpacity
                onPress={() => setOpenDelivery(true)}
                style={styles.createMeetupRow}>
                <Text
                  style={{color: '#9e9e9e', marginHorizontal: 4, fontSize: 13}}>
                  {moment(dateDelivery).format('LL')}
                </Text>
                <View>
                  <MaterialIcons
                    name="date-range"
                    color={'#ffaa00'}
                    size={15}
                  />
                </View>
              </TouchableOpacity>
              {error?.product_delivery_date && (
                <Text style={{color: 'red', marginLeft: 10}}>
                  This is required.
                </Text>
              )}
            </View>

            {/* Product Delivery ended  */}

            {/* banner upload start */}
            <View>
              <Text style={styles.title}>Product Image</Text>
            </View>

            <View>
              {imageDataProduct.uri != '' ? (
                <View style={{margin: 5}}>
                  <Image
                    source={{uri: imageDataProduct.uri}}
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
                          onChoose('product');
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
                      Please upload Image first !
                    </Text>
                  )}
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.uploadFileBtn}
                    onPress={() => {
                      onChoose('product');
                    }}>
                    <Entypo name="camera" color={'#ffaa00'} size={15} />
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
            {/* banner upload end */}
            {/* banner upload start */}
            <View>
              <Text style={styles.title}>Banner Image</Text>
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
                          onChoose('banner');
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
                      Please upload Image first !
                    </Text>
                  )}
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.uploadFileBtn}
                    onPress={() => {
                      onChoose('banner');
                    }}>
                    <Entypo name="camera" color={'#ffaa00'} size={15} />
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
            {/* banner upload end */}

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
    </>
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
    borderRadius: 15,
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
    borderRadius: 15,
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
    borderRadius: 12,
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
    borderRadius: 20,
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
    borderRadius: 12,
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
export default AuctionAddProduct;
