import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import ImagePath from '../Constants/ImagePath';
import Colors from '../Constants/Colors';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import AdminHomeNavStack from '../ADMIN/BottomTabStacks/AdminHomeNavStack'
import AdminVIPNavStack from '../ADMIN/BottomTabStacks/AdminVIPNavStack';
import AdminProfileNavStack from '../ADMIN/BottomTabStacks/AdminProfileNavStack';
import { CustomTabButton } from './CustomTabButton';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('screen');
function Tabs() {
  const navigation = useNavigation();
  const resetToInitialState = (stackName) => { navigation.navigate(stackName); };
  return (
    <Tab.Navigator
      initialRouteName={'AdminVIPNavStack'}
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
        name={'AdminHomeNavStack'}
        component={AdminHomeNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState('AdminHomeNavStack')}
              iconSource={ImagePath.AdminUsersIcon}
              label={"USERS"}
              tintColor={focused ? Colors.secondaryColor : '#8E8D8D'}
              customStyle={{
                marginTop: responsiveHeight(1)
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'AdminVIPNavStack'}
        component={AdminVIPNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState('AdminVIPNavStack')}
              iconSource={ImagePath.speakerIcon}
              label={"TIPS"}
              tintColor={'#000'}
              customStyle={{
                backgroundColor: Colors.secondaryColor,
                width: responsiveWidth(15),
                height: responsiveHeight(6),
                borderRadius: responsiveWidth(8),
                top: -responsiveHeight(3),
                padding: 5
              }}
              customTextStyle={{
                fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(0.5), color: '#000'
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={'AdminProfileNavStack'}
        component={AdminProfileNavStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              onPress={() => resetToInitialState('AdminProfileNavStack')}
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
  );
}

export default Tabs;
