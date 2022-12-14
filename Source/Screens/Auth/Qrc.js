import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import imagePath from '../../Constants/imagePath';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';

import QRCodeScanner from 'react-native-qrcode-scanner';

import {RNCamera} from 'react-native-camera';
import AppUrl from '../../RestApi/AppUrl';
import AuthNavigationString from '../../Constants/AuthNavigationString';
import {ScrollView} from 'react-native-gesture-handler';

const Qrc = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const qrcodeRef = useRef(null);
  const [link, setLink] = useState('');
  const [buffer, setBuffer] = useState(false);

  const HandelQrcVerfify = otp => {
    setBuffer(true);
    const data = {
      qr_code: otp,
    };

    axios
      .post(AppUrl.QrVerification, data)
      .then(res => {
        setBuffer(false);
        if (res.data.status === 200) {
          Toast.show(res.data.message, Toast.durations.SHORT);
          navigation.navigate(AuthNavigationString.SIGNUP, {
            authId: res.data.star_id,
          });
        } else {
          Toast.show(res.data.message, Toast.durations.SHORT);
        }
      })
      .catch(err => {
        Toast.show(
          'Network Problem, Check you Internet',
          Toast.durations.SHORT,
        );
        setBuffer(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
      <ScrollView style={{height: '100%'}}>
        <ImageBackground
          source={imagePath.background}
          resizeMode="cover"
          style={styles.container}>
          <Image source={imagePath.Top} style={styles.ImgExtra} />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.header}>
              <Animatable.Image
                animation="pulse"
                iterationCount="infinite"
                source={imagePath.logo}
                style={{height: 150, width: 150}}
              />
            </View>

            <Animatable.View style={styles.footerBody} animation="slideInUp">
              <View style={styles.footer}>
                <Text style={styles.title}>Scan QR Code</Text>
                <Text style={styles.TextDes}>
                  Please scan the QR code provided to you !
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'gold',
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  {link}
                </Text>
                <View style={styles.QRImg}>
                  <QRCodeScanner
                    cameraContainerStyle={{
                      width: windowWidth > 600 ? 380 : 200,
                      height: windowWidth > 600 ? 300 : 220,
                      alignSelf: 'center',
                    }}
                    cameraStyle={{
                      width: windowWidth > 600 ? 380 : 200,
                      height: 220,
                      alignSelf: 'center',
                    }}
                    ref={qrcodeRef}
                    onRead={({data}) => HandelQrcVerfify(data)}
                    flasMode={RNCamera.Constants.FlashMode.off}
                  />
                </View>
              </View>
            </Animatable.View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: windowHeight,
  },
  ImgExtra: {
    resizeMode: 'stretch',
    width: '100%',
    height: 180,
    position: 'absolute',
  },
  Icon: {
    marginTop: 8,
  },
  password: {
    marginTop: 8,
    marginLeft: '5%',
  },
  containerWideScreen: {
    // flex: 1,
  },
  containerTop: {
    width: '100%',
  },

  InputZ: {
    justifyContent: 'center',
    // alignItems:'center',
    marginTop: 30,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    marginHorizontal: 20,
    height: 40,
    borderRadius: 10,
    paddingLeft: 16,
    marginTop: 10,
    color: '#ffaa00',
    backgroundColor: '#121212',
    borderWidth: 1,
    fontSize: 16,
    borderColor: '#DDA35796',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  input_fild: {
    marginLeft: 10,
    color: '#ffaa00',
    height: 40,
    width: '76%',
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#ffaa00',
  },
  input_title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  header: {
    // backgroundColor:'green',
    justifyContent: 'center',

    alignItems: 'center',
  },

  footerBody: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  footer: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.212)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffaa00',
    width: '80%',
    marginTop: 20,
    // height: 450,
    // marginTop: -100,
  },

  title: {
    color: '#ffaa00',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  Login_btn_container: {
    marginTop: -55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  SCAn_btn: {
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '75%',
    paddingVertical: 8,

    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  Scan_title: {
    color: '#ffaa00',
    fontWeight: 'bold',
    fontSize: 20,
  },
  QRcamera: {
    width: 20,
    height: 18,
  },
  TextDes: {
    color: '#ffaa00',
    textAlign: 'center',
    paddingVertical: 1,
    fontSize: 13,
    paddingHorizontal: 20,
  },
  QRImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },

  QRIcon: {
    marginTop: 30,
    width: 185,
    height: 140,
    marginBottom: 20,
  },
});

//make this component available to the app
export default Qrc;
