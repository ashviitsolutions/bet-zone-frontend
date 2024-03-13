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
import {useNavigation, useRoute} from '@react-navigation/native';
import { IP } from '../../Constants/Server';
export default function DetailsPage() {
  const navigation = useNavigation();
  const route = useRoute()
  console.log(route.params.item.date)
  const originalTimestamp = (route.params.item.date);
  const dateObject = new Date(originalTimestamp);
  
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
  const year = dateObject.getFullYear();
  
  const finalFormattedString = `${hours}:${minutes} ${day}-${month}-${year}`;
  

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
          <Text style={styles.date_text}>Tip - {finalFormattedString}</Text>
        </View>
        <Image
          // source={require('../../assets/Image/football.webp')}
          source={ {uri: `${IP}/file/${route.params.item.attachments}`}}
          style={styles.img_style}
        />
          <Text style={styles.title_text}>{route.params.item.title}</Text>
        <Text style={styles.desc_text}>
         {route.params.item.description}
        </Text>

        <View style={styles.last_box}>
          <Text style={styles.amt_text}>AMT - {route.params.item.amt}</Text>
          <Text style={styles.odd_text}>ODDS - {route.params.item.odds}</Text>
          <Text style={styles.probs_text}>PROBS -{route.params.item.probs}</Text>
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
    marginTop:10
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
