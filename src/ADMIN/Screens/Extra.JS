import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import SearchBar from '../../../Components/SearchBar';
import AdminHeaderBar from '../../../Components/AdminHeaderBar';
import { IP } from '../../../Constants/Server';
import Loader from '../../../Components/Loader';

function ListUser() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${IP}/getusers?page=${currentPage}&limit=9`);
      const newData = await response.json();
      setData(prevData => [...prevData, ...newData.services]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ onPress, item }) => {
    const { member } = item;
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
            title={`${item.membershiplevel}`}
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
  };

  const handleLoadMore = () => {
    if (!loading) {
      fetchData();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          backgroundColor: Colors.mainColor,
          height: '100%',
          padding: 5,
        }}>
        <AdminHeaderBar
          leftTitle={'LIST OF TIPS'}
          rightTitle={'+ NEW USER'}
          onPress={() => navigation.navigate('AddUser')}
        />
        <SearchBar />
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Card
                item={item}
                onPress={() => navigation.navigate('EditUser')}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        </ScrollView>
      </View>
      {loading && <Loader />}
    </SafeAreaView>
  );
}

export default ListUser;
