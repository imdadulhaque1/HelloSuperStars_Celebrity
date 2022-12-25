/* eslint-disable prettier/prettier */
import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';

const PostAll = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      <View>
        <CustomHeader title="All Post" backFunc={() => navigation.goBack()} />
        <Text>PostAll</Text>
      </View>
    </SafeAreaView>
  );
};

export default PostAll;
