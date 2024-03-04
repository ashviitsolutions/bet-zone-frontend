import React, { useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Constants/Colors';
import ImagePath from '../../Constants/ImagePath';
import { useNavigation } from '@react-navigation/native';
import NavigationString from '../../Constants/NavigationString';
import { IP } from '../../Constants/Server'; // Import IP from Server constants

const { width, height } = Dimensions.get('screen');

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserTypeAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch(`${IP}/user/my_profile`, {
            headers: {
              Authorization: token,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            console.log("user my profile", userData)
            if (userData && userData.auth_type) {
              if (userData.auth_type === 'user') {
                navigation.replace(NavigationString.TABS);
              } else if (userData.auth_type === 'admin') {
                navigation.replace(NavigationString.Admin_Tabs);
              } else {
                navigation.replace(NavigationString.TABS);
              }
            } else {
              // Handle missing user data
              navigation.replace(NavigationString.TABS);
            }
          } else {
            // Handle unsuccessful response
            navigation.replace(NavigationString.TABS);
          }
        } else {
          setTimeout(() => {
            navigation.replace(NavigationString.TABS);
          }, 3000);
        }
      } catch (error) {
        console.error('Error during splash screen:', error);
        navigation.replace(NavigationString.TABS);
        // Handle error
        // setTimeout(() => {
        //   navigation.replace(NavigationString.AUTH_LOGIN);
        // }, 3000);
      }
    };

    checkUserTypeAndNavigate();
  }, []);

  return (
    <View style={{ backgroundColor: Colors.mainColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={ImagePath.splashScreenIcon}
        style={{ width: width, height: height, resizeMode: 'contain' }}
      />
    </View>
  );
}

export default SplashScreen;
