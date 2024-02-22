import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import Colors from '../Constants/Colors';
import ImagePath from '../Constants/ImagePath';
const {width, height} = Dimensions.get('screen');
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions"
function Header() {
  return (
   <View style={{height:responsiveHeight(10),backgroundColor:Colors.mainColor,justifyContent:'center',alignItems:'center'}}>

<Image 
source={ImagePath.headerIcon}
style={{resizeMode:'contain',height:responsiveHeight(7)}}
/>
   </View>

  )
}

export default Header