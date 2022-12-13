/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import {useNavigation} from '@react-navigation/native';
import {androidCameraPermission} from '../../../permission';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-player';
import CustomHeader from '../../Components/CustomHeader';
const PostCreate = ({route}) => {
  const {setRefresh, refresh} = route.params;

  console.log(refresh);
  const [pick, setPick] = React.useState('');
  const [bannerOrVideo, setBannerOrVideo] = React.useState('Banner');
  const [freeShow, setFreeShow] = React.useState(true);
  const [paidShow, setPaidShow] = React.useState(null);
  const [fileShow, setFileShow] = React.useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [amount, setAmount] = useState(0);
  const {axiosConfig} = useContext(AuthContext);
  const navigation = useNavigation();

  const [imageData, setImageData] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const cameraOrGallery = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCameraClick},
        {text: 'Gallery', onPress: choseImage},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
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
  const cameraOrGalleryThumbnail = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCameraClickThumbnail},
        {text: 'Gallery', onPress: choseThumbnail},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onCameraClickThumbnail = async () => {
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
        setThumbnail({
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
  const choseThumbnail = async () => {
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
        setThumbnail({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          data: response.assets[0].base64,
          oldImage: '',
        });
      }
    });
  };
  const onChooseVideo = async () => {
    const permissionStatus = await androidCameraPermission();
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Content', 'Choose an option', [
        {text: 'Camera', onPress: onCameraVideo},
        {text: 'Gallery', onPress: choseVideo},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const choseVideo = async () => {
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
          setVideo({
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
  const onCameraVideo = async () => {
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
          setVideo({
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

  const handleConfirm = () => {
    if (!title || !description) {
      return setHasError(true);
    }
    console.log('try');
    const data = {
      title,
      description,
      fee: amount,
      type: paidShow ? 'paid' : 'free',
      image: imageData,
      video: video,
      thumbnail: thumbnail,
    };
    console.log(data);
    axios
      .post(AppUrl.simplePostAdd, data, axiosConfig)
      .then(res => {
        console.log(res.data);
        ToastAndroid.show('done', ToastAndroid.SHORT);
        setRefresh(1);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err.message);
      });
    console.log(data);
  };

  return (
    <>
     <CustomHeader title='Post' backFunc={()=>navigation.goBack()} />
    <ScrollView style={styles.container}>
      <View>
        <View
          style={{
            padding: 12,
            margin: 15,
            backgroundColor: '#181819',
            borderRadius: 20,
          }}>
          {freeShow && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setPaidShow(false)}
                style={!paidShow ? styles.freeBtnActive : styles.freeBtn}>
                <Text
                  style={!paidShow ? {color: '#9e9e9e'} : {color: '#9e9e9e'}}>
                  Free
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaidShow(true)}
                style={paidShow ? styles.freeBtnActive : styles.freeBtn}>
                <Text style={{color: '#9e9e9e'}}>Paid</Text>
              </TouchableOpacity>
            </View>
          )}

          <>
            <View>
              <TextInput
                style={styles.createPostRow}
                placeholder="Post Title"
                placeholderTextColor={'#9e9e9e'}
                onChangeText={setTitle}
                value={title}
              />
              {hasError && !title && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: 5}}>
                  Title Required
                </Text>
              )}
            </View>
            <View>
              <TextInput
                style={styles.createPostDescription}
                multiline={true}
                placeholder="Post Description"
                placeholderTextColor={'#9e9e9e'}
                onChangeText={setDescription}
                value={description}
              />
              {hasError && !description && (
                <Text style={{color: 'red', marginLeft: 10, marginTop: 5}}>
                  Description Required
                </Text>
              )}
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'stretch',
                borderWidth: 1,
                height: 40,
                borderColor: '#ffad00',
                borderRadius: 10,
                marginVertical: 10,
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
                <Picker.Item label="Image" value="Banner" />
                <Picker.Item label="Video" value="Video" />
              </Picker>
            </View>

            {bannerOrVideo === 'Banner' ? (
              <View style={styles.uploadFile}>
                {!imageData ? (
                  <TouchableOpacity
                    style={styles.uploadFileBtn}
                    onPress={cameraOrGallery}>
                    <Entypo name="image" color={'#ffaa00'} size={15} />
                    {pick ? (
                      <Image style={{height: 300, width: 300}} source={pick} />
                    ) : (
                      <Text style={{color: '#9e9e9e', paddingLeft: 8}}>
                        Upload Image
                      </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={{uri: imageData.uri}}
                    style={{height: 130, width: '100%', borderRadius: 10}}
                  />
                )}
              </View>
            ) : (
              <View style={styles.uploadFile}>
                {video ? (
                  <View style={{width: '50%'}}>
                    <VideoPlayer
                      video={{
                        uri: `${video.uri}`,
                      }}
                      videoWidth={140}
                      videoHeight={100}
                      thumbnail={{
                        uri: thumbnail?.uri,
                      }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadFileBtn}
                    onPress={onChooseVideo}>
                    <Entypo name="video-camera" color={'#ffaa00'} size={15} />
                    {fileShow ? (
                      <Text style={{color: '#9e9e9e', paddingLeft: 8}}>
                        {fileShow}
                      </Text>
                    ) : (
                      <Text style={{color: '#9e9e9e', paddingLeft: 8}}>
                        Upload Video
                      </Text>
                    )}
                  </TouchableOpacity>
                )}

                {!thumbnail ? (
                  <TouchableOpacity
                    style={styles.uploadFileBtn}
                    onPress={cameraOrGalleryThumbnail}>
                    <Entypo name="image" color={'#ffaa00'} size={15} />
                    {pick ? (
                      <Image style={{height: 300, width: 300}} source={pick} />
                    ) : (
                      <Text style={{color: '#9e9e9e', paddingLeft: 8}}>
                        Upload Thumbnail
                      </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={{uri: thumbnail.uri}}
                    style={{height: 130, width: '50%', borderRadius: 10}}
                  />
                )}
              </View>
            )}

            {paidShow ? (
              <View>
                <TextInput
                  style={styles.createPostRow}
                  placeholder="Enter Amount"
                  placeholderTextColor={'#9e9e9e'}
                  onChangeText={setAmount}
                  value={amount}
                />
              </View>
            ) : null}

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.removeBtn}>
                <Text style={{fontSize: 13, color: 'white'}}>REMOVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleConfirm}>
                <Text style={{fontSize: 13, color: 'white'}}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </>
        </View>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  createPostRow: {
    backgroundColor: '#121212',
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
    color: '#fff',
  },
  createPostTitleDollar: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#121212',
    alignItems: 'center',
    color: 'white',
    borderWidth: 0.5,
    borderColor: '#ffaa00',
    borderRadius: 20,
    padding: 10,
  },
  createPostDescription: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 0.5,
    borderColor: '#ffaa00',
    borderRadius: 20,
    backgroundColor: '#121212',
    padding: 10,
    minHeight: 80,
  },
  uploadFile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadFileBtn: {
    width: '47%',
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 0.5,
    backgroundColor: '#121212',
    borderColor: '#ffaa00',
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#2A2B2E',
    borderRadius: 20,
    width: '47%',
    height: 40,
    marginTop: 30,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    width: '47%',
    backgroundColor: '#1D90F4',
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  freeBtn: {
    width: '47%',
    height: 40,
    marginTop: 8,
    marginBottom: 8,
    borderColor: '#ffaa00',
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  freeBtnActive: {
    width: '47%',
    height: 40,
    marginTop: 8,
    marginBottom: 8,
    borderColor: '#ffad00',
    backgroundColor: '#2A2B2E',
    color: '#ddd',
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostCreate;
