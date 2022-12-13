/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../../Components/CustomHeader'

const PostAll = ({navigation}) => {
  return (
    <View>
     <CustomHeader title='All Post' backFunc={()=>navigation.goBack()} />
      <Text>PostAll</Text>
    </View>
  )
}

export default PostAll