import React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import SearchBar from '../../../Components/SearchBar';
import AdminCard from '../../../Components/AdminCard';
import AdminHeaderBar from '../../../Components/AdminHeaderBar';
function AdminHomePage() {
  const navigation = useNavigation();

  const Data = [
    {
      id: 1,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'VIP',
    },
    {
      id: 2,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'OLD',
    },
    {
      id: 3,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'VIP',
    },
    {
      id: 4,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'OLD',
    },
    {
      id: 5,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'OLD',
    },
    {
      id: 6,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'VIP',
    },
    {
      id: 7,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amounts: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../../assets/Image/football.webp'),
      type: 'VIP',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
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
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <ScrollView style={{flex: 1, padding: 10}}>
            <FlatList
              data={Data}
              renderItem={({item}) => (
                <AdminCard
                  item={item}
                  onPress={() => navigation.navigate('EditTip', {item: item})}
                />
              )}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{paddingBottom: responsiveHeight(20)}}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

export default AdminHomePage;
