import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../Components/Header';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../../Constants/Colors';
import ImagePath from '../../Constants/ImagePath';
import {useNavigation} from '@react-navigation/native';
export default function DetailsPage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 10,
        }}>
        <View style={styles.headerBar_style}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={ImagePath.backIcon} style={styles.backIcon_style} />
            <Text style={{color: '#d0d0d0'}}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.date_text}>Tip-22:41 12-12-2021</Text>
        </View>
        <Image
          source={require('../../assets/Image/football.webp')}
          style={styles.img_style}
        />
        <Text style={styles.title_text}>Tanzania Vs Uganda</Text>
        <Text style={styles.desc_text}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of ublishing and graphic
          design, Lorem ipsum is a placeholder text commonly used to demonstrate
          the visual form of a document or a typeface without relying on
          meaningful content. Lorem ipsum may be used as a placeholder before
          the final copy is available.
        </Text>

        <View style={styles.last_box}>
          <Text style={styles.amt_text}>AMT - 200</Text>
          <Text style={styles.odd_text}>ODDS - 2.1</Text>
          <Text style={styles.probs_text}>PROBS -0.8</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backIcon_style: {
    width: 10,
    height: 10,
    tintColor: '#d0d0d0',
    marginRight: 4,
  },
  date_text: {color: '#d0d0d0', fontSize: responsiveFontSize(1.6)},
  img_style: {
    width: responsiveWidth(95),
    height: responsiveHeight(35),
    borderRadius: responsiveWidth(2),
  },
  title_text: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.9),
    fontWeight: '900',
  },
  desc_text: {
    color: '#d0d0d0',
    fontSize: responsiveFontSize(2.2),
    textAlign: 'left',
    marginTop: 10,
  },
  last_box: {
    width: responsiveWidth(90),
    height: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1),
    marginTop: 40,
    marginBottom: 35,
  },
  amt_text: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.8),
    fontWeight: '900',
  },
  odd_text: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.8),
    fontWeight: '900',
  },
  probs_text: {
    color: Colors.whiteText,
    fontSize: responsiveHeight(1.8),
    fontWeight: '900',
  },
});
