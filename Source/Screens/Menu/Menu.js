import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import imagePath from '../../Constants/imagePath'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../../permission';
import MainNavigationString from '../../Constants/MainNavigationString';
import { AuthContext } from '../../Constants/context';
import CustomHeader from '../../Components/CustomHeader';
const Menu = ({navigation}) => {
  const [imgSrc,setImgSrc]=useState('')

  const {authContext, useInfo} = useContext(AuthContext);
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert(
        'Profile Picture',
        'Choose an option',
        [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => { } }
        ]
      )
    }
  }
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path)
      setImgSrc(image.path)
    });
  }

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("selected Image", image.path)
      setImgSrc(image.path)
   
    });
  }


  // RNFS.readFile(imgSrc, 'base64')
  // .then(res =>{
  //   console.log('========>baseData',res);
  // });

  function backFunc(){
navigation.goBack()
  }
  return (

    <>
    <CustomHeader backFunc={backFunc} title='Menu' />
    <ScrollView style={styles.container}>
      {/* ==============cover photo section==============  */}

      <View style={{ position: 'relative' }}>
        <View style={styles.coverphotoSection}>
          <Image source={imagePath.menuCoverPhoto} style={styles.menuCoverPhoto} />
          <TouchableOpacity  onPress={onSelectImage} style={{ color: 'white', position: 'absolute', right: '2%', bottom: 10 }}>
            <MaterialIcons name='camera-alt' size={20} style={{ backgroundColor: 'white', opacity: 0.8, borderRadius: 100, padding: 2 }} />

          </TouchableOpacity>
        </View>
        <View style={styles.profileImage}>
          <Image source={imagePath.profileImgMenu} style={{ height: '100%', width: '100%', borderRadius: 100 }} />
          <TouchableOpacity onPress={onSelectImage} style={{ color: 'white', position: 'absolute', right: '2%', bottom: 10 }}>
            <MaterialIcons name='camera-alt' size={20} style={{ backgroundColor: 'white', opacity: 0.8, borderRadius: 100, padding: 2 }} />

          </TouchableOpacity>
        </View>


      </View>
      {/* ==============cover photo section==============  */}



      {/*============= Menu section==============  */}
      <View style={{ marginTop: '10%', marginHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Shakib Al Hasan</Text>
        <Text style={{ color: '#ffaa00', textAlign: 'center', fontSize: 12 }}>Super Star</Text>

        {/* <View style={{ backgroundColor: '#022964', marginVertical: 10, height: 180, borderRadius: 20, flexDirection: 'column', }}>
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}> SHAKIB AL HASAN </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', color: '#ffaa00' }}> $8,450.00 </Text>
            <Text style={{ color: 'white', fontSize: 14 }}> Total Balance </Text>
          </View>

          <TouchableOpacity style={{ margin: 10,backgroundColor:'#ffaa00',borderRadius:10 }}>
            <Text style={{ textAlign: 'center',  fontSize: 15, color: 'white',padding:4 }}>Wallet Details</Text>
          </TouchableOpacity>
         

        </View> */}






        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.WALLET)} style={{ margin: 5, borderRadius: 10, paddingVertical: 10,  backgroundColor: '#343434', }}>
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                colors={

                  [
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]
                }
                style={{ alignItems: 'center', height: 35, width: 35, backgroundColor: 'black', justifyContent: 'center', borderRadius: 30, marginLeft: 20 }}>
                <Ionicons name='wallet-sharp' size={18} color='#000' />
              </LinearGradient>


              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ color: 'white', fontSize: 13 }}>Wallet</Text>
              </View>
            </View>

          </TouchableOpacity>






        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.SCHEDULE)} style={{ margin: 5, borderRadius: 10, paddingVertical: 10,  backgroundColor: '#343434', }}>
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                colors={

                  [
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]
                }
                style={{ alignItems: 'center', height: 35, width: 35, backgroundColor: 'black', justifyContent: 'center', borderRadius: 30, marginLeft: 20 }}>
                <Ionicons name='ios-calendar' size={18} color='#000' />
              </LinearGradient>


              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ color: 'white', fontSize: 13 }}>Schedule</Text>
              </View>
            </View>

          </TouchableOpacity>






        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.SETTING)} style={{ margin: 5, borderRadius: 10, paddingVertical: 10,  backgroundColor: '#343434', }}>
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                colors={

                  [
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]
                }
                style={{ alignItems: 'center', height: 35, width: 35, backgroundColor: 'black', justifyContent: 'center', borderRadius: 30, marginLeft: 20 }}>
                <MaterialIcons name='settings' size={18} color='#000' />
              </LinearGradient>


              <View   style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ color: 'white', fontSize: 13 }}>Settings</Text>
              </View>
            </View>

          </TouchableOpacity>






        </View>

      </View>
      {/*============= Menu section==============  */}



      {/*============== Logout section ============== */}

      <TouchableOpacity style={{ margin: 15, }}  onPress={() => authContext.signOut()}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
          colors={

            ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
          }
          style={{ margin: 5, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center', borderRadius: 30, paddingVertical: 10 }}>



          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/*============== Logout section ============== */}

    </ScrollView>
    </>
  )
}

export default Menu

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  coverphotoSection: {

    margin: 10,
    height: 160,
    borderRadius: 10,


  },
  menuCoverPhoto: { height: '100%', width: '100%', borderRadius: 20 },
  profileImage: { height: 100, width: 100, borderRadius: 100, position: 'absolute', bottom: -30, left: '40%' }


})