import {useNavigation} from '@react-navigation/native';
import {color} from '@rneui/base';
import axios from 'axios';
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Modal from 'react-native-modal';
import {AuthContext} from '../../Constants/context';
import AppUrl from '../../RestApi/AppUrl';

export default function ModalComp({
  isModalVisible,
  setModalVisible,
  setResult,
  type = 'confirm',
  typeName = null,
  id = null,
}) {
  // const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {axiosConfig} = useContext(AuthContext);

  const toggleModal = () => {
    setResult(false);
    setModalVisible(!isModalVisible);
  };

  const HandelConfim = () => {
    typeName === 'LearningPending' && type === 'confirm'
      ? axios
          .get(AppUrl.learningApprove + id, axiosConfig)
          .then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
              setModalVisible(false);
              Toast.show('Done');
              navigation.goBack();
              navigation.goBack();
            }
          })
          .catch(err => {
            Toast.show(err.message, Toast.durations.SHORT);
            console.log(err);
          })
      : typeName === 'LearningPending' && type === 'warning'
      ? axios
          .get(AppUrl.learningReject + id, axiosConfig)
          .then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
              setModalVisible(false);
              Toast.show('Done');
              navigation.goBack();
              navigation.goBack();
            }
          })
          .catch(err => {
            Toast.show(err.message, Toast.durations.SHORT);
            console.log(err);
          })
      : typeName === 'QnaPending' && type === 'confirm'
      ? axios
          .get(AppUrl.QnaApproved + id, axiosConfig)
          .then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
              setModalVisible(false);
              Toast.show('Done');
              navigation.goBack();
              navigation.goBack();
            }
          })
          .catch(err => {
            Toast.show(err.message, Toast.durations.SHORT);
            console.log(err);
          })
      : typeName === 'QnaPending' && type === 'warning'
      ? axios
          .get(AppUrl.QnaRejected + id, axiosConfig)
          .then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
              setModalVisible(false);
              navigation.goBack();
              navigation.goBack();
            }
          })
          .catch(err => {
            // Toast.show(AppUrl.QnaRejected + id);
            Toast.show(err.message, Toast.durations.SHORT);
            console.log(err);
          })
      : null;
    setResult(true);
  };

  const HandelCencel = () => {
    setModalVisible(false);
    setResult(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        style={styles.bottomModalView}
        isVisible={isModalVisible}
        backdropOpacity={0}
        onBackdropPress={toggleModal}>
        <View style={type === 'confirm' ? styles.modal : styles.modalWarning}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            {/* <Image source={icon} style={{ height: 30, width: 30 }} /> */}
            <Text style={{color: 'white', marginVertical: 5, fontSize: 20}}>
              Are you Sure?
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#2C2C2C',
              width: '80%',
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontSize: 13, padding: 10}}>
              This can not be undo.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 20,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={HandelCencel}
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                width: '30%',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={HandelConfim}
              style={{
                backgroundColor: '#F14D4C',
                width: '30%',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  button: {
    width: '50%',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffaa00',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  modal: {
    width: '100%',
    height: '30%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    borderColor: '#ffaa00',
    borderTopWidth: 5,
    borderTopWidth: 5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    backgroundColor: '#000000e7',
  },
  modalWarning: {
    width: '100%',
    height: '30%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    borderColor: '#ff0000b6',
    borderTopWidth: 5,
    borderTopWidth: 5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    backgroundColor: '#000000e7',
  },
  modalText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
