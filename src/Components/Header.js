import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Colors from '../Constants/Colors';
import ImagePath from '../Constants/ImagePath';
const {width, height} = Dimensions.get('screen');
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
function Header() {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={ImagePath.headerIcon}
        style={{resizeMode: 'contain', height: responsiveHeight(7)}}
      />
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  mainContainer: {
    height: responsiveHeight(10),
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
