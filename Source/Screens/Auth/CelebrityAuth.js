//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import imagePath from '../../Constants/imagePath';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import AuthNavigationString from '../../Constants/AuthNavigationString';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

// create a component
const CelebrityAuth = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <ScrollView style={{flex: 1}}>
        <ImageBackground
          source={imagePath.background}
          resizeMode="cover"
          style={styles.container}>
          <Image source={imagePath.Top} style={styles.ImgExtra} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // backgroundColor: 'pink',
            }}>
            <View style={styles.header}>
              <Animatable.Image
                animation="pulse"
                iterationCount="infinite"
                source={imagePath.logo}
                style={{height: 180, width: 180}}
              />
            </View>

            <Animatable.View
              animation="slideInUp"
              style={styles.Auth_btn_container}>
              <TouchableOpacity
                onPress={() => navigation.navigate(AuthNavigationString.QRC)}>
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
                  style={styles.AuthBtn}>
                  <Text style={styles.AuthTitle}>Register</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate(AuthNavigationString.LOGIN)}>
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
                  style={styles.AuthBtn}>
                  <Text style={styles.AuthTitle}>Log in</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </View>

          <Image source={imagePath.Bottom} style={styles.bottomImg} />
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
    backgroundColor: '#000',
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
  containerWideScreen: {
    // flex: 1,
    height: windowHeight,
    paddingHorizontal: 150,
  },
  containerTop: {
    width: '100%',
  },

  header: {
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 0.4,
    // backgroundColor: 'pink',
  },

  Auth_btn_container: {
    // justifyContent: 'center',

    // flex: 1,
    // backgroundColor: 'gold',
    alignItems: 'center',
    marginTop: 20,
  },

  AuthBtn: {
    // backgroundColor: '#D4AF37',
    borderWidth: 1,
    width: 200,

    // borderColor: "#D4AF37",
    borderRadius: 10,
    paddingHorizontal: 55,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  AuthTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomImg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 180,
  },
});

export default CelebrityAuth;
