import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../Components/Header';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../../../Constants/Colors';
import ImagePath from '../../../Constants/ImagePath';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../Components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IP} from '../../../Constants/Server';
import NavigationString from '../../../Constants/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function NewTips() {
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [amt,setAmt] = useState('')
  const [odds,setOdds] = useState('')
  const [probs,setProbs] = useState('')
  const [type,setType] = useState('')
  const [category,setCategory] = useState('')
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
        // console.log(imageUri)
      }
    });
  };
  // const token =  AsyncStorage.getItem('token');
const [token,setToken] = useState('')
useEffect(() => {
  async function fetchData() {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
}, []);

  const handleSaveTip = async () => {
    try {
      const formData = new FormData();
      formData.append('title', 'football');
      formData.append('description', 'game');
      formData.append('amt', '12');
      formData.append('odds', '344');
      formData.append('probs', '432');
      formData.append('type', 'VIP');
      formData.append('category', 'cricket');
      formData.append('postImages', {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
  
      const response = await fetch(`${IP}/service/add`, {
        method: 'POST',
        headers: {
          Authorization:token
        },
        body: formData,
      });
     
  
      const responseData = await response.json();
      // console.warn('error is ',responseData)
      navigation.navigate('AdminHomePage');
    } catch (error) {
      console.error('Error:', error.message);
      console.error('Stack Trace:', error.stack);
    }
  };
  
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: '100%',
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: responsiveWidth(30),
              height: responsiveHeight(3),
              backgroundColor: Colors.grayText,
              borderRadius: responsiveWidth(15),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image source={require('../../../assets/icons/run.png')} />
            <Text
              style={{
                color: Colors.blackText,
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
              }}>
              SPORT
            </Text>
            <Image source={require('../../../assets/icons/downArr.png')} />
          </View>

          <View
            style={{
              width: responsiveWidth(20),
              height: responsiveHeight(3),
              borderRadius: responsiveWidth(15),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderWidth: 1,
              borderColor: Colors.grayText,
            }}>
            <Text
              style={{
                color: Colors.whiteText,
                fontSize: responsiveFontSize(1.8),
                fontWeight: '900',
              }}>
              VIP
            </Text>
            <Image source={require('../../../assets/icons/whiteDwnArr.png')} />
          </View>
          <View
            style={{
              borderColor: Colors.grayText,
              borderWidth: 1,
              borderRadius: responsiveWidth(2),
              padding: 5,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../../assets/icons/solar_calendar-linear.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: Colors.grayText,
                marginRight: responsiveWidth(2),
              }}
            />
            <Text
              style={{
                color: '#d0d0d0',
                fontSize: responsiveFontSize(1.6),
                fontWeight: '900',
              }}>
              Select date/time
            </Text>
          </View>
        </View>
        <View
          style={{
            width: responsiveWidth(93),
            height: responsiveHeight(30),
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.grayText,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: image}}
            style={{
              width: responsiveWidth(95),
              height: responsiveHeight(30),
              borderRadius: responsiveWidth(2),
            }}
          />
        </View>
        <Text style={{color: Colors.grayText, marginVertical: 5}}>
          TIP TITLE
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(93),
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.grayText,
              width: responsiveWidth(60),
              height: responsiveHeight(5),
              borderRadius: 10,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <TextInput
              style={{
                color: '#fff',
                fontSize: responsiveFontSize(1.5),
                fontWeight: '900',
                paddingVertical: 2,
                width: '70%',
              }}
              onChangeText={(t)=>setTitle(t)}
              placeholder="enter tip titile"
              placeholderTextColor={Colors.grayText}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.grayText,
              width: responsiveWidth(23),
              borderRadius: 10,
              height: responsiveHeight(5),
              justifyContent: 'center',
            }}>
            <Text
              onPress={openImagePicker}
              style={{color: Colors.grayText, alignSelf: 'center'}}>
              CHANGE PIC
            </Text>
          </View>
        </View>

        <Text
          style={{color: Colors.grayText, marginVertical: 5, marginTop: 10}}>
          TIP DISCRIPTION
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.grayText,
            width: responsiveWidth(93),
            height: responsiveHeight(17),
            borderRadius: 10,
          }}>
          <TextInput
            style={{color: '#fff', fontSize: responsiveFontSize(1.9)}}
            multiline={true}
            placeholder="enter tip discription"
            placeholderTextColor={Colors.grayText}
            onChangeText={(t)=>setDescription(t)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                color: Colors.grayText,
                fontSize: responsiveFontSize(1.4),
                marginVertical: 5,
              }}>
              AMOUNT
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.grayText,
                width: responsiveWidth(25),
                height: responsiveHeight(4.3),
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.5),
                  fontWeight: '900',
                  paddingVertical: 2,
                  width: '100%',

                }}
                onChangeText={(t)=>setAmt(t)}
                keyboardType="numeric"
                placeholder="enter amount"
                placeholderTextColor={Colors.grayText}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: Colors.grayText,
                fontSize: responsiveFontSize(1.4),
                marginVertical: 5,
              }}>
              ODDS
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.grayText,
                width: responsiveWidth(25),
                height: responsiveHeight(4.3),
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.5),
                  fontWeight: '900',
                  paddingVertical: 2,
                  width: '100%',
                }}
                onChangeText={(t)=>setOdds(t)}
                keyboardType="numeric"
                placeholder="enter odds"
                placeholderTextColor={Colors.grayText}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: Colors.grayText,
                fontSize: responsiveFontSize(1.4),
                marginVertical: 5,
              }}>
              PROBS.
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.grayText,
                width: responsiveWidth(25),
                height: responsiveHeight(4.3),
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.5),
                  fontWeight: '900',
                  paddingVertical: 2,
                  width: '100%',
                }}
                onChangeText={(t)=>setProbs(t)}
                keyboardType="numeric"
                placeholder="enter probs."
                placeholderTextColor={Colors.grayText}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.grayText,
              width: responsiveWidth(25),
              borderRadius: 10,
              height: responsiveHeight(4),
              justifyContent: 'center',
            }}>
            <Text
              onPress={() => navigation.goBack()}
              style={{color: Colors.grayText, alignSelf: 'center'}}>
              {' '}
              BACK
            </Text>
          </View>
          <Button
            w={20}
            h={4}
            br={2}
            title={'SAVE'}
            customStyle={{marginTop: 0}}
            onPress={handleSaveTip}
            // onPress={() => navigation.navigate('AdminHomePage')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
