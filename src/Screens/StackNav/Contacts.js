import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
function Contacts() {
  const navigation = useNavigation();

  function Card({icon, title,onPress}) {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.mainBox} onPress={onPress}>
        <Image
          source={icon}
          style={{
            width: responsiveWidth(6),
            height: responsiveHeight(2.7),
          }}
        />
        <Text style={styles.title_text_style}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          style={styles.mainView}>
          <View
            style={{
              height: responsiveHeight(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={ImagePath.TelephoneIcon}
              style={styles.TelephoneIcon_style}
            />
            <Text style={styles.Contacts_text}>CONTACTS</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.brownColor,
              width: responsiveWidth(95),
              height: responsiveHeight(30),
              borderRadius: 20,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                color: Colors.whiteText,
                fontSize: responsiveFontSize(2.3),
              }}>
              Any troubles? Contact us Directly
            </Text>
            <Card onPress={()=>Linking.openURL('https://telegram.org/')} icon={ImagePath.telegramIcon} title={'Telegram'} />
            <Card  onPress={()=>Linking.openURL('whatsapp://send?phone=+91 84494 96694')} icon={ImagePath.telegramIcon} title={'WhatsApp'} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Contacts;

const styles = StyleSheet.create({
  mainView:{
    backgroundColor: Colors.mainColor,
    height: responsiveHeight(100),
    padding: 10,
  },
  Contacts_text: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
  },
  TelephoneIcon_style: {
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    tintColor: Colors.whiteText,
  },
  mainBox: {
    width: responsiveWidth(60),
    height: responsiveHeight(6),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.whiteText,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text_style: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
  },
});
