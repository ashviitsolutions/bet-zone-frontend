import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../Components/Header';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../../../Constants/Colors';
import ImagePath from '../../../Constants/ImagePath';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from '../../../Components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function EditTip() {
  const navigation = useNavigation();
  const route = useRoute();
  const {match, desc, ODD, probs, amounts, img, date} = route.params.item;

  const [title, setTitle] = useState(match);
  const [description, setDescription] = useState(desc);
  const [amount, setAmount] = useState(amounts);
  const [odds, setOdds] = useState(ODD);
  const [prob, setProb] = useState(probs);

  const [image, setImage] = useState('');

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
        // console.log(imageUri)
      }
    });
  };
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />

      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: '100%',
          padding: 10,
        }}>
        <View style={styles.topHeader}>
          <View style={styles.sportsBox}>
            <Image source={require('../../../assets/icons/football.png')} />
            <Text style={styles.sportsText}>SPORT</Text>
            <Image source={require('../../../assets/icons/downArr.png')} />
          </View>
          <View style={styles.VipBox}>
            <Text style={styles.vipText}>VIP</Text>
            <Image source={require('../../../assets/icons/whiteDwnArr.png')} />
          </View>
          <View style={styles.dateBox}>
            <Image
              source={require('../../../assets/icons/solar_calendar-linear.png')}
              style={styles.calenderImg}
            />
            <Text style={styles.dateTextStyle}>{date}</Text>
          </View>
        </View>
        <View style={styles.imgBox}>
          <Image source={{uri: image}} style={styles.imgStyle} />
        </View>
        <Text style={styles.titleText}>TIP TITLE</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(93),
          }}>
          <View style={styles.titleInputBox}>
            <TextInput
              style={styles.titleInputStyle}
              value={title}
              onChangeText={t => setTitle(t)}
            />
          </View>

          <View style={styles.changeBtn}>
            <Text onPress={openImagePicker} style={styles.changeTextStyle}>
              CHANGE PIC
            </Text>
          </View>
        </View>

        <Text style={styles.descText}>TIP DISCRIPTION</Text>
        <View style={styles.descBox}>
          <TextInput
            style={styles.descInput}
            multiline={true}
            value={description}
            onChangeText={t => setDescription(t)}
          />
        </View>

        <View style={styles.inputFiledView}>
          <View>
            <Text style={styles.inputHeading}>AMOUNT</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.intputStyle}
                keyboardType="numeric"
                value={amount}
                onChangeText={t => setAmount(t)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputHeading}>ODDS</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.intputStyle}
                keyboardType="numeric"
                value={odds}
                onChangeText={t => setOdds(t)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputHeading}>PROBS.</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.intputStyle}
                keyboardType="numeric"
                value={prob}
                onChangeText={t => setProb(t)}
              />
            </View>
          </View>
        </View>

        <View style={styles.btnsBox}>
          <View style={styles.backBtn}>
            <Text
              onPress={() => navigation.goBack()}
              style={{color: Colors.grayText, alignSelf: 'center'}}>
              {' '}
              BACK
            </Text>
          </View>
          <Button
            w={20}
            h={4}
            br={2}
            title={'UPDATE'}
            customStyle={{marginTop: 0}}
            onPress={() => navigation.navigate('NewTips')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  sportsText: {
    color: Colors.blackText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
  },
  sportsBox: {
    width: responsiveWidth(30),
    height: responsiveHeight(3),
    backgroundColor: Colors.grayText,
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  VipBox: {
    width: responsiveWidth(20),
    height: responsiveHeight(3),
    borderRadius: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'center',
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
  dateBox: {
    borderColor: Colors.grayText,
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    padding: 5,
    flexDirection: 'row',
  },
  calenderImg: {
    width: 20,
    height: 20,
    tintColor: Colors.grayText,
    marginRight: responsiveWidth(2),
  },
  dateTextStyle: {
    color: '#d0d0d0',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '900',
  },
  imgBox: {
    width: responsiveWidth(93),
    height: responsiveHeight(30),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayText,
    overflow: 'hidden',
  },
  imgStyle: {
    width: responsiveWidth(95),
    height: responsiveHeight(30),
    borderRadius: responsiveWidth(2),
  },
  titleInputBox: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(60),
    height: responsiveHeight(5),
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleInputStyle: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '900',
    paddingVertical: 2,
    width: '70%',
  },
  titleText: {color: Colors.grayText, marginVertical: 5},
  changeTextStyle: {color: Colors.grayText, alignSelf: 'center'},
  changeBtn: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(25),
    borderRadius: 10,
    height: responsiveHeight(5),
    justifyContent: 'center',
  },
  descInput: {color: '#fff', fontSize: responsiveFontSize(1.9)},
  descBox: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(93),
    height: responsiveHeight(17),
    borderRadius: 10,
    padding: 5,
  },
  descText: {color: Colors.grayText, marginVertical: 5, marginTop: 10},
  inputFiledView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  intputStyle: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '900',
    paddingVertical: 2,
    width: '70%',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(25),
    height: responsiveHeight(4),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputHeading: {
    color: Colors.grayText,
    fontSize: responsiveFontSize(1.4),
    marginVertical: 5,
  },
  btnsBox: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },
  backBtn: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(25),
    borderRadius: 10,
    height: responsiveHeight(4),
    justifyContent: 'center',
  },
});
