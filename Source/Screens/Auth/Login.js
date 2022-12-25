//import liraries
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoaderComp from '../../Components/LoaderComp';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import LinearGradient from 'react-native-linear-gradient';
// import AppUrl from '../../RestApi/AppUrl';
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// create a component
const Login = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const {authContext} = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [buffer, setBuffer] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(true);

  const HandelLogin = () => {
    setBuffer(true);

    if (email != null || pass != null) {
      const data = {
        email: email,
        password: pass,
      };

      axios
        .post(AppUrl.SuperStarLogin, data)
        .then(res => {
          //console.log(res.data)
          if (res.data.status === 200) {
            setBuffer(false);
            authContext.signIn(res.data, res.data.user);
            authContext.demoLogin();
          } else {
            setBuffer(false);
            setError('user and password not match !!');
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
    } else {
      setError('All field required !!');
      setBuffer(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      {buffer ? <LoaderComp /> : <></>}
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View>
          <KeyboardAwareScrollView>
            <ImageBackground
              source={imagePath.background}
              resizeMode="stretch"
              style={styles.container}>
              <Image source={imagePath.Top} style={styles.ImgExtra} />

              <View style={styles.header}>
                <Animatable.Image
                  animation="pulse"
                  iterationCount="infinite"
                  // duration="1500"
                  source={imagePath.logo}
                  style={{height: 150, width: 150, marginBottom: 40}}
                />
              </View>

              <Animatable.View style={styles.footerBody} animation="slideInUp">
                <View style={styles.footer}>
                  <Text style={styles.title}>
                    Welcome To{'\n'}Hello Super Stars
                  </Text>

                  <View style={styles.InputZ}>
                    {/* email input */}
                    <View style={styles.input}>
                      <Icon
                        name="user"
                        color={'#ffaa00'}
                        size={25}
                        style={styles.Icon}
                      />
                      <TextInput
                        placeholder="Your Email"
                        style={styles.input_fild}
                        placeholderTextColor="#9e9e9e"
                        onChangeText={newText => setEmail(newText)}
                      />
                    </View>
                    <Text style={{color: 'red', marginLeft: 25}}>{error}</Text>

                    {/* password input */}
                    <View style={styles.input}>
                      <Icon
                        name="lock"
                        color={'#ffaa00'}
                        size={25}
                        style={styles.Icon}
                      />
                      <TextInput
                        placeholder="******"
                        style={styles.input_fild}
                        placeholderTextColor="#9e9e9e"
                        secureTextEntry={showPass}
                        onChangeText={newText => setPass(newText)}
                      />
                      <TouchableOpacity
                        style={
                          windowWidth > 600
                            ? styles.password
                            : styles.passwordSmall
                        }
                        onPress={() => setShowPass(!showPass)}>
                        {showPass ? (
                          <Entypo
                            name="eye-with-line"
                            size={25}
                            color={'#ffaa00'}
                          />
                        ) : (
                          <Entypo name="eye" size={25} color={'#ffaa00'} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* button */}

                  <View style={styles.Login_btn_container}>
                    <TouchableOpacity onPress={() => HandelLogin()}>
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
                        style={styles.login_btn}>
                        <View>
                          <Text style={styles.input_title}>LOGIN</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animatable.View>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
  },
  ImgExtra: {
    resizeMode: 'stretch',
    width: '100%',
    height: 180,
  },
  Icon: {
    marginTop: 8,
  },
  password: {
    marginTop: 8,
    marginLeft: '15%',
  },
  passwordSmall: {
    marginTop: 8,
    marginLeft: '5%',
  },
  containerTop: {
    width: '100%',
  },
  containerWideScreen: {
    flex: 1,
    height: windowHeight,
    paddingHorizontal: 150,
  },

  InputZ: {
    justifyContent: 'center',
    // alignItems:'center',
    marginTop: 30,
  },
  input: {
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 20,
    height: windowWidth > 600 ? 80 : 40,
    borderRadius: 10,
    paddingLeft: 16,
    // marginTop: 10,
    color: '#ffaa00',
    backgroundColor: '#121212',

    fontSize: 16,
    borderColor: '#DDA35796',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
  },

  input_fild: {
    marginLeft: 10,
    color: '#ffaa00',
    height: windowWidth > 600 ? 70 : 40,
    width: '75%',

    // backgroundColor: 'blue',
    alignItems: 'center',
    fontSize: windowWidth > 600 ? 20 : 13,
  },
  // inputText: {
  //   marginTop: 20,
  //   marginLeft: 5,
  //   color: '#ffaa00',
  // },
  input_title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  header: {
    // flex: 3,
    justifyContent: 'center',

    alignItems: 'center',
  },

  footerBody: {
    // flex: 4,

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
    width: windowWidth > 600 ? '75%' : '90%',
  },

  title: {
    color: '#ffaa00',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  Login_btn_container: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  login_btn: {
    borderWidth: 1,

    borderRadius: 10,
    paddingHorizontal: 20,
    width: 200,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
});

//make this component available to the app
export default Login;
