//import liraries
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
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
    <>
      {buffer ? <LoaderComp /> : <></>}
      <KeyboardAwareScrollView>
        <ImageBackground
          source={imagePath.background}
          resizeMode="cover"
          style={
            windowWidth > 600 ? styles.containerWideScreen : styles.container
          }>
          <Image
            source={imagePath.Top}
            style={windowWidth > 600 ? styles.containerTop : styles.Top}
          />

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
                    size={20}
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
                    size={20}
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
                    style={styles.password}
                    onPress={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <Entypo
                        name="eye-with-line"
                        size={20}
                        color={'#ffaa00'}
                      />
                    ) : (
                      <Entypo name="eye" size={20} color={'#ffaa00'} />
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
    </>
  );
};

const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
  },
  Icon: {
    marginTop: 8,
  },
  password: {
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
    flex: 3,
    justifyContent: 'center',
    top: -120,
    alignItems: 'center',
  },

  footerBody: {
    flex: 4,
    top: -120,
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
    width: '90%',
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
    width: 300,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
});

//make this component available to the app
export default Login;
