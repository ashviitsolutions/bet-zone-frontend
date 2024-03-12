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

function CreateAccount() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

        // Fetch user details from AsyncStorage
        const storedEmail = await AsyncStorage.getItem('email');
        const storedMobile = await AsyncStorage.getItem('mobile');
        const storedName = await AsyncStorage.getItem('full_name');

        setEmail(storedEmail || '');
        setMobile(storedMobile || '');
        setName(storedName || '');
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    const userData = {
      full_name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      mobile: mobile,
      auth_type: 'user'
    };

    try {
      const response = await fetch(`${IP}/updateprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(userData), // Convert the data to JSON string
      });

      const responseData = await response.json();
      console.log("responseData", responseData)
      if (response.status === 200) {
        console.log('Profile update successfully');
        setLoading(false);
        // Update local storage data
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('mobile', mobile);
        await AsyncStorage.setItem('full_name', name);
        navigation.replace(NavigationString.TABS);
        // navigation.navigate('AdminHomePage');
      } else {
        setLoading(false);
        console.log('Error:', responseData.msg);
        // Handle error messages appropriately, e.g., show them to the user
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setLoading(false);
      // Handle network errors or other unexpected errors
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.replace(NavigationString.TABS);
  }

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
             {/* <Button w={20} h={4} br={6} title={'Logout'} onPress={handleLogout} customStyle={{alignSelf:'flex-end'}} /> */}
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
            title={'Full name'}
            value={name}
            onChangeText={setName}
          />
          <InputComp
            title={'Email'}
            value={email}
            onChangeText={setEmail}
            editable={false} // Prevents editing of email
          />
          <InputComp
            title={'Mobile'}
            value={mobile}
            onChangeText={setMobile}
            editable={false} // Prevents editing of mobile
          />
          <InputComp
            title={'New password'}
            value={password}
            onChangeText={setPassword}
            password={true} // Hides entered text
          />
          <InputComp
            title={'Confirm password'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            password={true} // Hides entered text
          />
          <Button w={30} h={5} br={6} title={'SignUp'} onPress={handleProfileUpdate} />

          <Text
            style={{
              color: Colors.grayText,
              alignSelf: 'center',
              marginVertical: 15,
            }}
            onPress={() => navigation.goBack()}>
            Back
          </Text>
          {/* <Button w={30} h={5} br={6} title={'Logout'} onPress={handleLogout} /> */}
        </ScrollView>
      </SafeAreaView>
      {loading ? <Loader /> : null}
    </>
  );
}

export default CreateAccount;
