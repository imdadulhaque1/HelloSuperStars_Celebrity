import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import ApprovedImg from '../../Assets/notification/approved.png';
import moment from 'moment';
import AppUrl from '../../RestApi/AppUrl';
import {useNavigation} from '@react-navigation/native';
import MainNavigationString from '../../Constants/MainNavigationString';
const NotificationComp = ({data, type}) => {
  const Navigation = useNavigation();
  const handleClick = (type, data) => {
    console.log(type);
    if (type === 'Marketplace' || type === 'auction' || type === 'souvenir') {
      Navigation.navigate(MainNavigationString.STARSHOWCASE);
    } else if (type === 'Live Chat') {
      Navigation.navigate(MainNavigationString.COMPLETEDCARD, {
        typeName: 'Pending',
        eventData: data,
        module: 'Live Chat',
      });
      //learning chat missing //////////////////
    } else if (type === 'Qna') {
      Navigation.navigate(MainNavigationString.COMPLETEDCARD, {
        typeName: 'QnaPending',
        eventData: data,
        module: 'QNA',
      });
    } else if (type === 'Meetup') {
      Navigation.navigate(MainNavigationString.COMPLETEDCARD, {
        typeName: 'Pending',
        eventData: data,
        module: 'Meet Up',
      });
    } else if (type === 'Post') {
      Navigation.navigate(MainNavigationString.PENDINGCARD, {
        typeName: 'PendingPost',
        singlePost: data,
      });
    } else if (type === 'Greeting') {
      Navigation.navigate(MainNavigationString.GREETINGSDETAILS, {
        typeName: 'GreetingsCreate',
      });
    } else if (type === 'FanGroup') {
      Navigation.navigate(MainNavigationString.ALLDATAFANGROUP, {
        data: data,
        type: 'invitation',
      });
    }
  };
  console.log(data);
  return (
    <TouchableOpacity
      onPress={() => {
        handleClick(type, data);
      }}>
      <View style={styles.row}>
        <View style={styles.content}>
          <View style={styles.ContentItems}>
            {data?.view_status === 0 ? (
              <View style={styles.ContentItemBar}></View>
            ) : null}

            <View style={{}}>
              {/* <Image style={{ height: 50, width: 50 }} source={ApprovedImg} /> */}
              {data?.view_status === 0 ? (
                <View style={styles.imgBorder}>
                  {data?.banner ? (
                    <Image
                      style={{height: 40, width: 40, borderRadius: 100}}
                      source={{uri: AppUrl.MediaBaseUrl + data?.banner}}
                    />
                  ) : (
                    <Image
                      style={{height: 40, width: 40, borderRadius: 100}}
                      source={ApprovedImg}
                    />
                  )}
                </View>
              ) : (
                <View style={styles.imgBorderInactive}>
                  <Image
                    style={{height: 47, width: 47, borderRadius: 100}}
                    source={ApprovedImg}
                  />
                </View>
              )}
            </View>
            <View style={styles.ContentItems2}>
              <Text style={styles.contentText}>{data?.title}</Text>

              <Text style={styles.contentText2}>{type}</Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', paddingRight: '20%'}}>
            <Text style={styles.contentText2}>
              {moment(data?.created_at).format('hh:mm A')}
            </Text>
            <Text style={styles.contentText3}>
              {moment(data?.created_at).format('LL')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationComp;
