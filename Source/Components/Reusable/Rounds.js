import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
const Rounds = ({route}) => {
  const Navigation = useNavigation();
  console.log(options);
  const {auditionId, options} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView style={{marginTop: 6}}>
        {/* =============Round-1 & 2 Navigation start here==========  */}
        <View style={styles.roundView}>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 1,
              });
            }}
            style={{
              height: 180,
              width: '49%',
              backgroundColor: '#282828',
              borderRadius: 10,
              padding: 10,
            }}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 2,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>2</Text>
          </TouchableOpacity>
        </View>
        {/* =============Round-1 & 2 Navigation end here==========  */}

        {/* =============Round-3 & 4 Navigation start here==========  */}
        <View style={styles.roundView}>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 3,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 4,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>4</Text>
          </TouchableOpacity>
        </View>
        {/* =============Round-3 & 4 Navigation end here==========  */}

        {/* =============Round-5 & 6  Navigation start here==========  */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 5,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 6,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>6</Text>
          </TouchableOpacity>
        </View>
        {/* =============Round-5 & 6  Navigation end here==========  */}

        {/* =============Round-7 & 8  Navigation start here==========  */}

        <View style={styles.roundView}>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 7,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate(MainNavigationString.AUDITIONVIDEOS, {
                options: options === 'marking' ? 'marking' : null,
                post: auditionId,
                round: 8,
              });
            }}
            style={styles.roundTouchable}>
            <Image
              source={imagePath.Round}
              style={styles.roundImg}
              resizeMode={'stretch'}
            />

            <Text style={styles.roundTxt}>8</Text>
          </TouchableOpacity>
        </View>
        {/* =============Round-7 & 8  Navigation end here==========  */}
      </ScrollView>
    </View>
  );
};

export default Rounds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBannerImg: {
    height: 150,
    width: '100%',
    backgroundColor: '#343434',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  topBannerTxt: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '49%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  roundImage: {
    flexDirection: 'row',
    backgroundColor: '#272727',
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  roundBtn: {
    flex: 1,
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },

  //round updated design started
  roundView: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  roundImg: {height: '100%', width: '100%'},
  roundTxt: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '24%',
    fontSize: 50,
    fontWeight: 'bold',
  },
  roundTouchable: {
    height: 180,
    width: '49%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 10,
  },
});
