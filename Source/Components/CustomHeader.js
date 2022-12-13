import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import imagePath from '../Constants/imagePath';
import MainNavigationString from '../Constants/MainNavigationString';
const CustomHeader = ({ backFunc,title }) => {
    return (
        <View style={{ backgroundColor: '#343434', flexDirection: 'row', height: 50 }}>


            <View style={{ width: '33%', justifyContent: 'center' }}>

                {backFunc ? <TouchableOpacity onPress={backFunc} style={{ marginLeft: 5, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', }}>
                        <Ionicons name='chevron-back-outline' size={24} color='#fff' />
                    </View>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Back</Text>
                    </View>


                </TouchableOpacity> : <TouchableOpacity>
                    <View style={{ height: 35, width: 35, marginLeft: 10 }}>
                        <Image source={imagePath.logo} style={{ height: '100%', width: '100%' }} />
                    </View>
                </TouchableOpacity>}




            </View>

            <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16,  }}>{title}</Text>
            </View>

        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({})