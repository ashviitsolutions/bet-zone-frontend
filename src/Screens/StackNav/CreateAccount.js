import React, {useState} from 'react';
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
import { IP } from '../../Constants/Server';
function CreateAccount() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (fullName && email && password && mobile && confirmPassword) {
      // Additional validation checks can be added here
  
      try {
        const response = await fetch(`${IP}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: fullName,
            email: email,
            password: password,
            mobile: mobile,
            confirm_password: confirmPassword,
            auth_type: 'user',
          }),
        });
  
        if (!response.ok) {
          console.error('Authentication failed. Status:', response.status);
          return;
        }
  
        const responseData = await response.json();
        console.log('User created successfully');
        navigation.navigate(NavigationString.LOGIN);
      } catch (error) {
        console.error('Error during user registration:', error);
      }
    } else {
      ToastAndroid.show('Please fill in all details', ToastAndroid.SHORT);
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />

      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 10,
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
          onChangeText={setmobile}
        />
        <InputComp
          title={'password'}
          value={password}
          onChangeText={setPassword}
          password={true}
        />
        <InputComp
          title={'confirm password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          password={true}
        />
        <Button w={30} h={5} br={6} title={'SIGN UP'} onPress={handleSubmit} />

        <ContactAreaComp />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateAccount;
