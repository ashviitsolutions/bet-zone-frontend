import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
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
import Loader from '../../../Components/Loader';

const { width } = Dimensions.get('screen');

const AddUser = () => {
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
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAddUser = async () => {
    if (mobile.length < 8) {
      ToastAndroid.show('Mobile number must be at 8 digits', ToastAndroid.LONG);
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
    const userData = {
      full_name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      mobile: mobile,
      auth_type: 'user',
      membershiplevel: value
    };
    try {
      const response = await fetch(`${IP}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      if (response.status === 200) {
        ToastAndroid.show('User added successfully', ToastAndroid.SHORT);
        setLoading(false);
        navigation.navigate('List');
      } else {
        setLoading(false);
        ToastAndroid.show(responseData.msg, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Image source={ImagePath.ProfileIcon} style={styles.profileIcon} />
          <Text style={styles.title}>ADD USER</Text>
        </View>
        <InputComp title={'Demo user'} onChangeText={(t) => setName(t)} />
        <InputComp title={'demo@gmail.com'} onChangeText={(t) => setEmail(t)} keyType={'email-address'} />
        <InputComp title={'Mobile'} onChangeText={(t) => setMobile(t)} keyType={'numeric'}/>
        <InputComp title={'New Password'} onChangeText={(t) => setPassword(t)} password={true} />
        <InputComp title={'Confirm Password'} onChangeText={(t) => setConfirmPassword(t)} password={true} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'No membership'}
          dropDownDirection="Bottom"
          dropDownContainerStyle={styles.dropDownContainer}
          style={styles.dropDown}
        />

        <Button w={30} h={5} br={6} title={'CREATE'} onPress={handleAddUser} />
        <Text onPress={() => navigation.goBack()} style={styles.backText}>Back</Text>
        {/* {loading && <ActivityIndicator size="large" color={Colors.yellowColor} />} */}
        <ContactAreaComp customStyle={{marginBottom:40}} />
      </ScrollView>
      {loading ? <Loader/>:null}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
  },
  scrollView: {
    padding: 10,
  },
  headerContainer: {
    alignItems: 'center',
    height: responsiveHeight(15),
    justifyContent: 'center',
  },
  profileIcon: {
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    tintColor: Colors.whiteText,
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
    marginLeft: responsiveWidth(2),
  },
  dropDownContainer: {
    borderRadius: responsiveWidth(2),
    width: responsiveWidth(85),
    alignSelf: 'center',
  },
  dropDown: {
    padding: 10,
    borderColor: Colors.grayText,
    color: Colors.whiteText,
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  backText: {
    color: Colors.grayText,
    alignSelf: 'center',
    marginVertical: responsiveHeight(1),
  },
});

export default AddUser;
