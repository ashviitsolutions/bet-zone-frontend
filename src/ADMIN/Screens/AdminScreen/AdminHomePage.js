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
  ActivityIndicator, // Import Platform for keyboardVerticalOffset
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
  const [page, setPage] = useState(1); // Track current page for pagination

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `${IP}/service/view-services?page=1&limit=${page}&search=${searchText}`
      );
      const newData = await response.json();
      // setData(prevData => [...prevData, ...newData.services]); // Append new data to existing data
      setData([...data, ...newData.services]);
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

  const loadMore = () => {
    setPage(page + 1)
  };

  const renderLoader=()=>{
    return(<View>
      {/* <ActivityIndicator size={'large'}/> */}
    </View>)
  }
  const filterByText = (item) => {
    return (
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filterByDropDown = (item) => {
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

  useEffect(() => {
    fetchData();
  }, [searchText, dropDownValue,page]); // Update useEffect dependencies

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
          <SearchBar onChangeText={setSearchText} filtericon={true} setDropDownValue={setDropDownValue} />
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView style={{ flex: 1, padding: 10 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }>
              <FlatList
                data={filterData()}
                renderItem={({ item }) => (
                  <AdminCard
                    item={item}
                    onPress={() => navigation.navigate('EditTip', { item: item })}
                  />
                )}
                keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
                contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1} // Load more when 10% from the bottom
                onEndReached={loadMore} // Call loadMore function when reaching the end
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
