import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import Colors from '../../Constants/Colors'
import ImagePath from '../../Constants/ImagePath';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import { responsiveWidth,responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
function SplashScreen() {
  const navigation = useNavigation();
    setTimeout(function () {
        navigation.replace(NavigationString.AUTH_LOGIN);
      }, 1200);
  return (
   <View style={{backgroundColor:Colors.mainColor,flex:1,justifyContent:'center',alignItems:'center'}}>
<Image
source={ImagePath.splashScreenIcon}
style={{width:responsiveWidth(100),height:responsiveHeight(60),resizeMode:'contain'}}
/>
   </View>
  )
}

export default SplashScreen