import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import Home from '../Components/Home';
import Saved from '../Components/Saved';
import Booking from '../Components/Booking';
import Invite from '../Components/Invite';
import Wizard from '../Components/Wizard';
import DrawerDesign from './DrawerDesign';
import Profile from '../Components/profile';
import SelectArea from '../Components/selectArea';
import HotelsSearch from '../Components/HotelsSearch';
import Icon from 'react-native-vector-icons/Foundation';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
Icon.loadFont();
Icon1.loadFont();
Icon2.loadFont();
Icon3.loadFont();
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  switch (routeName) {
    case 'Home':
      return (
        <View style={style.tabView}>
          <Icon name={'home'} size={ScreenWidth * 0.08} color={tintColor} />
          <Text style={{color: tintColor, fontFamily: 'OpenSans-Regular'}}>
            Home
          </Text>
        </View>
      );
      break;
    case 'Saved':
      return (
        <View style={style.tabView}>
          <Icon1 name={'heart'} size={ScreenWidth * 0.09} color={tintColor} />
          <Text style={{color: tintColor, fontFamily: 'OpenSans-Regular'}}>
            Saved
          </Text>
        </View>
      );
      break;
    case 'Booking':
      return (
        <View style={style.tabView}>
          <Icon2
            name={'briefcase'}
            size={ScreenWidth * 0.07}
            color={tintColor}
          />
          <Text style={{color: tintColor, fontFamily: 'OpenSans-Regular'}}>
            Booking
          </Text>
        </View>
      );
      break;
    case 'Invite':
      return (
        <View style={[style.tabView, {width: ScreenWidth * 0.25}]}>
          <Icon3 name={'adduser'} size={ScreenWidth * 0.07} color={tintColor} />
          <Text style={{color: tintColor, fontFamily: 'OpenSans-Regular'}}>
            Invite & Earn
          </Text>
        </View>
      );
      break;
    case 'Wizard':
      return (
        <View style={style.tabView}>
          <Text style={{fontSize: ScreenWidth * 0.07, color: tintColor}}>
            W
          </Text>
          <Text style={{color: tintColor, fontFamily: 'OpenSans-Regular'}}>
            Wizard
          </Text>
        </View>
      );
      break;
  }
};

const App = createBottomTabNavigator(
  {
    Home,
    Saved,
    Booking,
    Invite,
    Wizard,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      style: {height: ScreenHeight * 0.1},
      showLabel: false,
      activeTintColor: 'rgb(238,46,36)',
      inactiveTintColor: 'black',
    },
  },
);

const AppStack = createStackNavigator(
  {
    App,
    Profile,
    HotelsSearch,
    SelectArea,
  },
  {
    headerMode: 'none',
  },
);

const AppDraw = createDrawerNavigator(
  {
    AppStack,
  },
  {
    contentComponent: DrawerDesign,
    drawerWidth: ScreenWidth * 0.85,
  },
);

const style = StyleSheet.create({
  tabView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenHeight * 0.08,
    // backgroundColor: 'pink',
    width: ScreenWidth * 0.19,
  },
});

export default createAppContainer(AppDraw);
