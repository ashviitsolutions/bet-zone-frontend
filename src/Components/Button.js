import React from 'react';
import { Dimensions, Image, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';
import ImagePath from '../Constants/ImagePath';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('screen');

function Button({ w, h, title, br, onPress, customStyle, customStyleText }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.buttonContainer, {
        width: responsiveWidth(w),
        height: responsiveHeight(h),
        borderRadius: responsiveWidth(br),
      }, customStyle]}
    >
      <Text style={[styles.buttonText, customStyleText]}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
  },
  buttonText: {
    color: Colors.blackText,
    fontWeight: '500',
  },
});

export default Button;
