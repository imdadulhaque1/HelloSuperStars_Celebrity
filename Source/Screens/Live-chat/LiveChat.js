/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../Dashboard/StylesHome';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import React from 'react';
import MainNavigationString from '../../Constants/MainNavigationString';
import AppUrl from '../../RestApi/AppUrl';
import CustomHeader from '../../Components/CustomHeader';

const LiveChat = () => {
  const Navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      <CustomHeader title={'Livechat'} backFunc={() => Navigation.goBack()} />
      <ScrollView style={{backgroundColor: '#000', padding: 8, height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'All',
                  module: 'Live Chat',
                  path: `${AppUrl.LiveChatList + 'all'}`,
                })
              }>
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
                <Text style={styles.buttonText}>All</Text>
              </LinearGradient>
              <Image source={imagePath.All} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Approved',
                  module: 'Live Chat',
                  path: `${AppUrl.LiveChatList + 'approved'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Approved</Text>
              </LinearGradient>
              <Image source={imagePath.Approved} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Pending',
                  module: 'Live Chat',
                  path: `${AppUrl.LiveChatList + 'pending'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Pending</Text>
              </LinearGradient>
              <Image source={imagePath.Pending} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Rejected',
                  module: 'Live Chat',
                  path: `${AppUrl.LiveChatList + 'rejected'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Rejected</Text>
              </LinearGradient>
              <Image source={imagePath.Rejected} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Completed',
                  module: 'Live Chat',
                  path: `${AppUrl.LiveChatList + 'completed'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Completed</Text>
              </LinearGradient>
              <Image source={imagePath.Completed} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.VIEWCARD, {
                  typeName: 'LiveChatList',
                })
              }>
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
                <Text style={styles.buttonText}>Chat List</Text>
              </LinearGradient>
              <Image source={imagePath.Rejected} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.VIEWCARD, {
                  typeName: 'LiveChatResult',
                })
              }>
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
                <Text style={styles.buttonText}>Result</Text>
              </LinearGradient>
              <Image source={imagePath.Post} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.CREATEFORM, {
                  typeName: 'LiveChatCreate',
                })
              }>
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
                <Text style={styles.buttonText}>Create</Text>
              </LinearGradient>
              <Image source={imagePath.Post} style={styles.postImage} />
              {/* <Text style={styles.badge}>
                <Text style={styles.badgeT}>0</Text>
              </Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveChat;
