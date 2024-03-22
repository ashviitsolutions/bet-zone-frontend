import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination
  const [isFetching, setIsFetching] = useState(false); // Track whether new data is being fetched


  function Card({ onPress, item }) {
    const { member } = item;
    if (item.auth_type === 'admin') {
      return null; 
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          flex:1,
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

        <View style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
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
            title={`${item.membershipType}`}
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
 
  useEffect(() => {
    // setLoading(true);
    setIsFetching(true); // Set isFetching to true when starting to fetch new data
    fetch(`${IP}/getUsers?page=${page}&limit=10`)
      .then(resp => resp.json())
      .then(result => {
        if (result.msg) {
          // console.log('result: ', result.msg);
        } else {
          // setLoading(false);
          setIsFetching(false); // Set isFetching to false when data fetching is complete
          setData(prevData => [...prevData, ...result]); // Assuming 'result' is an array of new data
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
        setIsFetching(false)
      });
  }, [page]);
  
  
  const onRefresh = () => {
    console.log('Refreshing data...');
    setRefreshing(true); // Set refreshing to true to show the refresh indicator
  
    // Fetch data from the server
    fetch(`${IP}/getUsers?page=0&limit=10`)
      .then(resp => resp.json())
      .then(result => {
        if (result.msg) {
          console.log('result: ', result.msg);
        } else {
          console.log('New data fetched: ', result);
          setData(result); // Set the new data
        }
      })
      .catch(err => {
        console.log('Error fetching data: ', err);
      })
      .finally(() => {
        setRefreshing(false); // Set refreshing to false when data fetching is done
        console.log('Refresh complete.');
      });
  };
  

const loadMore = () => {
  if (!isFetching) {
    setPage(page + 1);
  }
};

  const renderLoader = () => {
    return isFetching ? <ActivityIndicator size={'large'} color={Colors.yellowColor}/> : null;
  };

  const filterData = () => {
    return data.filter(
      item =>
        item?.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.mobile.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
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
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
              style={{ flex: 1, padding: 10, marginBottom: responsiveHeight(15) }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <FlatList
                data={filterData()}
                renderItem={({ item }) => (
                  <Card
                    item={item}
                    onPress={() => navigation.navigate('EditUser', { item: item })}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                onEndReached={loadMore}
                ListFooterComponent={renderLoader}
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
