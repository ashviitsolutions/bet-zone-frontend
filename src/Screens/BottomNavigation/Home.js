import React from 'react';
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
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import UserCard from '../../Components/UserCard';
import UserHeaderBar from '../../Components/UserHeaderBar';
function Home() {
  const navigation = useNavigation();

  const Data = [
    {
      id: 1,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
    },
    {
      id: 2,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
    },
    {
      id: 3,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
    },
    {
      id: 4,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
    },
    {
      id: 5,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
    },
    {
      id: 6,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
    },
    {
      id: 7,
      date: '22:41 12-09-2023',
      game: 'FOOTBALL',
      amount: '2000',
      match: 'Tanzania vs Uganda',
      desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
      ODD: '2.1',
      probs: '83.2',
      img: require('../../assets/splashScreenImg/AppIcon.png'),
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
        <UserHeaderBar />
        <ScrollView style={{flex: 1, padding: 10}}>
          <FlatList
            data={Data}
            renderItem={({item}) => (
              <UserCard
                item={item}
                onPress={() => navigation.navigate('DetailsPage')}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: responsiveHeight(20)}}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Home;
