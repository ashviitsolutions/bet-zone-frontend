import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../Constants/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ImagePath from '../Constants/ImagePath';

const InputComp = ({ title, keyType, value, onChangeText, password }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        keyboardType={keyType}
        placeholder={title}
        placeholderTextColor={Colors.grayText}
        style={styles.input_style}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible && password}
      />
    {isPasswordVisible ?  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Image source={ImagePath.viewEyeIcon} style={styles.eyeIcon} />
        </TouchableOpacity>: password?  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Image source={ImagePath.hideEyeIcon} style={styles.eyeIcon} />
        </TouchableOpacity>:null}
       
      
      
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
  eyeIconContainer: {
    position: 'absolute',
    right: 30,
    top: 14,
    zIndex: 1,
  },
  eyeIcon: {
    width: 25,
    height: 25,
    tintColor:Colors.grayText
  },
});
