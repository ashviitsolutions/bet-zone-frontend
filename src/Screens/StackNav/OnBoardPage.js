import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
import Tabs from '../../Navigation/TabsNav';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
function OnBoardPage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
      <Header />
      <View
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 10,
          justifyContent: 'center',
        }}>
        <View style={{marginBottom: responsiveHeight(10)}}>
          <Button
            w={70}
            h={7}
            br={6}
            title={'ADMIN'}
            // onPress={() => navigation.navigate(NavigationString.TABS,{isAdmin:true})}
            onPress={() => navigation.navigate(NavigationString.ADMIN_LOGIN_PAGE,{isAdmin:true})}
            // onPress={() => navigation.navigate('AdminLogin')}

          />
          <View style={{marginVertical: responsiveHeight(1.5)}}></View>
          <Button
            w={70}
            h={7}
            br={6}
            title={'USER'}
            onPress={() => navigation.navigate(NavigationString.TABS,{isAdmin:false})}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OnBoardPage;
