import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import UserCard from '../../Components/UserCard';
import UserHeaderBar from '../../Components/UserHeaderBar';
import { IP } from '../../Constants/Server';
import Loader from '../../Components/Loader';
function Home() {
  const navigation = useNavigation();


  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/service/view-services?page=1&limit=18`);
        const responseData = await response.json();
        const filteredServices = responseData.services.filter(service => service.type === 'OLD');
        setData(filteredServices);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

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
          <UserHeaderBar />
          <ScrollView style={{ flex: 1, padding: 10 }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <UserCard
                  item={item}
                  onPress={() => navigation.navigate('DetailsPage', { item, item })}
                />
              )}
              keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
              contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      {loading ? <Loader /> : null}
    </>
  );
}

export default Home;
