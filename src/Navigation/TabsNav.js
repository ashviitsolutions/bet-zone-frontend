import React, { } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import ImagePath from '../Constants/ImagePath';
import Colors from '../Constants/Colors';
import ProfileNavStack from '../BottomNavStack/ProfileNavStack';
import VIPNavStack from '../BottomNavStack/VIPNavStack';
import HomeNavStack from '../BottomNavStack/HomeNavStack';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import NavigationString from '../Constants/NavigationString';
import { CustomTabButton } from './CustomTabButton';
const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('screen');
function Tabs() {
  const navigation = useNavigation();
  const resetToInitialState = (stackName) => { navigation.navigate(stackName); };
  return (
    <Tab.Navigator
      initialRouteName={NavigationString.HOME_PAGE_STACK}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: responsiveHeight(7),
          backgroundColor: Colors.bottomNavColor,
        },
      }}
    >
      <Tab.Screen
        name={NavigationString.HOME_PAGE_STACK}
        component={HomeNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState(NavigationString.HOME_PAGE_STACK)}
              iconSource={ImagePath.HomeIcon}
              label={"HOME"}
              tintColor={focused ? Colors.secondaryColor : '#8E8D8D'}
              customStyle={{
                marginTop: responsiveHeight(1)
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={NavigationString.VIP_PAGE_STACK}
        component={VIPNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState(NavigationString.VIP_PAGE_STACK)}
              iconSource={ImagePath.speakerIcon}
              label={"VIP"}
              tintColor={'#000'}
              customStyle={{
                backgroundColor: Colors.secondaryColor,
                width: responsiveWidth(15),
                height: responsiveHeight(10),
                borderRadius: responsiveWidth(8),
                top: -responsiveHeight(3),
                padding: 5,
              }}
              customTextStyle={{
                fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(0.1), color: '#000'
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={NavigationString.PROFILE_PAGE_STACK}
        component={ProfileNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState(NavigationString.PROFILE_PAGE_STACK)}
              iconSource={ImagePath.ProfileIcon}
              label="PROFILE"
              tintColor={focused ? Colors.secondaryColor : '#8E8D8D'}
              customStyle={{
                marginTop: responsiveHeight(1)
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs;
