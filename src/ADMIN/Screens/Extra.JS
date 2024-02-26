// import React, { useEffect, useState } from 'react';
// import {
//   Image,
//   ImageBackground,
//   KeyboardAvoidingView,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Header from '../../../Components/Header';
// import {
//   responsiveWidth,
//   responsiveFontSize,
//   responsiveHeight,
// } from 'react-native-responsive-dimensions';
// import Colors from '../../../Constants/Colors';
// import ImagePath from '../../../Constants/ImagePath';
// import { useNavigation } from '@react-navigation/native';
// import { Button } from '../../../Components';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { IP } from '../../../Constants/Server';
// import NavigationString from '../../../Constants/NavigationString';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DropDownComp from '../../../Components/DropDownComp';
// import SportsDropDown from '../../../Components/SportsDropDown';
// export default function NewTips() {
//   const navigation = useNavigation();
//   const [image, setImage] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [amt, setAmt] = useState('');
//   const [odds, setOdds] = useState('');
//   const [probs, setProbs] = useState('');
//   const [type, setType] = useState('');
//   const [category, setCategory] = useState('');

//   const data = [
//     { id: 1, name: 'VIP' },
//     { id: 2, name: 'OLD' },
//   ];
//   const [selectedItem, setSelectedItem] = useState(null);

//   const onSelect = item => {
//     setSelectedItem(item);
//   };

//   const data2 = [
//     { id: 1, name: 'BaseBall' },
//     { id: 2, name: 'Cricket' },
//     { id: 3, name: 'Football' },
//     { id: 4, name: 'Tennis' },
//   ];
//   const [sportsSelectedItem, setSportsSelectedItem] = useState(null);


//   console.log('User sportsSelectedItem image picker', sportsSelectedItem, selectedItem);
//   const onSportsSelect = item => {
//     setSportsSelectedItem(item);
//   };
//   const openImagePicker = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('Image picker error: ', response.error);
//       } else {
//         let imageUri = response.uri || response.assets?.[0]?.uri;
//         setImage(imageUri);
//         // console.log(imageUri)
//       }
//     });
//   };
//   // const token =  AsyncStorage.getItem('token');
//   const [token, setToken] = useState('');
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         setToken(storedToken);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleSaveTip = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('description', description);
//       formData.append('amt', amt);
//       formData.append('odds', odds);
//       formData.append('probs', probs);
//       formData.append('type', selectedItem);
//       formData.append('category', sportsSelectedItem);
//       formData.append('postImages', {
//         uri: image,
//         type: 'image/jpeg',
//         name: 'image.jpg',
//       });

//       const response = await fetch(`${IP}/service/add`, {
//         method: 'POST',
//         headers: {
//           Authorization: token,
//         },
//         body: formData,
//       });

//       const responseData = await response.json();
//       console.log('error is ', responseData)
//       navigation.navigate('AdminHomePage');
//     } catch (error) {
//       console.error('Error:', error.message);
//       console.error('Stack Trace:', error.stack);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Header />

//       <ScrollView
//         style={{
//           backgroundColor: Colors.mainColor,
//           height: '100%',
//           padding: 10,
//         }}>
//         <View style={styles.hedaerSub}>
//           <SportsDropDown
//             data={data2}
//             onSelect={onSportsSelect}
//             value={sportsSelectedItem}
//           />

//           <DropDownComp data={data} onSelect={onSelect} value={selectedItem} />
//           <View style={styles.date_box}>
//             <Image
//               source={require('../../../assets/icons/solar_calendar-linear.png')}
//               style={styles.calender_icon}
//             />
//             <Text style={styles.date_text}>Select date/time</Text>
//           </View>
//         </View>
//         <View style={styles.img_box}>
//           <Image source={{ uri: image }} style={styles.imgStyle} />
//         </View>
//         <Text style={{ color: Colors.grayText, marginVertical: 5 }}>
//           TIP TITLE
//         </Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             width: responsiveWidth(93),
//           }}>
//           <View style={styles.title_box}>
//             <TextInput
//               style={styles.title_input}
//               onChangeText={t => setTitle(t)}
//               placeholder="enter tip titile"
//               placeholderTextColor={Colors.grayText}
//             />
//           </View>
//           <View style={styles.changePic_box}>
//             <Text
//               onPress={openImagePicker}
//               style={{ color: Colors.grayText, alignSelf: 'center' }}>
//               CHANGE PIC
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.desc_text_title}>TIP DISCRIPTION</Text>
//         <View style={styles.desc_box}>
//           <TextInput
//             style={{ color: '#fff', fontSize: responsiveFontSize(1.9) }}
//             multiline={true}
//             placeholder="enter tip discription"
//             placeholderTextColor={Colors.grayText}
//             onChangeText={t => setDescription(t)}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginTop: 10,
//           }}>
//           <View>
//             <Text style={styles.input_field_title}>AMOUNT</Text>
//             <View style={styles.input_field_box}>
//               <TextInput
//                 style={styles.input_filed}
//                 onChangeText={t => setAmt(t)}
//                 keyboardType="numeric"
//                 placeholder="enter amount"
//                 placeholderTextColor={Colors.grayText}
//               />
//             </View>
//           </View>
//           <View>
//             <Text style={styles.input_field_title}>ODDS</Text>
//             <View style={styles.input_field_box}>
//               <TextInput
//                 style={styles.input_filed}
//                 onChangeText={t => setOdds(t)}
//                 keyboardType="numeric"
//                 placeholder="enter odds"
//                 placeholderTextColor={Colors.grayText}
//               />
//             </View>
//           </View>
//           <View>
//             <Text style={styles.input_field_title}>PROBS.</Text>
//             <View style={styles.input_field_box}>
//               <TextInput
//                 style={styles.input_filed}
//                 onChangeText={t => setProbs(t)}
//                 keyboardType="numeric"
//                 placeholder="enter probs."
//                 placeholderTextColor={Colors.grayText}
//               />
//             </View>
//           </View>
//         </View>

