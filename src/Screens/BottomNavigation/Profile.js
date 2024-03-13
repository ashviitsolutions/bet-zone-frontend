import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
import ContactAreaComp from '../../Components/ContactAreaComp';

function Profile() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          padding: 10,
          width: responsiveWidth(100),
          // height: responsiveHeight(100),
          height: '100%'
        }}>
        <View
          style={{
            height: responsiveHeight(15),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ImagePath.ProfileIcon}
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(8),
              tintColor: Colors.whiteText,
            }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: Colors.whiteText,
              fontWeight: '900',
            }}>
            PROFILE
          </Text>
        </View>

        <View
          style={{
            backgroundColor: Colors.brownColor,
            width: responsiveWidth(95),
            height: responsiveHeight(12),
            borderRadius: responsiveWidth(5),
            marginVertical: responsiveHeight(1),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            shadowColor: '#000',
          }}>
          <Text
            style={{
              fontSize: responsiveWidth(5),
              color: Colors.whiteText,
              fontWeight: '900',
              textAlign: 'center',
            }}>
            Profile section
          </Text>
          <Text
            style={{
              fontSize: responsiveWidth(5),
              color: Colors.whiteText,
              textAlign: 'center',
            }}>
            Create an account to access
          </Text>
        </View>

        <Button
          w={30}
          h={5}
          br={6}
          title={'SIGN UP'}
          onPress={() => navigation.navigate(NavigationString.REGISTER)}
        />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: width * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../../assets/Image/usa.png')} />
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: responsiveFontSize(1.2),
              marginLeft: responsiveWidth(1.2),
            }}>
            USA ENGLISH
          </Text>
        </View>
        <ContactAreaComp />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
