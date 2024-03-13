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
  RefreshControl
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
function VipTips() {
  const navigation = useNavigation();


  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const response = await fetch(`${IP}/service/view-services?page=1&limit=18`);
      const responseData = await response.json();
      const filteredServices = responseData.services.filter(service => service.type === 'VIP');
      setData(filteredServices);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false)
      setLoading(false);
    }
  };

  const onRefersh = () => {
    fetchData()
  }
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
          <View
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(2),
              paddingBottom: responsiveHeight(1),
            }}>
            <View
              style={{
                height: responsiveHeight(15),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={ImagePath.mikeIcon}
                style={{
                  width: responsiveWidth(3.9),
                  height: responsiveHeight(2),
                  tintColor: Colors.whiteText,
                  top: -responsiveHeight(1.2),
                  left: -responsiveWidth(0.3),
                }}
              />

              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  color: Colors.whiteText,
                  fontWeight: '900',
                }}>
                VIP TIPS
              </Text>
              <Image
                source={ImagePath.starsIcon}
                style={{
                  width: responsiveWidth(3.5),
                  height: responsiveHeight(2),
                  top: -responsiveHeight(1),
                  left: responsiveWidth(-1),
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={ImagePath.PhoneIcon}
                style={{
                  width: responsiveWidth(5),
                  height: responsiveHeight(2),
                  tintColor: Colors.grayText,
                  marginRight: responsiveWidth(1),
                }}
              />
              <Text
                onPress={() => navigation.navigate('Contacts')}
                style={{
                  color: Colors.grayText,
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '500',
                }}>
                CONTACTS
              </Text>
            </View>
          </View>
          <ScrollView style={{ flex: 1, padding: 10 }}
             refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefersh}
                // Set the color of the loading indicator
                colors={[Colors.mainColor]}
              />
            }
          >
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

export default VipTips;
