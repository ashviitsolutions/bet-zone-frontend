import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Constants/Colors';

const AdminHeaderBar = ({leftTitle, rightTitle, onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.leftTitle_text}>{leftTitle}</Text>

      <Text onPress={onPress} style={styles.rightTitle_text}>
        {rightTitle}
      </Text>
    </View>
  );
};

export default AdminHeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    paddingBottom: responsiveHeight(1),
  },
  leftTitle_text: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
  },
  rightTitle_text: {
    color: Colors.yellowColor,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
  },
});
