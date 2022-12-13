import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TitleHeader = ({title}) => {
  return (
    <View
    style={{
      backgroundColor: '#202020',
     marginVertical:10,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,

    }}>

    <Text
      style={[
        styles.text,
        {
          paddingVertical: 8,
          fontWeight: 'bold',
          color:'#ffaa00'
        },
      ]}>
     {title}
    </Text>


  </View>
  )
}

export default TitleHeader

const styles = StyleSheet.create({})