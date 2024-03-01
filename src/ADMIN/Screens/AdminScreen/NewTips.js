import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../Components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IP} from '../../../Constants/Server';
import NavigationString from '../../../Constants/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownComp from '../../../Components/DropDownComp';
import SportsDropDown from '../../../Components/SportsDropDown';
export default function NewTips() {
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amt, setAmt] = useState('');
  const [odds, setOdds] = useState('');
  const [probs, setProbs] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const data = [
    {id: 1, name: 'VIP'},
    {id: 2, name: 'OLD'},
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = item => {
    setType(item.name);
    setSelectedItem(item);
  };

  const data2 = [
    {id: 1, name: 'BaseBall'},
    {id: 2, name: 'Cricket'},
    {id: 3, name: 'Football'},
    {id: 4, name: 'Tennis'},
  ];
  const [sportsSelectedItem, setSportsSelectedItem] = useState(null);

  console.log(
    'User sportsSelectedItem image picker',
    sportsSelectedItem,
    selectedItem,
  );
  const onSportsSelect = item => {
    setCategory(item.name);
    setSportsSelectedItem(item);
  };
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
  // const token =  AsyncStorage.getItem('token');
  const [token, setToken] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSaveTip = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('amt', amt);
      formData.append('odds', odds);
      formData.append('probs', probs);
      formData.append('type', type);
      formData.append('category', category);
      if (image) {
        formData.append('postImages', {
          uri: image,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }

      const response = await fetch(`${IP}/service/add`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (response.ok) {
        navigation.navigate('AdminHomePage'); // Navigate on success
      } else {
        // Handle non-OK response
        console.error('Response Error:', response.status);
        const responseData = await response.json();
        console.error('Error Data:', responseData);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error.message);
      console.error('Stack Trace:', error.stack);
      // Handle other errors, such as network errors
    }
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
        <View style={styles.hedaerSub}>
          <SportsDropDown
            data={data2}
            onSelect={onSportsSelect}
            value={sportsSelectedItem}
          />

          <DropDownComp data={data} onSelect={onSelect} value={selectedItem} />
          <View style={styles.date_box}>
            <Image
              source={require('../../../assets/icons/solar_calendar-linear.png')}
              style={styles.calender_icon}
            />
            <Text style={styles.date_text}>Select date/time</Text>
          </View>
        </View>
        <View style={styles.img_box}>
          <Image source={{uri: image}} style={styles.imgStyle} />
        </View>
        <Text style={{color: Colors.grayText, marginVertical: 5}}>
          TIP TITLE
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(93),
          }}>
          <View style={styles.title_box}>
            <TextInput
              style={styles.title_input}
              onChangeText={t => setTitle(t)}
              placeholder="enter tip titile"
              placeholderTextColor={Colors.grayText}
            />
          </View>
          <View style={styles.changePic_box}>
            <Text
              onPress={openImagePicker}
              style={{color: Colors.grayText, alignSelf: 'center'}}>
              CHANGE PIC
            </Text>
          </View>
        </View>

        <Text style={styles.desc_text_title}>TIP DISCRIPTION</Text>
        <View style={styles.desc_box}>
          <TextInput
            style={{color: '#fff', fontSize: responsiveFontSize(1.9)}}
            multiline={true}
            placeholder="enter tip discription"
            placeholderTextColor={Colors.grayText}
            onChangeText={t => setDescription(t)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View>
            <Text style={styles.input_field_title}>AMOUNT</Text>
            <View style={styles.input_field_box}>
              <TextInput
                style={styles.input_filed}
                onChangeText={t => setAmt(t)}
                keyboardType="numeric"
                placeholder="enter amount"
                placeholderTextColor={Colors.grayText}
              />
            </View>
          </View>
          <View>
            <Text style={styles.input_field_title}>ODDS</Text>
            <View style={styles.input_field_box}>
              <TextInput
                style={styles.input_filed}
                onChangeText={t => setOdds(t)}
                keyboardType="numeric"
                placeholder="enter odds"
                placeholderTextColor={Colors.grayText}
              />
            </View>
          </View>
          <View>
            <Text style={styles.input_field_title}>PROBS.</Text>
            <View style={styles.input_field_box}>
              <TextInput
                style={styles.input_filed}
                onChangeText={t => setProbs(t)}
                keyboardType="numeric"
                placeholder="enter probs."
                placeholderTextColor={Colors.grayText}
              />
            </View>
          </View>
        </View>

        <View style={styles.last_row}>
          <View style={styles.back_Box}>
            <Text onPress={() => navigation.goBack()} style={styles.back_text}>
              {' '}
              BACK
            </Text>
          </View>
          <Button
            w={20}
            h={4}
            br={2}
            title={'SAVE'}
            customStyle={{marginTop: 0}}
            onPress={handleSaveTip}
            // onPress={() => navigation.navigate('AdminHomePage')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hedaerSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  sportText: {
    color: Colors.blackText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
  },
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
  vipText: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '900',
  },
  vipBox: {
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
  imgStyle: {
    width: responsiveWidth(95),
    height: responsiveHeight(30),
    borderRadius: responsiveWidth(2),
  },
  img_box: {
    width: responsiveWidth(93),
    height: responsiveHeight(30),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayText,
    overflow: 'hidden',
  },
  date_text: {
    color: '#d0d0d0',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '900',
  },
  calender_icon: {
    width: 20,
    height: 20,
    tintColor: Colors.grayText,
    marginRight: responsiveWidth(2),
  },
  date_box: {
    borderColor: Colors.grayText,
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    padding: 5,
    flexDirection: 'row',
  },
  title_input: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '900',
    paddingVertical: 2,
    width: '70%',
  },
  title_box: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(60),
    height: responsiveHeight(5),
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  changePic_box: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(23),
    borderRadius: 10,
    height: responsiveHeight(5),
    justifyContent: 'center',
  },
  desc_box: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(93),
    height: responsiveHeight(17),
    borderRadius: 10,
  },
  desc_text_title: {color: Colors.grayText, marginVertical: 5, marginTop: 10},
  input_field_title: {
    color: Colors.grayText,
    fontSize: responsiveFontSize(1.4),
    marginVertical: 5,
  },
  input_field_box: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(25),
    height: responsiveHeight(4.3),
    borderRadius: 10,
  },
  input_filed: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '900',
    paddingVertical: 2,
    width: '100%',
  },
  last_row: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },
  back_Box: {
    borderWidth: 1,
    borderColor: Colors.grayText,
    width: responsiveWidth(25),
    borderRadius: 10,
    height: responsiveHeight(4),
    justifyContent: 'center',
  },
  back_text: {color: Colors.grayText, alignSelf: 'center'},
});
