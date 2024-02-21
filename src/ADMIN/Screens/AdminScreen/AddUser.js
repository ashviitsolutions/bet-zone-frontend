import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
import Tabs from '../../../Navigation/TabsNav';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import InputComp from '../../../Components/InputComp';
import { IP } from '../../../Constants/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
function AddUser() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1 months membership', value: '1 months membership'},
    {label: '3 months membership', value: '3 months membership'},
    {label: '6 months membership', value: '6 months membership'},
  ]);
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

  const handleAddUser=async ()=>{
    const formData = new FormData()
    formData.append('full_name','pradeep'),
    formData.append('email','pradeep')
    formData.append('password','pradeep')
    formData.append('confirm_password','pradeep')
    formData.append('mobile',433432)
    formData.append('auth_type','dsakldl')
    formData.append('membership',items)

    const response = await fetch(`${IP}/addUser`,{
      method:'POST',
      headers: {
        Authorization:token
      },
      body:formData
    })

    const responseData = await response.json()
    console.log('data',responseData)

  navigation.navigate('List')
  }
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
            ADD USER
          </Text>
        </View>
        <InputComp title={'Demo user'} />
        <InputComp title={'demo@gmail.com'} />
        <InputComp title={'123849862'} />
        <InputComp title={'new password'} />
        <InputComp title={'confirm password'} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'membership'}
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
          onPress={()=>navigation.goBack()}
          style={{
            color: Colors.grayText,
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          Back
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddUser;
