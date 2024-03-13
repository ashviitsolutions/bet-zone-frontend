import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
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

function Register() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (mobile.length < 10) {
      ToastAndroid.show('Mobile number must be at least 10 digits', ToastAndroid.LONG);
      return;
    }

    if (password.length < 8) {
      ToastAndroid.show('Password must be at least 8 characters', ToastAndroid.LONG);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Password and Confirm Password must match', ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    try {
      const data = {
        full_name: fullName,
        email: email,
        mobile: mobile,
        password: password,
        confirm_password: confirmPassword,
        auth_type: 'user',
      };

      const response = await fetch(`${IP}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (response.ok) {
        setFullName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setConfirmPassword('');
        ToastAndroid.show('Registration successful!', ToastAndroid.SHORT);
        navigation.navigate('LOGIN');
      } else if (response.status === 400) {
        ToastAndroid.show('Email or mobile number already used', ToastAndroid.LONG);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 10,
        }}
      >
        <View
          style={{
            height: responsiveHeight(15),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
            }}
          >
            CREATE ACCOUNT
          </Text>
        </View>
        <InputComp
          title={'full name'}
          value={fullName}
          onChangeText={setFullName}
        />
        <InputComp
          title={'email'}
          value={email}
          onChangeText={setEmail}
          keyType={'email-address'}
        />
        <InputComp
          title={'mobile no.'}
          keyType={'numeric'}
          value={mobile}
          onChangeText={setMobile}
        />
        <InputComp
          title={'password'}
          value={password}
          onChangeText={setPassword}
        />
        <InputComp
          title={'confirm password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button w={30} h={5} br={6} title={'SIGN UP'} onPress={handleSubmit} />

        {loading && <ActivityIndicator size="large" color={Colors.yellowColor} />}

        <ContactAreaComp />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
