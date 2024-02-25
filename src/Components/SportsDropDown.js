import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../Constants/Colors';

export default function SportsDropDown({
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
      <TouchableOpacity
        onPress={() => setShowOption(!showOption)}
        style={styles.sportBox}>
        <Image source={require('../assets/icons/run.png')} />
        <Text style={styles.sportText}>{value?.name ?? 'sports'}</Text>
        <Image source={require('../assets/icons/downArr.png')} />
      </TouchableOpacity>

      {showOption && (
        <View style={styles.DropDownBox}>
          {data.map((val, i) => (
            <TouchableOpacity
              onPress={() => onSelectedItem(val)}
              key={String(i)}
              style={{
                width: responsiveWidth(30),
                height: responsiveHeight(3),
                borderRadius: responsiveWidth(1),
                borderWidth: 1,
                alignItems: 'center',
                borderColor: Colors.grayText,
                backgroundColor:
                  value && value.id === val.id
                    ? Colors.grayText
                    : Colors.blackText,
                marginBottom: 1,
              }}>
              <Text style={{color: '#fff', fontWeight: '900'}}>{val.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sportBox: {
    width: responsiveWidth(30),
    height: responsiveHeight(3),
    backgroundColor: Colors.grayText,
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sportText: {
    color: Colors.blackText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
  },
  DropDownBox: {
    zIndex: 1,
    position: 'absolute',
    top: 25,
    // borderWidth: 2,
    // borderRadius: responsiveWidth(1),
    borderColor: Colors.grayText,
  },
});