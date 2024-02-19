import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Image, Text, View, TouchableOpacity } from 'react-native';
import ImagePath from '../Constants/ImagePath';
import Colors from '../Constants/Colors';
import ProfileNavStack from '../BottomNavStack/ProfileNavStack';
import VIPNavStack from '../BottomNavStack/VIPNavStack';
import HomeNavStack from '../BottomNavStack/HomeNavStack';
import { responsiveWidth,responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import NavigationString from '../Constants/NavigationString';
import AdminHomeNavStack from '../ADMIN/BottomTabStacks/AdminHomeNavStack'
import AdminVIPNavStack from '../ADMIN/BottomTabStacks/AdminVIPNavStack';
import AdminProfileNavStack from '../ADMIN/BottomTabStacks/AdminProfileNavStack';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('screen');

const CustomTabButton = ({ onPress, iconSource, label, tintColor,customStyle,customTextStyle }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ flex: 1, alignItems: 'center',...customStyle }}>
      {/* Custom icon */}
      <Image
        source={iconSource}
        style={{
          width: responsiveWidth(30),
          height: responsiveHeight(3.5),
          resizeMode: 'contain',
          tintColor: tintColor,
        }}
      />
      <Text style={{ fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(0.2), color: tintColor,...customTextStyle }}>{label}</Text>
    </TouchableOpacity>
  );
};

const resetStackToInitialState = (navigation, stackName) => {
  navigation.reset({
    index: 0,
    routes: [{ name: stackName }],
  });
};


function Tabs() {
  const route=useRoute()
  const {isAdmin} = route.params
  const navigation = useNavigation();
  const [admin,setAdmin] = useState(isAdmin)
  const resetToInitialState = (stackName) => {
    resetStackToInitialState(navigation, stackName);
  };

  return (
    <Tab.Navigator
    initialRouteName={admin ? 'AdminVIPNavStack' : NavigationString.HOME_PAGE_STACK}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: height * 0.07,
          backgroundColor: Colors.bottomNavColor,
        },
        
      }}
      
    >
      <Tab.Screen
        // name={NavigationString.HOME_PAGE_STACK}
        // component={HomeNavStack}
        name={admin ? 'AdminHomeNavStack':NavigationString.HOME_PAGE_STACK}
        component={admin?AdminHomeNavStack:HomeNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState(admin?'AdminHomeNavStack':NavigationString.HOME_PAGE_STACK)}
              iconSource={admin?ImagePath.AdminUsersIcon:ImagePath.HomeIcon}
              label={admin ?"USERS":"HOME"}
              tintColor={focused ? Colors.secondaryColor : '#8E8D8D'}
              customStyle={{
                marginTop:responsiveHeight(1)
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        // name={NavigationString.VIP_PAGE_STACK}
        // component={VIPNavStack}
        name={admin?'AdminVIPNavStack':NavigationString.VIP_PAGE_STACK}
        component={admin?AdminVIPNavStack:VIPNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState(admin?'AdminVIPNavStack':NavigationString.VIP_PAGE_STACK)}
              iconSource={ImagePath.speakerIcon}
              label={admin?"TIPS":"VIP"}
              tintColor={ '#000'}
              customStyle={{
                backgroundColor: Colors.secondaryColor,
                width: responsiveWidth(15),
                height: responsiveHeight(6),
                borderRadius: responsiveWidth(8),
                top: -responsiveHeight(3),
                padding:5
              }}
              customTextStyle={{
                fontSize:responsiveFontSize(1.6),marginTop:responsiveHeight(0.5),color:'#000'
              }}
            />
          ),
        }}
      />

      <Tab.Screen
     
        // name={NavigationString.PROFILE_PAGE_STACK}
        // component={ProfileNavStack}
        name={admin ?'AdminProfileNavStack' :NavigationString.PROFILE_PAGE_STACK}
        component={admin ?AdminProfileNavStack:ProfileNavStack}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabButton
              onPress={() => resetToInitialState(admin?'AdminProfileNavStack':NavigationString.PROFILE_PAGE_STACK)}
              iconSource={ImagePath.ProfileIcon}
              label="PROFILE"
              tintColor={focused ? Colors.secondaryColor : '#8E8D8D'}
              customStyle={{
                marginTop:responsiveHeight(1)
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
