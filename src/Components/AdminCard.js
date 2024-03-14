import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { IP } from '../Constants/Server';

const AdminCard = ({ item, onPress }) => {
  const { type } = item;

  const originalTimestamp = item.date;
  const dateObject = new Date(originalTimestamp);
  
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
  const year = dateObject.getFullYear();
  
  const finalFormattedString = `${hours}:${minutes} ${day}-${month}-${year}`;
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.cardContainer,
        {
          backgroundColor: type === 'VIP' ? Colors.brownColor : Colors.lightBrown,
          borderWidth: type === 'VIP' ? 1 : 0,
          borderColor: type === 'VIP' ? Colors.yellowColor : 'transparent',
        }
      ]}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{finalFormattedString}</Text>
        <View style={[styles.typeContainer, { borderColor: type === 'VIP' ? Colors.yellowColor : Colors.grayText }]}>
          <Text style={[styles.typeText,{color: type === 'VIP' ? Colors.whiteText : Colors.grayText,}]}>{item.type || 'null'}</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image source={require('../assets/icons/football.png')} />
          <Text style={styles.gameText}>{item.category || 'null'}</Text>
        </View>
      </View>

      <View style={styles.secondRow}>
        <Image
          source={{ uri: `${IP}/file/${item.attachments}` }}
          style={styles.imageStyle}
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.descriptionText}>
            {item.description}
          </Text>
        </View>
      </View>

      <View style={styles.thirdRow}>
        <Text style={styles.amtText}>AMT - {item.amt}</Text>
        <Text style={styles.oddText}>ODDS - {item.odds}</Text>
        <Text style={styles.probsText}>PROBS - {item.probs}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: responsiveWidth(5),
    padding: 10,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  dateContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(3.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: Colors.grayText,
    fontSize: responsiveFontSize(1.5),
  },
  typeContainer: {
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(12),
    borderWidth: 2,
  },
  typeText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
    alignSelf: 'center',
  },
  gameContainer: {
    width: responsiveWidth(25),
    height: responsiveHeight(3),
    backgroundColor: Colors.secondaryColor,
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  gameText: {
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
  imageStyle: {
    width: responsiveWidth(32),
    height: responsiveHeight(12),
    borderRadius: responsiveWidth(2),
  },
  textContainer: {
    width: responsiveWidth(52),
  },
  titleText: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(2),
    fontWeight: '900',
  },
  descriptionText: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.4),
  },
  thirdRow: {
    width: responsiveWidth(90),
    height: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default AdminCard;
