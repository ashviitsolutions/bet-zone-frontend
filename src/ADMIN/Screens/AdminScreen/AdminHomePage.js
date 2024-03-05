import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl
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
  const [loading, setLoading] = useState(false)
//  const [refresh,setRefersh] =  useState(false)
//  const pullme=()=>{
//   setRefersh(true)
//   setTimeout(() => {
//     setRefersh(false)
//   }, 2000);
//  }
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/service/view-services?page=1&limit=18`);
        const data = await response.json();
        setData(data.services)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
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
             
            <ScrollView style={{ flex: 1, padding: 10 }}>
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
