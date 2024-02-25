import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Colors from '../Constants/Colors';
import FilterDropDown from './FilterDropDown';
const {width, height} = Dimensions.get('window');
const SearchBar = () => {
  const data = [
    {id: 1, name: 'ALL'},
    {id: 2, name: 'VIP'},
    {id: 3, name: 'FREE'},
  ];
  const [selectedItem, setSelectedItem] = useState(null);

  const onSelect = item => {
    setSelectedItem(item);
  };
  return (
    <View style={styles.searchbar_container}>
      <View style={styles.input_container}>
        <TextInput style={styles.input_field_style} placeholder="Search..." />

        <Image source={require('../assets/icons/search.png')} />
      </View>
      {/* <Image source={require('../assets/icons/filter.png')} /> */}
      <FilterDropDown data={data} onSelect={onSelect} value={selectedItem} />
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
