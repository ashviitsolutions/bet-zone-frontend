import React, {useEffect, useState} from 'react';
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
  RefreshControl,
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
import {IP} from '../../../Constants/Server';
import Loader from '../../../Components/Loader';
function ListUser() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  function Card({onPress, item}) {
    const {member} = item;
    console.log(item);
    if (item.auth_type === 'admin') {
      return null; // Do not render the card for admin
    }
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
            item.membershiplevel === 'NO MEMBER'
              ? Colors.grayText
              : Colors.yellowColor,
        }}>
        <View
          style={{
            width: responsiveWidth(12),
            height: responsiveHeight(6),
            borderRadius: responsiveWidth(6),
            borderColor:
              item.membershiplevel === 'NO MEMBER'
                ? Colors.grayText
                : Colors.yellowColor,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color:
                member === 'NO MEMBER' ? Colors.grayText : Colors.yellowColor,
              alignSelf: 'center',
            }}>
            {item.membershiplevel === 'NO MEMBER' ? 'NA' : 'VIP'}
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
            title={`${item.membershiplevel}`}
            customStyle={{
              marginTop: 3,
              marginBottom: 3,
              backgroundColor:
                item.membershiplevel === 'NO MEMBER'
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

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `${IP}/getUsers?page=1&limit=18&search=${searchText}`,
      );
      const newData = await response.json();
      setData(newData?.services);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    fetchData();
  };

  const filterData = () => {
    return data.filter(
      item =>
        item.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.mobile.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  useEffect(() => {
    fetchData();
  }, [searchText]);
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
          <SearchBar onChangeText={setSearchText} filtericon={false} />
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
              style={{flex: 1, padding: 10, marginBottom: responsiveHeight(15)}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <FlatList
                data={filterData()}
                renderItem={({item}) => (
                  <Card
                    item={item}
                    onPress={() =>
                      navigation.navigate('EditUser', {item: item})
                    }
                  />
                )}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
      {loading ? <Loader /> : null}
    </>
  );
}

export default ListUser;
