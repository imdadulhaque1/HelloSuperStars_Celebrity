/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
//import liraries
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import imagePath from '../../Constants/imagePath';
import React, {useRef, useEffect, useState, useContext} from 'react';
import MainNavigationString from '../../Constants/MainNavigationString';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../Constants/context';
import AppUrl from '../../RestApi/AppUrl';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import axios from 'axios';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import CustomHeader from '../CustomHeader';
// create a component
const ReuseApproved = ({route}) => {
  let {typeName, path = null, module = null} = route.params;
  const {axiosConfig} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  const windowWidth = Dimensions.get('window').width;
  const Navigation = useNavigation();
  const animation = useRef(null);

  let deadline = 'august, 06, 2022';

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [buffer, setBuffer] = useState(true);
  const [eventData, setEventData] = useState([]);

  const leading0 = num => {
    return num < 10 ? '0' + num : num;
  };

  const getTimeUntil = deadline => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    // console.log(time);
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  // useEffect(() => {
  //   // setInterval(() => getTimeUntil(deadline), 1000);

  //   return () => getTimeUntil(deadline);
  // }, [deadline]);
  useEffect(() => {
    getAllEventdta();
  }, []);

  const getAllEventdta = () => {
    if (path) {
      console.log('path', path);
      axios
        .get(path, axiosConfig)
        .then(res => {
          console.log(res);
          setBuffer(false);
          if (res.data.status == 200) {
            setEventData(res.data.events);
          }
        })
        .catch(err => {
          setBuffer(false);
          Toast.show(err.message, Toast.durations.SHORT);
          console.log(err);
        });
    }
  };

  const cardList = (eventData, index) => {
    const HtmlDiscription = {
      html: `<div style='color:#e6e6e6'>${eventData?.description}</div>`,
    };
    return (
   <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
       <View style={{backgroundColor: '#000', flex: 1}} key={eventData.id}>
        <CustomHeader backFunc={() => Navigation.goBack()} />
        <Animatable.View
          style={windowWidth > 700 ? styles.CardRowWidscreen : styles.CardRow}
          animation="slideInDown">
          <View style={styles.CardContent}>
            {eventData.status === 2 && (
              <View
                style={{
                  backgroundColor: '#FFAD00',
                  width: 50,
                  position: 'absolute',
                  right: 10,
                  alignItems: 'center',
                  borderBottomRightRadius: 10,
                  paddingHorizontal: 5,
                }}>
                <FontAwesome name="flag-o" size={25} color="black" />
                <Text style={{color: 'black'}}>Live</Text>
              </View>
            )}
            <View style={{position: 'relative'}}>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: '#E3E5EA',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {/* Shakib {typeName} */}
                  {eventData?.star?.first_name +
                    '' +
                    eventData?.star?.last_name}
                </Text>
                <Text style={{color: 'gray'}}>
                  {moment(eventData.created_at).format('LL')}
                </Text>
              </View>
              <View style={{marginBottom: 3}}>
                <Text style={{fontSize: 20, color: '#fff'}}>
                  {eventData.title}
                </Text>
                <RenderHtml contentWidth={width} source={HtmlDiscription} />
              </View>

              <ImageBackground
                style={styles.background}
                source={
                  eventData.banner
                    ? {uri: `${AppUrl.MediaBaseUrl + eventData.banner}`}
                    : imagePath.defultCover
                }>
                <View></View>
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
                  style={styles.linearGradient}>
                  <View style={styles.learningRow}>
                    <View style={styles.singleLearningStyle}>
                      <Image source={imagePath.clock} />
                    </View>
                    <View style={styles.singleLearningStyle}>
                      <Text style={styles.text}>Day</Text>
                      <Text style={styles.text}>{leading0(days)}</Text>
                    </View>
                    <View style={styles.singleLearningStyle}>
                      <Text style={styles.text}>Hrs</Text>
                      <Text style={styles.text}>{leading0(hours)}</Text>
                    </View>
                    <View style={styles.singleLearningStyle}>
                      <Text style={styles.text}>Min</Text>
                      <Text style={styles.text}>{leading0(minutes)}</Text>
                    </View>
                    <View style={styles.singleLearningStyle}>
                      <Text style={styles.text}>Sec</Text>
                      <Text style={styles.text}>{leading0(seconds)}</Text>
                    </View>
                  </View>
                </LinearGradient>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#00000099',
                  }}></View>
              </ImageBackground>
            </View>
            {/* l;;;;;;  */}

            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.touchableOpacityBtn}
                onPress={() =>
                  Navigation.navigate(MainNavigationString.COMPLETEDCARD, {
                    typeName,
                    eventData,
                    module,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '80%',
                    }}>
                    <Text
                      style={{
                        marginHorizontal: 3,

                        color: 'black',
                      }}>
                      View
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '20%',
                    }}>
                    <Icon name="arrow-forward-ios" color={'black'} size={15} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View />
          </View>
        </Animatable.View>
      </View>
   </SafeAreaView>
    );
  };
  console.log(eventData.length);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {buffer ? (
            [1, 2, 3].map(() => <CardSkeleton />)
          ) : (
            <>
              {eventData.length != 0 ? (
                eventData.map((item, index) => {
                  return cardList(item, index);
                })
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 700,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Animatable.Image
                    source={imagePath.EmptyImage}
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 100,
                      opacity: 0.5,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      opacity: 0.5,
                      marginTop: 10,
                    }}>
                    Oops empty !
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topContainer: {
    flex: 1.5,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 300,
  },
  postContainer: {
    flex: 2,
    backgroundColor: 'rgb(37, 37, 37)',
  },
  banner: {
    flex: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFAD00',
    minHeight: 70,
  },
  bannerImage: {
    height: '100%',
  },
  profileImageContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 5,
  },
  postNavigator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  ProfileOption: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ProfileItem: {
    width: '23%',
    backgroundColor: '#282828',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileItemActive: {
    width: '23%',
    backgroundColor: '#FFAD00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileItemText: {
    fontSize: 11,
    paddingTop: 5,
    color: 'white',
  },
  ProfileItemTextActive: {
    fontSize: 11,
    paddingTop: 5,
    color: '#171717',
  },
  proImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFAD00',
  },

  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#FFAD00'
  },
  title: {
    fontSize: 19,
    color: 'white',
    // color: '#00000'
  },
  active: {
    color: '#FFAD00',
  },
  CardRow: {
    margin: 10,
    //marginHorizontal: 80,
  },
  CardRowWidscreen: {
    margin: 10,
    marginHorizontal: 90,
  },
  MainCard: {
    padding: 5,
    backgroundColor: '#343434',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  CardContent: {
    padding: 5,
    backgroundColor: '#343434',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  cardText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: 3,
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 34,
    width: 34,
    borderRadius: 50,
  },
  cardContentText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    margin: 0,
    paddingLeft: 5,
    color: '#AEAEAE',
  },
  cardCoverImg: {
    height: 180,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  cardCoverImgWithScreen: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
    backgroundColor: '#474747',
    marginTop: 9,
    borderRadius: 3,
  },
  likeBtn: {
    //backgroundColor: '#FFAD00',
    borderRadius: 50,
    marginVertical: 3,
  },
  btnText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: 'black',
    fontSize: 13,
  },
  cardInfo: {
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: 'white',
    fontSize: 13,
    margin: 3,
    marginTop: 4,
  },
  icon: {
    marginHorizontal: 10,
  },

  lessText: {
    height: 90,
    overflow: 'hidden',
    color: '#ddd',
  },

  // Meet up cards
  mainMeetUpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  meetupBtn: {
    backgroundColor: '#FFAD00',
    justifyContent: 'center',
    margin: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
    paddingVertical: 5,
  },
  meetupTxt: {
    color: 'brown',
    fontWeight: 'bold',
  },

  // Learn Card
  LearnCardRow: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#FFAD00',
  },
  LearnCoverImg: {
    height: 180,
    width: '100%',
    borderRadius: 5,
  },
  mainLearnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingVertical: 12,
    backgroundColor: 'black',
    opacity: 1,
  },

  LearnBtn: {
    backgroundColor: 'green',
    justifyContent: 'center',
    margin: 3,
    paddingHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 5,
  },
  LearnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },

  LearnFooter: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  TimeHead: {
    backgroundColor: '#FDFFCF',
    position: 'absolute',
    margin: 5,
    flexDirection: 'row',
    borderRadius: 5,
  },
  TimeText: {
    color: '#ED9B52',
    margin: 5,
    paddingEnd: 5,
  },

  LearnTimeImg: {
    height: 20,
    width: 20,
    borderRadius: 5,
    margin: 5,
  },

  // Upcoming Audition

  BannerCardImg: {
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // cardCoverImg:{
  //     position: 'relative',
  // },
  TextBanner: {
    fontSize: 20,
    color: '#F6EA45',
    fontWeight: 'bold',
    paddingVertical: 3,
  },

  BannerCs: {
    position: 'absolute',
    backgroundColor: '#00000099',
    borderRadius: 10,
    paddingHorizontal: 5,
    // opacity: 0.80,
    borderWidth: 1,
    borderColor: '#024E8C',
    top: '50%',
    left: '25%',
    flexDirection: 'row',
  },

  BannerCsText: {
    color: '#FDDC00',
    paddingTop: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },

  SText: {
    paddingHorizontal: 2,
    paddingVertical: 5,
  },

  starCardImgA: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  starCardImg: {
    paddingTop: 15,
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 0.2,
    borderColor: 'white',
  },

  mainMeetUpViewA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.9,
  },

  BannerCse: {
    backgroundColor: '#00000099',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#024E8C',
    flexDirection: 'row',
  },
  BannerCseText: {
    color: '#FDDC00',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  touchableOpacityBtn: {
    backgroundColor: '#CBE6D5',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: 90,
    textAlign: 'center',
  },
  bannerTitle: {
    margin: 8,
    backgroundColor: '#343434',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  singleLearningStyle: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,

    // padding: 10,
  },
  linearGradient: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  learningRow: {
    flexDirection: 'row',
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundOneText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roundText: {
    backgroundRadius: 50,
  },
  resizeImage: {
    // width: 50h
    height: 40,
  },
  listParent: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#343434',
    padding: 5,
    borderRadius: 20,
  },
  listParentCopy: {
    // flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: '#343434',
    padding: '8%',
    borderRadius: 20,
  },
  onLeft: {
    flex: 1,
  },
  participationText: {
    color: '#ffad00',
    fontSize: 17,
  },
  middleOne: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textColor: {
    color: '#ddd',
    textAlign: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageBg: {
    flexDirection: 'row',
  },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'gold',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeBgColor: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    position: 'absolute',
    left: '70%',
  },
  background: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderWidth: 0,
    // borderRadius: 15,
    overflow: 'hidden',
  },
  textCenter: {
    backgroundColor: 'rgba(196, 196, 196, 0.78)',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTitle: {
    flexDirection: 'row',
    fontSize: 15,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
  },
});

//make this component available to the app
export default ReuseApproved;
