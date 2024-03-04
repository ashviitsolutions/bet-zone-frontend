import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
import Tabs from '../../Navigation/TabsNav';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
import InputComp from '../../Components/InputComp';
import ContactAreaComp from '../../Components/ContactAreaComp';
import { IP } from '../../Constants/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);
        const response = await fetch(`${IP}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          console.error('Authentication failed');
          return;
        }
        const responseData = await response.json();
        const authToken = response.headers.get('Authorization');
        console.log("responseData login data", responseData)
        if (authToken) {
          await AsyncStorage.setItem('auth_type', String(responseData.user_info.auth_type));
          await AsyncStorage.setItem('token', authToken)
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('full_name', responseData.user_info.full_name);
          await AsyncStorage.setItem('mobile', responseData.user_info.mobile);
          await AsyncStorage.setItem('is_member', String(responseData.user_info.is_member));
          global.auth_type = responseData.user_info.auth_type
        }
        ToastAndroid.show(responseData.msg, ToastAndroid.SHORT);
        if (responseData.user_info.auth_type === 'user') {
          navigation.replace(NavigationString.TABS);
        } else {
          navigation.replace(NavigationString.Admin_Tabs);
        }
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setLoading(false);
      }
    } else {
      ToastAndroid.show('Enter email/password', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <ScrollView
          style={{
            backgroundColor: Colors.mainColor,
            height: responsiveHeight(100),
            padding: 10,
          }}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: "flex-start", marginLeft: 20 }}>
              <Image source={ImagePath.backIcon} style={styles.backIcon_style} />
              <Text style={{ color: '#d0d0d0' }}>Back</Text>
            </TouchableOpacity>
            <Image
              source={ImagePath.ProfileIcon}
              style={styles.ProfileIcon_style}
            />
            <Text style={styles.login_text}>LOGIN</Text>
          </View>

          <InputComp
            title={'email'}
            value={email}
            onChangeText={setEmail}
            keyType={'email-address'}
          />

          <InputComp
            title={'password'}
            value={password}
            onChangeText={setPassword}
            password={true}
          />

          <Button w={30} h={5} br={6} title={'LOGIN'} onPress={handleLogin} />



          <View
            style={{
              height: responsiveHeight(4),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: responsiveHeight(1.5),
            }}>
            <Text style={{ color: Colors.grayText }}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(NavigationString.CREATE_ACCOUNT)}
              activeOpacity={0.8}>
              <Text style={{ color: Colors.grayText }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? <Loader /> : null}
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon_style: {
    width: 10,
    height: 10,
    tintColor: '#d0d0d0',
    marginRight: 4,
  },
  date_text: { color: '#d0d0d0', fontSize: responsiveFontSize(1.6) },
  ProfileIcon_style: {
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    tintColor: Colors.whiteText,
  },
  login_text: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
  },
});
