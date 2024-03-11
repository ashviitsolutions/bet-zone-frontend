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

  const fetchData = async () => {
    try {
      setRefreshing(true); // Set refreshing to true when fetching data
      const response = await fetch(`${IP}/service/view-services?page=1&limit=18`);
      const newData = await response.json();
      setData(newData.services);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false); // Set refreshing to false when done fetching data
      setLoading(false);
    }
  };

  const onRefresh = () => {
    fetchData(); // Call fetchData when the user pulls to refresh
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <SearchBar />
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
                data={data}
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
