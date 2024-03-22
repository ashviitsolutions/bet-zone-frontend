import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {IP} from '../../../Constants/Server';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import InputComp from '../../../Components/InputComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Components/Loader';
import NavigationString from '../../../Constants/NavigationString';

const {width, height} = Dimensions.get('screen');

const AdminProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);

      const storedEmail = await AsyncStorage.getItem('email');
      const storedMobile = await AsyncStorage.getItem('mobile');
      const storedName = await AsyncStorage.getItem('full_name');

      setEmail(storedEmail || '');
      setMobile(storedMobile || '');
      setName(storedName || '');
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = () => {
    fetchData();
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    const userData = {
      full_name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      mobile: mobile,
      auth_type: 'admin',
    };

    try {
      const response = await fetch(`${IP}/updateprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      if (response.status === 200) {
        setLoading(false);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('mobile', mobile);
        await AsyncStorage.setItem('full_name', name);
      } else {
        setLoading(false);
        console.log('Error:', responseData.msg);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace(NavigationString.TABS);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Button
          w={20}
          h={4}
          br={6}
          title={'Logout'}
          onPress={handleLogout}
          customStyle={styles.logoutButton}
        />
        <View style={styles.profileHeader}>
          <Image source={ImagePath.ProfileIcon} style={styles.profileIcon} />
          <Text style={styles.profileHeaderText}>ADMIN</Text>
        </View>
        <InputComp title={'Admin name'} value={name} onChangeText={setName} />
        <InputComp
          title={'Email'}
          value={email}
          onChangeText={setEmail}
          editable={false}
        />
        <InputComp
          title={'Mobile'}
          value={mobile}
          onChangeText={setMobile}
          editable={false}
        />
        <InputComp
          title={'New password'}
          value={password}
          onChangeText={setPassword}
          password={true}
        />
        <InputComp
          title={'Confirm password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          password={true}
        />
        <Button
          w={30}
          h={5}
          br={6}
          title={'UPDATE'}
          onPress={handleProfileUpdate}
          customStyle={styles.updateButton}
        />
        {/* <Text style={styles.backText} onPress={() => navigation.goBack()}>
          Back
        </Text> */}
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.mainColor,
    height: responsiveHeight(100),
    padding: 10,
  },
  logoutButton: {
    alignSelf: 'flex-end',
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
  updateButton: {
    alignSelf: 'center',
    marginVertical: responsiveHeight(1),
  },
  backText: {
    color: Colors.grayText,
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
  },
});
