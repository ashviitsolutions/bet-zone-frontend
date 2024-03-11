import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
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
import DropDownPicker from 'react-native-dropdown-picker';
const { width, height } = Dimensions.get('screen');
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../../Constants/Server';
import ContactAreaComp from '../../../Components/ContactAreaComp';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

function EditUser() {
  const route = useRoute();
  const item = route.params?.item || {};
  const [name, setName] = useState(item.full_name || '');
  const [email, setEmail] = useState(item.email || '');
  const [mobile, setMobile] = useState(item.mobile || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.membershiplevel || 'NO MEMBER');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigation = useNavigation();
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
      const response = await fetch(`${IP}/user/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(userData), // Convert the data to JSON string
      });

      const responseData = await response.json();
      console.log("responseData::", responseData)
      if (response.status === 200) {
        ToastAndroid.show('User update successfully', ToastAndroid.SHORT);
        console.log('User update successfully');
        setLoading(false);
        navigation.navigate('List');
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            EDIT USER
          </Text>
        </View>
        <TextInput
          placeholder="Demo user"
          value={name}
          onChangeText={(i) => setName(i)}
          placeholderTextColor={Colors.grayText}
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
        <TextInput
          placeholder="demo@gmail.com"
          placeholderTextColor={Colors.grayText}
          value={email}
          onChangeText={(i) => setEmail(i)}
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
        <TextInput
          placeholder="123849862"
          value={String(mobile)}
          onChangeText={(i) => setMobile(i)}
          placeholderTextColor={Colors.grayText}
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
        <TextInput
          placeholder="new password"
          value={password}
          secureTextEntry={true}
          onChangeText={(i) => setPassword(i)}
          placeholderTextColor={Colors.grayText}
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
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={(i) => setConfirmPassword(i)}
          placeholderTextColor={Colors.grayText}
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
          // disabled={item.membershiplevel ?true:false}
        />

        <Button
          w={30}
          h={5}
          br={6}
          title={'UPDATE'}
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

export default EditUser;
