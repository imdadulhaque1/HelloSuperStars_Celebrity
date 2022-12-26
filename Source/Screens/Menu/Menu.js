import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import React, {useContext, useEffect, useState} from 'react';
import imagePath from '../../Constants/imagePath';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {androidCameraPermission} from '../../../permission';
import MainNavigationString from '../../Constants/MainNavigationString';
import {AuthContext} from '../../Constants/context';
import CustomHeader from '../../Components/CustomHeader';
import AppUrl from '../../RestApi/AppUrl';
import CropImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const Menu = ({navigation}) => {
  const [imgSrc, setImgSrc] = useState('');

  const [profileUpload, setProfileUpload] = useState({
    img: {
      uri: '',
      type: '',
      name: '',
      data: '',
      oldImage: '',
      for: '',
    },
  });
  const [coverUpload, setCoverUpload] = useState({
    img: {
      uri: '',
      type: '',
      name: '',
      data: '',
      oldImage: '',
      for: '',
    },
  });

  const {authContext, axiosConfig} = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log(AppUrl.getInformation);
    axios
      .get(AppUrl.getInformation, axiosConfig)
      .then(res => {
        setUserInfo(res.data.user);
      })
      .catch(err => {
        Toast.show(err.message, Toast.durations.SHORT);
        console.log(err);
      });
  }, [refresh]);

  const onSelectImage = async type => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Your Picture', 'Choose an option', [
        {
          text: 'Camera',
          onPress: () => {
            onCamera(type);
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            onGallery(type);
          },
        },
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onCamera = type => {
    CropImagePicker.openCamera(
      type === 'cover'
        ? {
            width: 300,
            height: 170,
            cropping: true,
          }
        : {
            width: 300,
            height: 300,
            cropping: true,
          },
    ).then(image => {
      RNFS.readFile(image.path, 'base64').then(res => {
        type === 'cover'
          ? setCoverUpload({
              img: {
                uri: image.path,
                type: image.mime,
                data: res,
                oldImage: userInfo.image,
                for: 'cover',
              },
            })
          : setProfileUpload({
              img: {
                uri: image.path,
                type: image.mime,
                data: res,
                oldImage: userInfo.image,
                for: 'profile',
              },
            });
      });
    });
  };

  const onGallery = type => {
    CropImagePicker.openPicker(
      type === 'cover'
        ? {
            width: 300,
            height: 170,
            cropping: true,
          }
        : {
            width: 300,
            height: 300,
            cropping: true,
          },
    ).then(image => {
      RNFS.readFile(image.path, 'base64').then(res => {
        type === 'cover'
          ? setCoverUpload({
              img: {
                uri: image.path,
                type: image.mime,
                data: res,
                oldImage: userInfo.image,
                for: 'cover',
              },
            })
          : setProfileUpload({
              img: {
                uri: image.path,
                type: image.mime,
                data: res,
                oldImage: userInfo.image,
                for: 'profile',
              },
            });
      });
    });
  };
  /**
   * state clear
   */
  const clearPhoto = () => {
    setProfileUpload({
      img: {
        uri: '',
        type: '',
        name: '',
        data: '',
        oldImage: '',
        for: '',
      },
    });
  };

  const clearCover = () => {
    setCoverUpload({
      img: {
        uri: '',
        type: '',
        name: '',
        data: '',
        oldImage: '',
        for: '',
      },
    });
  };
  const handleUpload = type => {
    console.log('upload start');
    let data;
    if (type === 'profile') {
      data = profileUpload;
    } else {
      data = coverUpload;
    }
    axios
      .post(AppUrl.UserMediaUpload, data, axiosConfig)
      .then(res => {
        if (res.data.status == 200) {
          Toast.show(res.data.message, Toast.durations.SHORT);
          console.log('uplad status', res.data);
          if (type === 'profile') {
            clearPhoto();
            setRefresh(previous => (previous ? false : true));
          } else {
            clearCover();
            setRefresh(previous => (previous ? false : true));
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  function backFunc() {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <CustomHeader backFunc={backFunc} title="Menu" />
      <ScrollView style={styles.container}>
        {/* ==============cover photo section==============  */}

        <View style={{position: 'relative'}}>
          <View style={styles.coverphotoSection}>
            <Image
              source={
                coverUpload.img.uri != ''
                  ? {uri: coverUpload.img.uri}
                  : {uri: `${AppUrl.MediaBaseUrl}${userInfo?.cover_photo}`}
              }
              style={styles.menuCoverPhoto}
            />

            <TouchableOpacity
              onPress={
                coverUpload.img.uri === ''
                  ? () => {
                      onSelectImage('cover');
                    }
                  : () => {
                      handleUpload('cover');
                    }
              }
              style={{
                color: 'white',
                position: 'absolute',
                right: '2%',
                bottom: 10,
              }}>
              {coverUpload.img.uri === '' ? (
                <MaterialIcons
                  name="camera-alt"
                  // name =
                  size={20}
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.8,
                    borderRadius: 100,
                    padding: 2,
                  }}
                />
              ) : (
                <MaterialIcons
                  name="save"
                  // name =
                  size={20}
                  style={{
                    backgroundColor: 'black',
                    opacity: 0.8,
                    borderRadius: 100,
                    padding: 2,
                    color: 'white',
                  }}
                />
              )}
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={
                coverUpload.img.uri === ''
                  ? () => {
                      onSelectImage('cover');
                    }
                  : () => {
                      handleUpload('cover');
                    }
              }
              style={{
                color: 'white',
                position: 'absolute',
                right: '2%',
                bottom: 10,
              }}>
              <MaterialIcons
                name="camera-alt"
                size={20}
                style={{
                  backgroundColor: 'white',
                  opacity: 0.8,
                  borderRadius: 100,
                  padding: 2,
                }}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.profileImage}>
            <Image
              source={
                profileUpload.img.uri != ''
                  ? {uri: profileUpload.img.uri}
                  : {uri: `${AppUrl.MediaBaseUrl}${userInfo?.image}`}
              }
              style={{height: '100%', width: '100%', borderRadius: 100}}
            />
            <TouchableOpacity
              onPress={
                profileUpload.img.uri === ''
                  ? () => {
                      onSelectImage('profile');
                    }
                  : () => {
                      handleUpload('profile');
                    }
              }
              style={{
                color: 'white',
                position: 'absolute',
                right: '2%',
                bottom: 10,
              }}>
              {profileUpload.img.uri === '' ? (
                <MaterialIcons
                  name="camera-alt"
                  // name =
                  size={20}
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.8,
                    borderRadius: 100,
                    padding: 2,
                  }}
                />
              ) : (
                <MaterialIcons
                  name="save"
                  // name =
                  size={20}
                  style={{
                    backgroundColor: 'black',
                    opacity: 0.8,
                    borderRadius: 100,
                    padding: 2,
                    color: 'white',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* ==============cover photo section==============  */}

        {/*============= Menu section==============  */}
        <View
          style={{marginTop: '10%', marginHorizontal: 10, marginBottom: 10}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>
            {userInfo?.first_name + ' ' + userInfo?.last_name}
          </Text>
          <Text style={{color: '#ffaa00', textAlign: 'center', fontSize: 12}}>
            Super Star
          </Text>

          {/* <View style={{ backgroundColor: '#022964', marginVertical: 10, height: 180, borderRadius: 20, flexDirection: 'column', }}>
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}> SHAKIB AL HASAN </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', color: '#ffaa00' }}> $8,450.00 </Text>
            <Text style={{ color: 'white', fontSize: 14 }}> Total Balance </Text>
          </View>

          <TouchableOpacity style={{ margin: 10,backgroundColor:'#ffaa00',borderRadius:10 }}>
            <Text style={{ textAlign: 'center',  fontSize: 15, color: 'white',padding:4 }}>Wallet Details</Text>
          </TouchableOpacity>
         

        </View> */}

          {/* <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate(MainNavigationString.WALLET)}
              style={{
                margin: 5,
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: '#343434',
              }}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    borderRadius: 30,
                    marginLeft: 20,
                  }}>
                  <Ionicons name="wallet-sharp" size={18} color="#000" />
                </LinearGradient>

                <View style={{justifyContent: 'center', marginLeft: 10}}>
                  <Text style={{color: 'white', fontSize: 13}}>Wallet</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View> */}

          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate(MainNavigationString.SCHEDULE)}
              style={{
                margin: 5,
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: '#343434',
              }}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    borderRadius: 30,
                    marginLeft: 20,
                  }}>
                  <Ionicons name="ios-calendar" size={18} color="#000" />
                </LinearGradient>

                <View style={{justifyContent: 'center', marginLeft: 10}}>
                  <Text style={{color: 'white', fontSize: 13}}>Schedule</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainNavigationString.SETTING, {setRefresh})
              }
              style={{
                margin: 5,
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: '#343434',
              }}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    borderRadius: 30,
                    marginLeft: 20,
                  }}>
                  <MaterialIcons name="settings" size={18} color="#000" />
                </LinearGradient>

                <View style={{justifyContent: 'center', marginLeft: 10}}>
                  <Text style={{color: 'white', fontSize: 13}}>Settings</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*============= Menu section==============  */}

        {/*============== Logout section ============== */}

        <TouchableOpacity
          style={{margin: 15}}
          onPress={() => authContext.signOut()}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
            style={{
              margin: 5,
              alignItems: 'center',
              backgroundColor: 'black',
              justifyContent: 'center',
              borderRadius: 30,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              Logout
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {/*============== Logout section ============== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  coverphotoSection: {
    margin: 10,
    height: 160,
    borderRadius: 10,
  },
  menuCoverPhoto: {height: '100%', width: '100%', borderRadius: 20},
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    position: 'absolute',
    bottom: -30,
    left: '40%',
  },
});
