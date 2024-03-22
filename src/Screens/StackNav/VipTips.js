import React, {useEffect, useState} from 'react';
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
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';

const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import UserCard from '../../Components/UserCard';
import UserHeaderBar from '../../Components/UserHeaderBar';
import {IP} from '../../Constants/Server';
import Loader from '../../Components/Loader';
function VipTips() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
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
          // setCount(result.length);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, [page]);

  const onRefersh = () => {
    setRefreshing(true); 
  
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
    return isFetching ? <ActivityIndicator size={'large'} /> : null;
  };
  useEffect(() => {
    // fetchData();
  }, []);



  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header />
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Image source={ImagePath.mikeIcon} style={styles.mikeIconStyle} />

              <Text style={styles.title}>VIP TIPS</Text>
              <Image
                source={ImagePath.starsIcon}
                style={styles.starsIconStyle}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={ImagePath.PhoneIcon}
                style={styles.PhoneIconStyle}
              />
              <Text
                onPress={() => navigation.navigate('Contacts')}
                style={styles.contact}>
                CONTACTS
              </Text>
            </View>
          </View>
          <ScrollView
            style={{flex: 1, padding: 10}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefersh}
                // Set the color of the loading indicator
                colors={[Colors.mainColor]}
              />
            }>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <UserCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('DetailsPage', {item, item})
                  }
                />
              )}
              keyExtractor={(item, index) =>
                item && item.id ? item.id.toString() : index.toString()
              }
              contentContainerStyle={{paddingBottom: responsiveHeight(20)}}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              onEndReached={loadMore}
              ListFooterComponent={renderLoader}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      {loading ? <Loader /> : null}
    </>
  );
}

export default VipTips;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.mainColor,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  headerContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    paddingBottom: responsiveHeight(1),
  },
  titleContainer: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mikeIconStyle: {
    width: responsiveWidth(3.9),
    height: responsiveHeight(2),
    tintColor: Colors.whiteText,
    top: -responsiveHeight(1.2),
    left: -responsiveWidth(0.3),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.whiteText,
    fontWeight: '900',
  },
  starsIconStyle: {
    width: responsiveWidth(3.5),
    height: responsiveHeight(2),
    top: -responsiveHeight(1),
    left: responsiveWidth(-1),
  },
  PhoneIconStyle: {
    width: responsiveWidth(5),
    height: responsiveHeight(2),
    tintColor: Colors.grayText,
    marginRight: responsiveWidth(1),
  },
  contact: {
    color: Colors.grayText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
});
