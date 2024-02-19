import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const InputComp = ({title, keyType,value,onChangeText,password}) => {
  return (
    <View style={{flex: 1}}>
      <TextInput
        keyboardType={keyType}
        placeholder={title}
        placeholderTextColor={Colors.grayText}
        style={styles.input_style}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  input_style: {
    padding: 10,
    borderColor: Colors.grayText,
    color: Colors.whiteText,
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginBottom: responsiveHeight(1.5),
  },
});
