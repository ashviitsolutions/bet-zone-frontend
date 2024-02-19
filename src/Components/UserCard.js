import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const UserCard = ({item, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <View style={styles.first_row}>
        <Text style={styles.date_text}>{item.date}</Text>
        <View style={styles.game_icon_name_box}>
          <Image source={require('../assets/icons/football.png')} />
          <Text style={styles.game_text}>{item.game}</Text>
        </View>
      </View>

      <View style={styles.secound_row}>
        <Image
          source={require('../assets/Image/football.webp')}
          style={styles.img_style}
        />
        <View style={{width: responsiveWidth(52)}}>
          <Text style={styles.match_text}>{item.match}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.desc_text}>
            {item.desc}
          </Text>
        </View>
      </View>

      <View style={styles.third_row}>
        <Text style={styles.amount_text}>AMT - {item.amount}</Text>
        <Text style={styles.odd_text}>ODDS - {item.ODD}</Text>
        <Text style={styles.prob_text}>PROBS - {item.probs}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.brownColor,
    flex: 1,
    borderRadius: responsiveWidth(5),
    padding: 10,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  first_row: {
    width: responsiveWidth(90),
    height: responsiveHeight(3.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date_text: {color: Colors.grayText, fontSize: responsiveFontSize(1.5)},
  game_icon_name_box: {
    width: responsiveWidth(25),
    height: responsiveHeight(3),
    backgroundColor: Colors.secondaryColor,
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  game_text: {
    color: Colors.blackText,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '900',
  },
  secound_row: {
    width: responsiveWidth(90),
    height: responsiveHeight(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img_style: {
    width: responsiveWidth(32),
    height: responsiveHeight(12),
    borderRadius: responsiveWidth(2),
  },
  match_text: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
  },
  desc_text: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.4),
  },
  third_row: {
    width: responsiveWidth(90),
    height: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1),
    marginTop: '5%',
  },
  amount_text: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.5),
    fontWeight: '900',
  },
  odd_text: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.5),
    fontWeight: '900',
  },
  prob_text: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.5),
    fontWeight: '900',
  },
});
