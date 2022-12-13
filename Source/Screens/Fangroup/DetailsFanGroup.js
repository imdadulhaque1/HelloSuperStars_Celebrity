import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import FanGroupBtnComp from '../../Components/Reusable/FanGroupBtnComp';
import FanGroupHome from './FanGroupHome';
import FanGroupMedia from './FanGroupMedia';
import FanGroupApproval from './FanGroupApproval';
import FanGroupDecline from './FanGroupDecline';
import FanGroupJoining from './FanGroupJoining';
import FanGroupSetting from './FanGroupSetting';

export default function DetailsFanGroup({route}) {
  const {slug} = route.params;

  const [tab, setTab] = useState('Home');

  const [fanDetails, setFanDetails] = useState(null);
  const [allFanPost, setAllFanPost] = useState(null);
  const [fanMedia, setFanMedia] = useState(null);
  const [fanVideo, setFanVideo] = useState(null);
  const [approval, setApproval] = useState(null);
  const [fanMember, setFanMember] = useState(null);
  const [joinFanGroup, setJoinFanGroup] = useState('');
  const [postFanGroup, setPostFanGroup] = useState('');
  const {axiosConfig} = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(AppUrl.fanGroupInfo + slug, axiosConfig)
      .then(res => {
        setFanDetails(res?.data?.fanDetails);
        setAllFanPost(res?.data?.allFanPost);
        setFanMedia(res?.data?.fanMedia);
        setFanVideo(res?.data?.fanVideo);
        setApproval(res?.data?.fanPost);
        setFanMember(res?.data?.fanMember);
        setJoinFanGroup(res.data.fanDetails.join_approval_status);
        setPostFanGroup(res.data.fanDetails.post_approval_status);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        console.log(err);
      });
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#000'}}>
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          <Image
            source={{uri: AppUrl.MediaBaseUrl + fanDetails?.banner}}
            style={{
              height: 200,
              width: '100%',
              border: 1,
              borderColor: '#e39e0c',
            }}
          />
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                console.log('click');
              }}>
              <LinearGradient
                colors={['#938f8f', '#938f8f']}
                style={{
                  width: '100%',
                  height: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white'}}>Add Cover photo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 2}}>
          <Text style={{color: '#e39e0c', fontSize: 24, fontWeight: 'bold'}}>
            {fanDetails?.group_name}
          </Text>
          <Text style={{color: 'white'}}>
            Created at {moment(fanDetails?.start_date).format('LL')} | Continue
            Till {moment(fanDetails?.end_date).format('LL')}
          </Text>
        </View>
        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FanGroupBtnComp title={'Home'} setTab={setTab} />
            <FanGroupBtnComp title={'Media'} setTab={setTab} />
            <FanGroupBtnComp title={'Approval'} setTab={setTab} />
            <FanGroupBtnComp title={'Decline'} setTab={setTab} />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FanGroupBtnComp title={'Analysis'} setTab={setTab} />
            <FanGroupBtnComp title={'Joining Request'} setTab={setTab} />
            <FanGroupBtnComp title={'Settings'} setTab={setTab} />
          </View>
        </View>
        {tab === 'Home' ? (
          <FanGroupHome allFanPost={allFanPost} />
        ) : tab === 'Media' ? (
          <FanGroupMedia fanMedia={fanMedia} fanVideo={fanVideo} />
        ) : tab === 'Approval' ? (
          <FanGroupApproval approval={approval} />
        ) : tab === 'Decline' ? (
          <FanGroupDecline />
        ) : tab === 'Analysis' ? null : tab === 'Joining Request' ? (
          <FanGroupJoining fanMember={fanMember} />
        ) : tab === 'Settings' ? (
          <FanGroupSetting
            joinFanGroup={joinFanGroup}
            postFanGroup={postFanGroup}
            slug={slug}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  confirmBtn: {
    width: '30%',
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});
