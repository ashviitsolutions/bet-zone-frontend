import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
import Tabs from '../../Navigation/TabsNav';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
import InputComp from '../../Components/InputComp';
import ContactAreaComp from '../../Components/ContactAreaComp';
function Login() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          style={{
            backgroundColor: Colors.mainColor,
            height: responsiveHeight(100),
            padding: 10,
          }}>
          <View
            style={styles.header}>
            <Image
              source={ImagePath.ProfileIcon}
              style={styles.ProfileIcon_style}
            />
            <Text
              style={styles.login_text}>
              LOGIN
            </Text>
          </View>

          <InputComp title={'email'} />
          <InputComp title={'password'} />

          <Button
            w={30}
            h={5}
            br={6}
            title={'LOGIN'}
            onPress={() => navigation.navigate(NavigationString.PLAN)}
          />

          <ContactAreaComp />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;


const styles = StyleSheet.create({
  header:{
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileIcon_style:{
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    tintColor: Colors.whiteText,
  },
login_text:{
  fontSize: responsiveFontSize(3),
  color: Colors.whiteText,
  fontWeight: '900',
}
})