import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
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
import {IP} from '../../Constants/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';

function UpdateProfile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    try {
      setRefreshing(true);
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
    } finally {
      setRefreshing(false);
    }
  }
  useEffect(() => {
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
    };

    try {
      const response = await fetch(`${IP}/user/update`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(userData), // Convert the data to JSON string
      });

      const responseData = await response.json();
      console.log('responseData', responseData);
      if (response.status === 200) {
        console.log('Profile update successfully');
        setLoading(false);
        // Update local storage data
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('mobile', mobile);
        await AsyncStorage.setItem('full_name', name);
        onRefresh();
      } else {
        setLoading(false);
        console.log('Error:', responseData.msg);
        // Handle error messages appropriately, e.g., show them to the user
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
      // Handle network errors or other unexpected errors
    }
  };
  const onRefresh = () => {
    fetchData(); // Call fetchData when the user pulls to refresh
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace(NavigationString.TABS);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <ScrollView
        style={styles.ScrollViewContent}
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
        <View style={styles.headingView}>
          <Image
            source={ImagePath.ProfileIcon}
            style={styles.ProfileIconStyle}
          />
          <Text style={styles.UpdateProfileText}>UPDATE PROFILE</Text>
        </View>
        <InputComp title={'Full name'} value={name} onChangeText={setName} />
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
        <Button
          w={30}
          h={5}
          br={6}
          title={'Update'}
          onPress={handleProfileUpdate}
        />
        <Text
          style={{
            color: Colors.grayText,
            alignSelf: 'center',
            marginVertical: 15,
          }}
          onPress={handleLogout}>
          Back
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  ScrollViewContent: {
    backgroundColor: Colors.mainColor,
    height: '100%',
    padding: 10,
  },
  ProfileIconStyle: {
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    tintColor: Colors.whiteText,
  },
  UpdateProfileText: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
  },
  headingView: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    alignSelf: 'flex-end',
  },
});
