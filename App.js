import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Routes from './Source/Navigatior/Routes';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);
const App = () => {
  return (
    <>
        <Routes />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
