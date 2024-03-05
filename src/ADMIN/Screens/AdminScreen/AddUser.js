import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
  View,
  ToastAndroid,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
import Tabs from '../../../Navigation/TabsNav';

import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import InputComp from '../../../Components/InputComp';
import { IP } from '../../../Constants/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactAreaComp from '../../../Components/ContactAreaComp';
const { width } = Dimensions.get('screen');


function AddUser() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('NO MEMBER');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [items, setItems] = useState([
    { label: 'No membership', value: 'NO MEMBER' },
    { label: '1 month membership', value: '1 MONTH' },
    { label: '3 month membership', value: '3 MONTH' },
  ]);




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



  const handleAddUser = async () => {
    setLoading(true);
    const userData = {
      full_name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      mobile: mobile,
      auth_type: 'user',
      membershiplevel: value
    };
    console.log("userData", userData)
    try {
      const response = await fetch(`${IP}/addUser`, {
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
        ToastAndroid.show('User add successfully', ToastAndroid.SHORT);
        console.log('User added successfully');
        setLoading(false);
        navigation.navigate('List');
      } else {
        setLoading(false);
        ToastAndroid.show(responseData.msg, ToastAndroid.SHORT);
        console.log('Error:', responseData.msg);
        // Handle error messages appropriately, e.g., show them to the user
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setLoading(false);
      // Handle network errors or other unexpected errors
    }
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: '100%',
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
            ADD USER
          </Text>
        </View>
        <InputComp title={'Demo user'} onChangeText={(t) => setName(t)} />
        <InputComp
          title={'demo@gmail.com'}
          onChangeText={(t) => setEmail(t)}
          keyType={'email-address'}
        />
        <InputComp title={'mobile'} onChangeText={(t) => setMobile(t)} keyType={'numeric'}/>
        <InputComp title={'new password'} onChangeText={(t) => setPassword(t)} />
        <InputComp
          title={'confirm password'}
          onChangeText={(t) => setConfirmPassword(t)}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'No membership'}
          dropDownDirection="Bottom"
          dropDownContainerStyle={{
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
          }}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),
          }}
        />

        <Button
          w={30}
          h={5}
          br={6}
          title={'CREATE'}
          onPress={handleAddUser}
        />

        <Text
          onPress={() => navigation.goBack()}
          style={{
            color: Colors.grayText,
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          Back
        </Text>
        {loading && <ActivityIndicator size="large" color={Colors.yellowColor} />}
        <ContactAreaComp />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddUser;
