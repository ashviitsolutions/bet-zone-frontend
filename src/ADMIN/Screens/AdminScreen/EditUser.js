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
  StyleSheet,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../../Constants/Server';
import ContactAreaComp from '../../../Components/ContactAreaComp';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import InputComp from '../../../Components/InputComp';

const { width, height } = Dimensions.get('screen');

const EditUser = () => {
  const route = useRoute();
  const item = route.params?.item || {};
  const navigation = useNavigation();

  const [name, setName] = useState(item.full_name || '');
  const [email, setEmail] = useState(item.email || '');
  const [mobile, setMobile] = useState(String(item.mobile) || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.membershiplevel || 'NO MEMBER');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [items, setItems] = useState([
    { label: 'No membership', value: 'NO MEMBER' },
    { label: '1 month membership', value: '1 MONTH' },
    { label: '3 month membership', value: '3 MONTH' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    const userData = {
      full_name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      mobile: mobile,
      auth_type: 'user',
      membershiplevel: value,
    };

    try {
      const response = await fetch(`${IP}/user/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      if (response.status === 200) {
        ToastAndroid.show('User update successfully', ToastAndroid.SHORT);
        setLoading(false);
        navigation.navigate('List');
      } else {
        setLoading(false);
        console.log('Error:', responseData.msg);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <Image source={ImagePath.ProfileIcon} style={styles.profileIcon} />
          <Text style={styles.profileHeaderText}>EDIT USER</Text>
        </View>
        <InputComp title={'Full Name'} value={name} onChangeText={(i) => setName(i)} />
        <InputComp title={'Email'} value={email} onChangeText={(i) => setEmail(i)} keyboardType={'email-address'} />
        <InputComp title={'Mobile No.'} value={mobile} onChangeText={(i) => setMobile(i)} keyboardType={'numeric'} />
        <InputComp title={'New Password'} value={password} onChangeText={(i) => setPassword(i)} secureTextEntry={true} />
        <InputComp title={'Confirm Password'} value={confirmPassword} onChangeText={(i) => setConfirmPassword(i)} secureTextEntry={true} />
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
        <Button w={30} h={5} br={6} title={'UPDATE'} onPress={handleAddUser} />
        <Text style={styles.backText} onPress={() => navigation.goBack()}>Back</Text>
        {loading && <ActivityIndicator size="large" color={Colors.yellowColor} />}
        <ContactAreaComp customStyle={{marginBottom:10}} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.mainColor,
    padding: 10,
  },
  profileHeader: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    tintColor: Colors.whiteText,
  },
  profileHeaderText: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
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
    marginVertical: 15,
  },
});
