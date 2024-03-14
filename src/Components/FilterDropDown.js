import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../Constants/Colors';

export default function FilterDropDown({
  data = [],
  value = {},
  onSelect = () => {},
}) {
  const [showOption, setShowOption] = useState(false);

  const onSelectedItem = (val) => {
    setShowOption(false);
    onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowOption(!showOption)}>
        <Image source={require('../assets/icons/filter.png')} />
      </TouchableOpacity>

      {showOption && (
        <View style={styles.dropDownBox}>
          {data.map((val, i) => (
            <TouchableOpacity
              onPress={() => onSelectedItem(val)}
              key={String(i)}
              style={[
                styles.optionItem,
                {
                  backgroundColor: value && value.id === val.id ? Colors.grayText : '#fff',
                },
              ]}
            >
              <Text style={styles.optionText}>{val.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Add container styles if needed
  },
  dropDownBox: {
    zIndex: 1,
    position: 'absolute',
    top: 25,
    left: -40,
    borderColor: Colors.grayText,
  },
  optionItem: {
    width: responsiveWidth(15),
    height: responsiveHeight(3),
    borderRadius: responsiveWidth(1),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
    borderColor: Colors.grayText,
  },
  optionText: {
    color: Colors.blackText,
    fontWeight: '900',
  },
});
