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
// create a component
const MarketPlaceAddProduct = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {axiosConfig} = useContext(AuthContext);
  const [timePicker, setTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [imageLoad, setImageLoad] = useState(true);
  const [time, setTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));
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
      description: '',
      unit_price: '',
      total_items: '',
      terms_conditions: '',
      delivery_charge: '',
      tax: '',
      keywords: '',
      image: '',
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

  const onChoose = async () => {
    const permissionStatus = await androidCameraPermission();
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallery', onPress: choseImage},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onCamera = () => {
    console.log('waiting camera comming');
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
        });
      }
    });
  };

  const onSubmit = data => {
    const newData = {
      ...data,
      image: imageData,
    };
    console.log('new Data', newData);
    setUploadStatus({...uploadStatus, beforSubmit: false});
    axios
      .post(AppUrl.createMarketplace, newData, axiosConfig)
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
                name="keywords"
              />
              {errors.keywords && (
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
                <Text style={styles.title}>Terms & Conditions</Text>
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
                    placeholder="Write Terms & Conditions"
                    placeholderTextColor={'#9e9e9e'}
                  />
                )}
                name="terms_conditions"
              />
              {errors.terms_conditions && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                  This is required.
                </Text>
              )}
            </View>
            {/* instruction end */}

            {/* Total Unit Price started  */}
            <View style={{marginVertical: 8}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Total Unit </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Price</Text>
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
                        placeholder="Enter Units"
                        placeholderTextColor={'#9e9e9e'}
                        style={styles.textInputMax}
                      />
                    )}
                    name="total_items"
                  />
                  {errors.total_items && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
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
                        placeholder="Enter Price"
                        placeholderTextColor={'#9e9e9e'}
                        style={styles.textInputMax}
                      />
                    )}
                    name="unit_price"
                  />
                  {errors.unit_price && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
                    </Text>
                  )}
                </View>
              </View>
            </View>
            {/* Total Unit Price ended  */}
            {/* Delivery Tax started  */}
            <View style={{marginVertical: 8}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Delivery Charge </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Tax (%15)</Text>
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
                        placeholder="Enter Delivery"
                        placeholderTextColor={'#9e9e9e'}
                        style={styles.textInputMax}
                      />
                    )}
                    name="delivery_charge"
                  />
                  {errors.delivery_charge && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
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
                        placeholder="Enter Tax"
                        placeholderTextColor={'#9e9e9e'}
                        style={styles.textInputMax}
                      />
                    )}
                    name="tax"
                  />
                  {errors.tax && (
                    <Text style={{color: 'red', marginLeft: 10, marginTop: -7}}>
                      This is required.
                    </Text>
                  )}
                </View>
              </View>
            </View>
            {/* Delivery Tax Price ended  */}

            {/* banner upload start */}
            <View>
              <Text style={styles.title}>Product Image</Text>
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
                        onPress={onChoose}>
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
                    onPress={onChoose}>
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
export default MarketPlaceAddProduct;
