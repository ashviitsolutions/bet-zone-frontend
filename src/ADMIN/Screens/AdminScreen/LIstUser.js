import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import SearchBar from '../../../Components/SearchBar';
import AdminHeaderBar from '../../../Components/AdminHeaderBar';
function ListUser() {
  const navigation = useNavigation();
  const Data = [
    {
      id: 1,
      name: 'FULL NAME OF USER',
      email: 'user@gmail.com',
      contact: '9898937973',
      member: 'NO MEMBER',
    },
    {
      id: 2,
      name: 'FULL NAME OF USER',
      email: 'user@gmail.com',
      contact: '9898937973',
      member: '3 MONTH',
      exp: '20-02-2023',
    },
    {
      id: 3,
      name: 'FULL NAME OF USER',
      email: 'user@gmail.com',
      contact: '9898937973',
      member: 'NO MEMBER',
    },
    {
      id: 4,
      name: 'FULL NAME OF USER',
      email: 'user@gmail.com',
      contact: '9898937973',
      member: '3 MONTH',
      exp: '20-02-2023',
    },
  ];

  function Card({onPress, item}) {
    const {member} = item;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          backgroundColor: Colors.brownColor,
          width: responsiveWidth(92),
          height: responsiveHeight(12),
          borderRadius: responsiveWidth(5),
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: 15,
          elevation: 4,
          shadowColor: '#000',
          borderWidth: 1,
          borderColor:
            member === 'NO MEMBER' ? Colors.grayText : Colors.yellowColor,
        }}>
        <View
          style={{
            width: responsiveWidth(12),
            height: responsiveHeight(6),
            borderRadius: responsiveWidth(6),
            borderColor:
              member === 'NO MEMBER' ? Colors.grayText : Colors.yellowColor,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color:
                member === 'NO MEMBER' ? Colors.grayText : Colors.yellowColor,
              alignSelf: 'center',
            }}>
            VIP
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Colors.whiteText,
              fontWeight: '900',
              fontSize: responsiveFontSize(1.8),
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: responsiveFontSize(1.6),
            }}>
            {item.email}
          </Text>
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: responsiveFontSize(1.6),
            }}>
            Contact No. {item.contact}
          </Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: responsiveFontSize(1.1),
            }}>
            MEMBERSHIP PLAN
          </Text>
          <Button
            w={25}
            h={3}
            br={6}
            title={`${item.member}`}
            customStyle={{
              marginTop: 3,
              marginBottom: 3,
              backgroundColor:
                member === 'NO MEMBER'
                  ? Colors.grayText
                  : Colors.secondaryColor,
            }}
            customStyleText={{
              fontSize: responsiveFontSize(1.6),
              fontWeight: '900',
            }}
          />
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: responsiveFontSize(1.1),
            }}>
            {' '}
            {item.exp ? `EXP: ${item.exp}` : null}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 5,
        }}>
        <AdminHeaderBar
          leftTitle={'LIST OF TIPS'}
          rightTitle={'+ NEW USER'}
          onPress={() => navigation.navigate('AddUser')}
        />

        <SearchBar />

        <ScrollView style={{flex: 1, padding: 10, height: 'auto'}}>
          <FlatList
            data={Data}
            renderItem={({item}) => (
              <Card
                item={item}
                onPress={() => navigation.navigate('EditUser')}
              />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default ListUser;
