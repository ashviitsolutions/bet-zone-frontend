import React from 'react';
import {Dimensions, Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';
import ImagePath from '../Constants/ImagePath';
const {width, height} = Dimensions.get('screen');
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
function Button({w, h, title, br, onPress, customStyle,customStyleText}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        width: responsiveWidth(w),
        height: responsiveHeight(h),
        borderRadius: responsiveWidth(br),
        backgroundColor: Colors.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        elevation: 4,
        shadowColor: '#000',
        ...customStyle,
      }}>
      <Text style={{color: Colors.blackText, fontWeight: '500',...customStyleText}}>{title}</Text>
    </TouchableHighlight>
  );
}

export default Button;

