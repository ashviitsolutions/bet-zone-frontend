import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
const {width, height} = Dimensions.get('screen');
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
function EditUser() {
  const route = useRoute();
  const [name, setName] = useState(route.params.item.full_name);
  const [email, setEmail] = useState(route.params.item.email);
  const [mobile, setMobile] = useState(route.params.item.mobile);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '6 months membership', value: '6 months membership'},
    {label: '3 months membership', value: '3 months membership'},
    {label: '3 months membership', value: '2 months membership'},
  ]);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
      <Header />
      <ScrollView
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 10,
        }}>
        <View
          style={{
            height: responsiveHeight(15),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ImagePath.ProfileIcon}
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(8),
              tintColor: Colors.whiteText,
            }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: Colors.whiteText,
              fontWeight: '900',
            }}>
            EDIT USER
          </Text>
        </View>
        <TextInput
          placeholder="Demo user"
          value={name}
          onChangeText={(i)=>setName(i)}
          placeholderTextColor={Colors.grayText}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),
          }}
        />
        <TextInput
          placeholder="demo@gmail.com"
          placeholderTextColor={Colors.grayText}
          value={email}
          onChangeText={(i)=>setEmail(i)}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),
          }}
        />
        <TextInput
          placeholder="123849862"
          value={String(mobile)}
          onChangeText={(i)=>setMobile(i)}
          placeholderTextColor={Colors.grayText}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),
          }}
        />
        <TextInput
          placeholder="new password"
          value={password}
          onChangeText={(i)=>setPassword(i)}
          placeholderTextColor={Colors.grayText}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),
          }}
        />
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={(i)=>setConfirmPassword(i)}
          placeholderTextColor={Colors.grayText}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),
          }}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'6 months membership'}
          dropDownDirection="Bottom"
          dropDownContainerStyle={{
          
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
          }}
          style={{
            padding: 10,
            borderColor: Colors.grayText,
            color: Colors.whiteText,
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
            width: responsiveWidth(85),
            alignSelf: 'center',
            marginBottom: responsiveHeight(1.5),

           
          }}
        />

        <Button
          w={30}
          h={5}
          br={6}
          title={'UPDATE'}
          onPress={() => navigation.navigate('List')}
        />

        <Text
          style={{
            color: Colors.grayText,
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          Back
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditUser;
