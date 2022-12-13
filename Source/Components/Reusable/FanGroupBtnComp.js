import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function FanGroupBtnComp({title, setTab}) {
  return (
    <TouchableOpacity
      style={styles.confirmBtn}
      onPress={() => {
        setTab(title);
      }}>
      <LinearGradient
        colors={['#E19A04', '#E7A725', '#FFAD55', '#FACF55']}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 13, color: 'white'}}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  confirmBtn: {
    width: '20%',
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});
