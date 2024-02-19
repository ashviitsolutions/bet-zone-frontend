import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid
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
function AuthLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
     
    // if(email && password){
    //     try {
    //       const response = await fetch(`${IP}user/login`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           email: email,
    //           password: password,
    //         }),
    //       });
      
    //       if (!response.ok) {
    //         console.error('Authentication failed');
    //         return;
    //       }
    //       const responseData = await response.json();
    //     //   const authToken = responseData.token;
    //       navigation.navigate(NavigationString.TABS, { isAdmin: true });
      
    //     } 
        
    //     catch (error) {
    //       console.error('Error during login:', error);
    //     }
    // }

    // else{
    //     ToastAndroid.show('Enter email/password', ToastAndroid.SHORT);
    // }
    navigation.navigate(NavigationString.TABS, { isAdmin: true });
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
        <View style={styles.header}>
          <Image
            source={ImagePath.ProfileIcon}
            style={styles.ProfileIcon_style}
          />
          <Text style={styles.login_text}>LOGIN</Text>
        </View>

        <InputComp 
        title={'email'} 
        value={email} 
        onChangeText={setEmail} 
        keyType={'email-address'}
        />

        <InputComp
          title={'password'}
          value={password}
          onChangeText={setPassword}
          password={true}
        />

        <Button w={30} h={5} br={6} title={'LOGIN'} onPress={handleLogin} />
        <ContactAreaComp />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AuthLogin;

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileIcon_style: {
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    tintColor: Colors.whiteText,
  },
  login_text: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
  },
});
