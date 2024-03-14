import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../Constants/Colors';
import FilterDropDown from './FilterDropDown';

const { height } = Dimensions.get('window');

const SearchBar = ({ onChangeText ,filtericon,setDropDownValue}) => {
  const data = [
    { id: 1, name: 'ALL' },
    { id: 2, name: 'VIP' },
    { id: 3, name: 'OLD' },
  ];
  const [selectedItem, setSelectedItem] = useState(null);
 const onSelect = (item) => {
  setDropDownValue(item.name)
   setSelectedItem(item);
  };

  const handleTextChange = (text) => {
    onChangeText(text); // Notify parent component about the text change
  };

  return (
    <View style={[styles.searchbar_container,{width:filtericon?'100%':'105%'}]}>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input_field_style}
          placeholder="Search..."
          onChangeText={handleTextChange} // Handle text input changes
          placeholderTextColor={'#000'}
        />

        <Image source={require('../assets/icons/search.png')} />
      </View>
      {/* <Image source={require('../assets/icons/filter.png')} /> */}
     {filtericon ?  <FilterDropDown data={data} onSelect={onSelect} value={selectedItem} />: null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchbar_container: {
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
    color: '#000',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '900',
    paddingVertical: 2,
    width: '80%',
  },
});
