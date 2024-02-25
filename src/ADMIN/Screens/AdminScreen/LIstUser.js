import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
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
import { IP } from '../../../Constants/Server';
import Loader from '../../../Components/Loader';
function ListUser() {
  const navigation = useNavigation();
  // const Data = [
  //   {
  //     id: 1,
  //     name: 'FULL NAME OF USER',
  //     email: 'user@gmail.com',
  //     contact: '9898937973',
  //     member: 'NO MEMBER',
  //   },
  //   {
  //     id: 2,
  //     name: 'FULL NAME OF USER',
  //     email: 'user@gmail.com',
  //     contact: '9898937973',
  //     member: '3 MONTH',
  //     exp: '20-02-2023',
  //   },
  //   {
  //     id: 3,
  //     name: 'FULL NAME OF USER',
  //     email: 'user@gmail.com',
  //     contact: '9898937973',
  //     member: 'NO MEMBER',
  //   },
  //   {
  //     id: 4,
  //     name: 'FULL NAME OF USER',
  //     email: 'user@gmail.com',
  //     contact: '9898937973',
  //     member: '3 MONTH',
  //     exp: '20-02-2023',
  //   },
  // ];
  const [loading,setLoading] = useState(false)
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
            {item.full_name}
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
            Contact No. {item.mobile}
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

  const [data,setData] = useState([])
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/getUsers`);
        const data = await response.json();
        setData(data.services)
        console.log(data.services[0])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
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
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView style={{flex: 1, padding: 10,marginBottom:responsiveHeight(15)}}>
          <FlatList
            data={data}
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
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
    {loading ? <Loader/> : null}
    </>
  );
}

export default ListUser;
