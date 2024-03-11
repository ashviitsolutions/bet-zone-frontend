import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
  const onSelectedItem = val => {
    setShowOption(false);
    onSelect(val);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setShowOption(!showOption)}>
        <Image source={require('../assets/icons/filter.png')} />
      </TouchableOpacity>

      {showOption && (
        <View style={styles.DropDownBox}>
          {data.map((val, i) => (
            <TouchableOpacity
              onPress={() => onSelectedItem(val)}
              key={String(i)}
              style={{
                width: responsiveWidth(15),
                height: responsiveHeight(3),
                borderRadius: responsiveWidth(1),
                borderWidth: 1,
                alignItems: 'center',
                borderColor: Colors.grayText,
                backgroundColor:
                  value && value.id === val.id ? Colors.grayText : '#fff',
                marginBottom: 1,
              }}>
              <Text style={{color: Colors.blackText, fontWeight: '900'}}>
                {val.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vipBox: {
    width: responsiveWidth(20),
    height: responsiveHeight(3),
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: Colors.grayText,
  },
  vipText: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
  },
  DropDownBox: {
    zIndex: 1,
    position: 'absolute',
    top: 25,
    borderColor: Colors.grayText,
    left: -40,
  },
});
