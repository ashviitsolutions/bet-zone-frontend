import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl, // Import RefreshControl
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
const { width, height } = Dimensions.get('screen');
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

function AdminHomePage() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const [searchText, setSearchText] = useState('');
  const [dropDownValue, setDropDownValue] = useState('ALL');
  console.log(dropDownValue)
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `${IP}/service/view-services?page=1&limit=18&search=${searchText}` // Step 2: Include search parameters
      );
      const newData = await response.json();
      setData(newData.services);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    fetchData(); // Step 4: Call fetchData with search parameters
  };

  const filterData = () => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) || 
      item.type.toLowerCase().includes(dropDownValue.toLowerCase())
    );
  };

  useEffect(() => {
    fetchData();
  }, [searchText,dropDownValue]); // Step 3: Add searchText as a dependency


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