//         <View style={styles.last_row}>
//           <View style={styles.back_Box}>
//             <Text onPress={() => navigation.goBack()} style={styles.back_text}>
//               {' '}
//               BACK
//             </Text>
//           </View>
//           <Button
//             w={20}
//             h={4}
//             br={2}
//             title={'SAVE'}
//             customStyle={{ marginTop: 0 }}
//             onPress={handleSaveTip}
//           // onPress={() => navigation.navigate('AdminHomePage')}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   hedaerSub: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   sportText: {
//     color: Colors.blackText,
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: '900',
//   },
//   sportBox: {
//     width: responsiveWidth(30),
//     height: responsiveHeight(3),
//     backgroundColor: Colors.grayText,
//     borderRadius: responsiveWidth(15),
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   vipText: {
//     color: Colors.whiteText,
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: '900',
//   },
//   vipBox: {
//     width: responsiveWidth(20),
//     height: responsiveHeight(3),
//     borderRadius: responsiveWidth(15),
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     borderWidth: 1,
//     borderColor: Colors.grayText,
//   },
//   imgStyle: {
//     width: responsiveWidth(95),
//     height: responsiveHeight(30),
//     borderRadius: responsiveWidth(2),
//   },
//   img_box: {
//     width: responsiveWidth(93),
//     height: responsiveHeight(30),
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: Colors.grayText,
//     overflow: 'hidden',
//   },
//   date_text: {
//     color: '#d0d0d0',
//     fontSize: responsiveFontSize(1.6),
//     fontWeight: '900',
//   },
//   calender_icon: {
//     width: 20,
//     height: 20,
//     tintColor: Colors.grayText,
//     marginRight: responsiveWidth(2),
//   },
//   date_box: {
//     borderColor: Colors.grayText,
//     borderWidth: 1,
//     borderRadius: responsiveWidth(2),
//     padding: 5,
//     flexDirection: 'row',
//   },
//   title_input: {
//     color: '#fff',
//     fontSize: responsiveFontSize(1.5),
//     fontWeight: '900',
//     paddingVertical: 2,
//     width: '70%',
//   },
//   title_box: {
//     borderWidth: 1,
//     borderColor: Colors.grayText,
//     width: responsiveWidth(60),
//     height: responsiveHeight(5),
//     borderRadius: 10,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   changePic_box: {
//     borderWidth: 1,
//     borderColor: Colors.grayText,
//     width: responsiveWidth(23),
//     borderRadius: 10,
//     height: responsiveHeight(5),
//     justifyContent: 'center',
//   },
//   desc_box: {
//     borderWidth: 1,
//     borderColor: Colors.grayText,
//     width: responsiveWidth(93),
//     height: responsiveHeight(17),
//     borderRadius: 10,
//   },
//   desc_text_title: { color: Colors.grayText, marginVertical: 5, marginTop: 10 },
//   input_field_title: {
//     color: Colors.grayText,
//     fontSize: responsiveFontSize(1.4),
//     marginVertical: 5,
//   },
//   input_field_box: {
//     borderWidth: 1,
//     borderColor: Colors.grayText,
//     width: responsiveWidth(25),
//     height: responsiveHeight(4.3),
//     borderRadius: 10,
//   },
//   input_filed: {
//     color: '#fff',
//     fontSize: responsiveFontSize(1.5),
//     fontWeight: '900',
//     paddingVertical: 2,
//     width: '100%',
//   },
//   last_row: {
//     marginBottom: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//     alignItems: 'center',
//   },
//   back_Box: {
//     borderWidth: 1,
//     borderColor: Colors.grayText,
//     width: responsiveWidth(25),
//     borderRadius: 10,
//     height: responsiveHeight(4),
//     justifyContent: 'center',
//   },
//   back_text: { color: Colors.grayText, alignSelf: 'center' },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import Colors from '../../../Constants/Colors';
// import Header from '../../../Components/Header';
// import ImagePath from '../../../Constants/ImagePath';
// import Button from '../../../Components/Button';
// import Tabs from '../../../Navigation/TabsNav';

// import { useNavigation } from '@react-navigation/native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {
//   responsiveWidth,
//   responsiveFontSize,
//   responsiveHeight,
// } from 'react-native-responsive-dimensions';
// import InputComp from '../../../Components/InputComp';
// import { IP } from '../../../Constants/Server';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width } = Dimensions.get('screen');


// function AddUser() {
//   const navigation = useNavigation();
//   const [mobile, setMobile] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);

//   const [items, setItems] = useState([
//     { label: '1 month membership', value: '1 MONTH' },
//     { label: '3 month membership', value: '3 MONTH' },
//     { label: 'No membership', value: 'NO MEMBER' },
//   ]);

//   console.log("mobile", typeof (mobile))

//   const [token, setToken] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         setToken(storedToken);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchData();
//   }, []);
//   const handleAddUser = async () => {
//     const userData = {
//       full_name: name,
//       email: email,
//       password: password,
//       confirm_password: confirmPassword,
//       mobile: mobile, 
//       auth_type: 'user',
//       membershiplevel: value
//     };
//     console.log("userData", userData)
//     try {
//       const response = await fetch(`${IP}/addUser`, {
//         method: 'POST',
//         headers: {
//           Authorization: token,

//         },
//         body: JSON.stringify(userData), // Convert the data to JSON string
//       });

//       const responseData = await response.json();
//       console.log("responseData", responseData)
//       if (response.status === 200) {
//         console.log('User added successfully');
//         navigation.navigate('List');
//       } else {
//         console.log('Error:', responseData.msg);
//         // Handle error messages appropriately, e.g., show them to the user
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       // Handle network errors or other unexpected errors
//     }
//   };



//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Header />

//       <ScrollView
//         style={{
//           backgroundColor: Colors.mainColor,
//           height: '100%',
//           padding: 10,
//         }}>
//         <View
//           style={{
//             height: responsiveHeight(15),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Image
//             source={ImagePath.ProfileIcon}
//             style={{
//               width: responsiveWidth(10),
//               height: responsiveHeight(8),
//               tintColor: Colors.whiteText,
//             }}
//           />
//           <Text
//             style={{
//               fontSize: responsiveFontSize(3),
//               color: Colors.whiteText,
//               fontWeight: '900',
//             }}>
//             ADD USER
//           </Text>
//         </View>
//         <InputComp title={'Demo user'} onChangeText={(t) => setName(t)} />
//         <InputComp
//           title={'demo@gmail.com'}
//           onChangeText={(t) => setEmail(t)}
//           keyType={'email-address'}
//         />
//         <InputComp title={'mobile'} onChangeText={(t) => setMobile(t)} />
//         <InputComp title={'new password'} onChangeText={(t) => setPassword(t)} />
//         <InputComp
//           title={'confirm password'}
//           onChangeText={(t) => setConfirmPassword(t)}
//         />

//         <DropDownPicker
//           open={open}
//           value={value}
//           items={items}
//           setOpen={setOpen}
//           setValue={setValue}
//           setItems={setItems}
//           placeholder={'membership'}
//           dropDownDirection="Bottom"
//           dropDownContainerStyle={{
//             borderRadius: responsiveWidth(2),
//             width: responsiveWidth(85),
//             alignSelf: 'center',
//           }}
//           style={{
//             padding: 10,
//             borderColor: Colors.grayText,
//             color: Colors.whiteText,
//             borderWidth: 1,
//             borderRadius: responsiveWidth(2),
//             width: responsiveWidth(85),
//             alignSelf: 'center',
//             marginBottom: responsiveHeight(1.5),
//           }}
//         />

//         <Button
//           w={30}
//           h={5}
//           br={6}
//           title={'CREATE'}
//           onPress={handleAddUser}
//         />

//         <Text
//           onPress={() => navigation.goBack()}
//           style={{
//             color: Colors.grayText,
//             alignSelf: 'center',
//             marginVertical: 15,
//           }}>
//           Back
//         </Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default AddUser;


import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import Header from '../../../Components/Header';
import ImagePath from '../../../Constants/ImagePath';
import Button from '../../../Components/Button';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import SearchBar from '../../../Components/SearchBar';
import AdminHeaderBar from '../../../Components/AdminHeaderBar';
import { IP } from '../../../Constants/Server';
import Loader from '../../../Components/Loader';
function ListUser() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false)
  function Card({ onPress, item }) {
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
  }

  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/getusers?page=1&limit=10`);
        const data = await response.json();
        setData(data.services)
        console.log(data.services[0])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("data", data)

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View
          style={{
            backgroundColor: Colors.mainColor,
            height: responsiveHeight(100),
            padding: 5,
          }}>
          <AdminHeaderBar
            leftTitle={'LIST OF TIPS'}
            rightTitle={'+ NEW USER'}
            onPress={() => navigation.navigate('AddUser')}
          />

          <SearchBar />
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView style={{ flex: 1, padding: 10, marginBottom: responsiveHeight(15) }}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Card
                    item={item}
                    onPress={() => navigation.navigate('EditUser')}
                  />
                )}
                keyExtractor={item => item.id.toString()}
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

export default ListUser;
