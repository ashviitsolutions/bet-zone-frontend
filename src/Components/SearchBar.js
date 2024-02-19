import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Colors from '../Constants/Colors';
const {width, height} = Dimensions.get('window');
const SearchBar = () => {
  return (
    <View style={styles.searchbar_container}>
      <View style={styles.input_container}>
        <TextInput style={styles.input_field_style} placeholder="Search..." />

        <Image source={require('../assets/icons/search.png')} />
      </View>
      <Image source={require('../assets/icons/filter.png')} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchbar_container: {
    width: '100%',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input_container: {
    backgroundColor: '#D9D9D9',
    width: '93%',
    height: '75%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input_field_style: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '900',
    paddingVertical: 2,
    width: '80%',
  },
});
