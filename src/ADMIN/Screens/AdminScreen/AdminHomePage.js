import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import SearchBar from '../../../Components/SearchBar';
import AdminCard from '../../../Components/AdminCard';
import AdminHeaderBar from '../../../Components/AdminHeaderBar';
import { IP } from '../../../Constants/Server';
import Loader from '../../../Components/Loader';

const { width, height } = Dimensions.get('screen');

function AdminHomePage() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dropDownValue, setDropDownValue] = useState('ALL');
  const [page, setPage] = useState(0); // Track current page for pagination
  const [isFetching, setIsFetching] = useState(false); // Track whether new data is being fetched

  useEffect(() => {
    setLoading(true);
    fetch(`${IP}/service/view-services?page=${page}&limit=10`)
      .then(resp => resp.json())
      .then(result => {
        if (result.msg) {
          // Handle the case where no providers are found
          console.log('result :   ',result.msg);
        } else {
          setLoading(false);
          console.log("result" ,result)
          setData(prevData => {
            // Check for duplicates and concatenate only unique entries
            const newData = result.filter(newItem => !prevData.some(oldItem => oldItem._id === newItem._id));
            return [...prevData, ...newData];
          });
          // setCount('resulttt......',result);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, [page]);

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true to show the refresh indicator
  
    // Fetch data from the server
    fetch(`${IP}/service/view-services?page=0&limit=10`)
      .then(resp => resp.json())
      .then(result => {
        if (result.msg) {
          console.log('result:', result.msg);
        } else {
          setData(result); // Update the data with the newly fetched data
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false); // Set refreshing to false when data fetching is done
      });
  };
  

  const loadMore = () => {
    if (!isFetching) {
      setPage(page + 1);
    }
  };

  const renderLoader = () => {
    
  };

  const filterByText = item => {
    return (
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filterByDropDown = item => {
    return item.type.toLowerCase().includes(dropDownValue.toLowerCase());
  };

  const filterData = () => {
    let filteredData = data;
    if (searchText.trim() !== '') {
      filteredData = filteredData.filter(filterByText);
    }
    if (dropDownValue !== 'ALL') {
      filteredData = filteredData.filter(filterByDropDown);
    }
    return filteredData;
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View
          style={{
            backgroundColor: Colors.mainColor,
            width: responsiveWidth(100),
            height: responsiveHeight(100),
          }}>
          <AdminHeaderBar
            leftTitle={'LIST OF TIPS'}
            rightTitle={'+ NEW TIP'}
            onPress={() => navigation.navigate('NewTips')}
          />
          <SearchBar
            onChangeText={setSearchText}
            filtericon={true}
            setDropDownValue={setDropDownValue}
          />
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
              style={{ flex: 1, padding: 10 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <FlatList
                data={filterData()}
                renderItem={({ item }) => (
                  <AdminCard
                    item={item}
                    onPress={() => navigation.navigate('EditTip', { item: item })}
                  />
                )}
                keyExtractor={(item, index) =>
                  item && item.id ? item.id.toString() : index.toString()
                }
                contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
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

export default AdminHomePage;
