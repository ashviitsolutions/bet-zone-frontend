import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../Constants/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const ContactAreaComp = ({customStyle}) => {
  const navigation = useNavigation();

  const handleContactPress = () => {
    navigation.navigate('Contacts');
  };

  return (
    <SafeAreaView style={[styles.container,customStyle]}>
      <Text style={styles.infoText}>
        If you are having any issue in buying membership you can contact us directly
      </Text>
      <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
        <Image
          source={require('../assets/icons/phone.png')}
          style={styles.contactIcon}
        />
        <Text style={styles.contactText}>CONTACTS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, // assuming you have a background color defined
  },
  infoText: {
    color: Colors.grayText,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.5),
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:responsiveHeight(4)
  },
  contactIcon: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    tintColor: Colors.grayText,
    marginRight: responsiveWidth(2),
  },
  contactText: {
    color: Colors.grayText,
    fontSize: responsiveFontSize(1.3),
   
  },
});

export default ContactAreaComp;
