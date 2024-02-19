import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const AdminCard = ({item, onPress}) => {
  const {type} = item;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: type === 'VIP' ? Colors.brownColor : Colors.lightBrown,
        // width: responsiveWidth(95),
        // height: responsiveHeight(22.5),
        flex: 1,
        borderRadius: responsiveWidth(5),
        padding: 10,
        justifyContent: 'space-evenly',
        marginVertical: 10,
        borderWidth: type === 'VIP' ? 1 : null,
        borderColor: type === 'VIP' ? Colors.yellowColor : null,
      }}>
      <View
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(3.8),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View
          style={{
            borderRadius: responsiveWidth(3),
            width: responsiveWidth(12),
            borderColor: type === 'VIP' ? Colors.yellowColor : Colors.grayText,
            borderWidth: 2,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: type === 'VIP' ? Colors.whiteText : Colors.grayText,
              alignSelf: 'center',
              fontWeight: '900',
            }}>
            {item.type}
          </Text>
        </View>
        <View style={styles.game_Icon_Name_box}>
          <Image source={require('../assets/icons/football.png')} />
          <Text style={styles.gameNameText}>{item.game}</Text>
        </View>
      </View>

      <View style={styles.secondRow}>
        <Image source={item.img} style={styles.imgStyle} />
        <View style={{width: responsiveWidth(52)}}>
          <Text style={styles.titleText}>{item.match}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.descText}>
            {item.desc}
          </Text>
        </View>
      </View>

      <View style={styles.thirdRow}>
        <Text style={styles.amtText}>AMT - {item.amounts}</Text>
        <Text style={styles.oddText}>ODDS - {item.ODD}</Text>
        <Text style={styles.probsText}>PROBS - {item.probs}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdminCard;

const styles = StyleSheet.create({
  dateText: {color: Colors.grayText, fontSize: responsiveFontSize(1.5)},
  game_Icon_Name_box: {
    width: responsiveWidth(25),
    height: responsiveHeight(3),
    backgroundColor: Colors.secondaryColor,
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  gameNameText: {
    color: Colors.blackText,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '900',
  },
  secondRow: {
    width: responsiveWidth(90),
    height: responsiveHeight(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgStyle: {
    width: responsiveWidth(32),
    height: responsiveHeight(12),
    borderRadius: responsiveWidth(2),
  },
  titleText: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
  },
  descText: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.4),
  },
  thirdRow: {
    width: responsiveWidth(90),
    height: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1),
    marginTop: '5%',
  },
  amtText: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.5),
    fontWeight: '900',
  },
  oddText: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.5),
    fontWeight: '900',
  },
  probsText: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.5),
    fontWeight: '900',
  },
});
