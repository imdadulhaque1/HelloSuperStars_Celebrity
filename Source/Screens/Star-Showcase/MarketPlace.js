//import liraries
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../Components/CustomHeader';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import AppUrl from '../../RestApi/AppUrl';
import GradientText from './GradientText';

// create a component
const Marketplace = ({navigation}) => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState(null);
  useEffect(() => {
    axios
      .get(AppUrl.marketplaceProducts, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setAllProducts(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
    <CustomHeader backFunc={()=>navigation.goBack()} />
    <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={styles.container}>
        <View style={styles.superStarHome}>
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate(MainNavigationString.MARKETPLACESOLDPRODUCT, {
                products: allProducts?.pending,
              })
            }
            style={styles.singleContent}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#e7a825', '#e7c233', '#ffad00']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Pending Product</Text>
            </LinearGradient>
            <View style={styles.soldProductView}>
              <Image
                resizeMode="stretch"
                source={imagePath.Sold}
                style={styles.postImage}
              />
              <GradientText style={styles.textStyle}>
                {allProducts?.pending?.length}
              </GradientText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate(
                MainNavigationString.MARKETPLACEUNSOLDPRODUCT,
                {
                  products: allProducts?.approved,
                },
              )
            }
            style={styles.singleContent}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#e7a825', '#e7c233', '#ffad00']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Approved Products</Text>
            </LinearGradient>
            <View style={styles.soldProductView}>
              <Image
                resizeMode="stretch"
                source={imagePath.Unsold}
                style={styles.postImage}
              />
              <GradientText style={styles.textStyle}>
                {allProducts?.approved?.length}
              </GradientText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.superStarHome}>
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate(MainNavigationString.MARKETPLACEADDPRODUCT)
            }
            style={styles.singleContent}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#e7a825', '#e7c233', '#ffad00']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Add Product</Text>
            </LinearGradient>
            <Image source={imagePath.Create} style={styles.postImageTwo} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 1,
    backgroundColor: '#232323',
    flex: 1,
    margin: 8,
    borderRadius: 10,
    marginBottom: 20,
  },

  soldProductView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 68,
    fontWeight: 'bold',
    marginTop: 20,
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#232323',
    borderRadius: 10,
    paddingBottom: 8,
  },
  superStarHome: {
    flexDirection: 'row',
    padding: 5,
  },
  postImage: {
    width: 30,
    height: 30,
    margin: '15%',
  },
  postImageTwo: {
    width: 65,
    height: 65,
    margin: '15%',
  },
  linearGradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    // overflow: 'hidden',
  },
  singleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ff0',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    width: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    left: '85%',
    top: '5%',
  },
  text: {
    fontSize: 20,
  },
});

//make this component available to the app
export default Marketplace;
