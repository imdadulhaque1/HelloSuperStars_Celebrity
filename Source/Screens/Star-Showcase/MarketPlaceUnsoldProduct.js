import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import AppUrl from '../../RestApi/AppUrl';
import RenderHtml from 'react-native-render-html';
const MarketPlaceUnsoldProduct = ({route}) => {
  const {width} = useWindowDimensions();
  const {products} = route.params;
  console.log('from params', products);
  const Navigation = useNavigation();
  return (
    <>
      <ScrollView style={{backgroundColor: '#000'}}>
        {products?.map(product => {
          console.log(`${AppUrl.MediaBaseUrl}${product?.image}`);
          return (
            <View style={styles.Container}>
              <View style={styles.Row}>
                <View style={styles.Right}>
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    width={120}>
                    <Image
                      source={{
                        uri: `${AppUrl.MediaBaseUrl + product?.image}`,
                      }}
                      style={styles.postImage}
                      width={120}
                      height={200}
                    />
                  </SwiperFlatList>
                </View>
                <View style={styles.Left}>
                  <Text style={styles.Text}>{product?.title}</Text>
                  <Text style={styles.Date}>
                    {' '}
                    Released at {moment(product?.created_at).format('LL')}
                  </Text>

                  <View style={{width: '65%'}}>
                    <RenderHtml
                      contentWidth={width}
                      source={{
                        html: `<div style='color:#fff' >${product?.description
                          .slice(0, 160)
                          .concat(
                            product?.description.length > 160 ? '...' : '',
                          )}</div>`,
                      }}
                    />
                    {/* <RenderHtml
                      contentWidth={50}
                      source={{
                        html: `<div style='color:#e6e6e6;>${product?.description}</div>`,
                      }}
                    /> */}
                  </View>

                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <TouchableOpacity style={styles.Box}>
                      <Image source={imagePath.Box} />
                      <Text style={styles.Count}> 400</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Box}>
                      <Image source={imagePath.Count} />
                      <Text style={styles.Count}> ${product?.unit_price}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Box}>
                      <Image source={imagePath.Sold} />
                      <Text style={styles.Count}>
                        {' '}
                        {product?.total_selling}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Box}>
                      <Image source={imagePath.Available} />
                      <Text style={styles.Count}>
                        {' '}
                        {product?.total_items - product?.total_selling}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <TouchableOpacity
                      style={styles.EditBtn}
                      onPress={() =>
                        Navigation.navigate(MainNavigationString.EDITPRODUCT)
                      }>
                      <Image source={imagePath.Edit} />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.DeleteBtn}>
                      <Image source={imagePath.Delete} />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default MarketPlaceUnsoldProduct;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#272727',
    margin: 8,
    borderRadius: 10,
  },
  Row: {
    flexDirection: 'row',
  },
  postImage: {
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  Right: {
    margin: 8,
  },

  Left: {
    margin: 8,
  },

  Text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },

  Date: {
    // fontSize:30,
    color: '#999999',
  },
  Edit: {
    backgroundColor: 'gold',
    width: '100%',
  },

  Box: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderRadius: 8,
    height: 30,
    marginHorizontal: 2.5,
    marginTop: 10,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Count: {
    color: 'white',
    fontWeight: 'bold',
  },

  EditBtn: {
    backgroundColor: '#F6B718',
    borderRadius: 8,
    height: 40,
    width: '35%',
    marginTop: 8,
    marginBottom: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeleteBtn: {
    backgroundColor: '#C0C0C0',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '35%',
  },
});
