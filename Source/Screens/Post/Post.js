/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import styles from '../Dashboard/StylesHome';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import CustomHeader from '../../Components/CustomHeader';

const Post = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [allPost, setPost] = useState(null);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    console.log('refreshing...........');
    axios
      .get(AppUrl.simplePost, axiosConfig)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
          setPost(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [refresh]);

  return (
    <SafeAreaView>
      <CustomHeader title="Post" backFunc={() => Navigation.goBack()} />
      <ScrollView style={{backgroundColor: '#000', padding: 8, height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.VIEWCARD, {
                  typeName: 'PostAll',
                  posts: allPost?.all,
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
                <Text style={styles.badgeT}>{allPost?.all?.length}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.VIEWCARD, {
                  typeName: 'PostAll',
                  posts: allPost?.approved,
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
                <Text style={styles.badgeT}>{allPost?.approved?.length}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.VIEWCARD, {
                  typeName: 'PendingPost',
                  posts: allPost?.pending,
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
                <Text style={styles.badgeT}>{allPost?.pending?.length}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.VIEWCARD, {
                  typeName: 'RejectedPost',
                  posts: allPost?.approved,
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
                <Text style={styles.badgeT}>{allPost?.rejected?.length}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.POSTCREATE, {
                  setRefresh,
                  refresh,
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
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
