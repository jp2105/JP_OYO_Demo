import React from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  _getCities,
  _getHotels,
  _getCurrentCIty,
  _findCity,
} from '../Actions/HomeAction';
import {_getProfile} from '../Actions/ProfileActions';
import {LOGIN_ASYNC_STORAGE} from '../Constants';
import {_getAsyncStroge, _setAsyncStroge} from '../Common/AsyncStorage';
import {NavigationEvents} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Platform,
  Dimensions,
  Animated,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-navigation';
Icon.loadFont();
Icon1.loadFont();
Icon2.loadFont();
Icon3.loadFont();
Icon4.loadFont();
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;

class HomeClass extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
    this.scrollY = new Animated.Value(0);
  }

  componentDidMount() {
    this._CheckLogin();
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    this.props._getCities();
    this.props._getHotels();
  }
  _getLocatio = () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = position;
        this.props
          ._getCurrentCIty(
            initialPosition.coords.latitude,
            initialPosition.coords.longitude,
          )
          .then(res => this.props.navigation.navigate('SelectArea'));
      },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  };
  _nearBy = () => {
    return (
      <TouchableWithoutFeedback onPress={this._getLocatio}>
        <View style={styles.nearByView}>
          <View style={styles.nearByColor}>
            <Icon4
              name={'location-searching'}
              size={widthScreen * 0.1}
              color={'white'}
            />
          </View>
          <Text>Near</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _citiesData = (item, index) => {
    let img = item.img.split('.');
    return (
      <View style={{flexDirection: 'row'}}>
        {index == 0 ? this._nearBy() : <></>}
        <TouchableWithoutFeedback
          onPress={() => {
            this.props._findCity(item.city);
            this.props.navigation.navigate('SelectArea');
          }}>
          <View style={styles.citiesView}>
            <Image source={{uri: img[0]}} style={styles.citiesImage} />
            <Text>{item.city}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  _hotelsData = (item, index) => {
    return (
      <View style={{marginRight: widthScreen * 0.025}}>
        <Image
          source={{uri: item.mainImg}}
          style={styles.holetCollectionImage}
        />
        <View style={styles.hotelRatingView}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Icon3 name={'star'} color={'white'} size={widthScreen * 0.035} />
        </View>
        <View style={styles.hotelDecriptionView}>
          <Text style={styles.hotelNameText}>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.hotelStartingText}>STARTING AT</Text>
            <Text style={styles.priceText}> ₹{item.price}</Text>
          </View>
        </View>
      </View>
    );
  };

  _CheckLogin = () => {
    _getAsyncStroge(LOGIN_ASYNC_STORAGE)
      .then(res => {
        if (res) {
          let data = {
            phone: res,
          };
          this.props._getProfile(data);
          this.setState({isLogin: true}, () => {});
        } else {
          this.setState({isLogin: false}, () => {});
        }
      })
      .catch();
  };

  _text = () => {
    return (
      <View style={styles.marginLeftRight}>
        <Text style={styles.headingText}>Sign up now</Text>
        <Image source={{uri: 'signup1'}} style={styles.signupImage} />
      </View>
    );
  };

  render() {
    const hideOYO = this.scrollY.interpolate({
      inputRange: [widthScreen * 0, widthScreen * 0.2],
      outputRange: [widthScreen * 0.11, 0],
      extrapolate: 'clamp',
    });
    const headerView = this.scrollY.interpolate({
      inputRange: [widthScreen * 0, widthScreen * 0.2],
      outputRange: [widthScreen * 0.27, widthScreen * 0.17],
      extrapolate: 'clamp',
    });
    const searchTextView = this.scrollY.interpolate({
      inputRange: [widthScreen * 0, widthScreen * 0.2],
      outputRange: [widthScreen * 0.9, widthScreen * 0.78],
      extrapolate: 'clamp',
    });
    const searchText = this.scrollY.interpolate({
      inputRange: [widthScreen * 0, widthScreen * 0.2],
      outputRange: [widthScreen * 0.85, widthScreen * 0.75],
      extrapolate: 'clamp',
    });
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationEvents
          onWillFocus={payload => {
            this._CheckLogin();
          }}
          onDidFocus={payload => {
            this._CheckLogin();
          }}
        />
        <View style={styles.mainView}>
          {/*header start */}
          <Animated.View
            style={[
              styles.headerMainView,
              {
                height: headerView,
              },
            ]}>
            <View
              style={{
                position: 'absolute',
                left: widthScreen * 0.03,
                top: widthScreen * 0.035,
                zIndex: 4000,
              }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon1
                  name={'menu'}
                  size={widthScreen * 0.08}
                  color={'white'}
                />
              </TouchableWithoutFeedback>
            </View>

            <Icon2
              style={{
                position: 'absolute',
                right: widthScreen * 0.05,
                top: widthScreen * 0.038,
              }}
              name={'md-notifications-outline'}
              size={widthScreen * 0.075}
              color={'white'}
            />
            <View style={[styles.oyoTextView]}>
              <Animated.View style={{height: hideOYO}}>
                <Text style={styles.oyoText}>OYO</Text>
              </Animated.View>
            </View>
            <View>
              <Animated.View
                style={[styles.searchTextView, {width: searchTextView}]}>
                <Icon
                  style={{marginLeft: widthScreen * 0.01}}
                  name={'search1'}
                  size={widthScreen * 0.055}
                  color={'grey'}
                />
                <TextInput
                  style={styles.searchTextInput}
                  placeholder={'Search for Hotel or City'}
                />
              </Animated.View>
            </View>
          </Animated.View>
          <ScrollView
            bounces={false}
            scrollEventThrottle={100}
            ref={ref => {
              this.scrollview_ref = ref;
            }}
            onScroll={Animated.event([
              {
                nativeEvent: {contentOffset: {y: this.scrollY}},
              },
            ])}>
            {/*header end */}
            {/*city start*/}
            <View style={styles.cityMainView}>
              <ScrollView
                bounces={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  {this.props.cities &&
                    this.props.cities.map((item, index) =>
                      this._citiesData(item, index),
                    )}
                </View>
              </ScrollView>
            </View>
            {/*city end*/}
            {this.state.isLogin ? null : this._text()}
            <View style={styles.marginLeftRight}>
              <Text style={styles.headingText}>Welcome Aboard!</Text>
              <ScrollView
                bounces={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={{uri: 'offer1'}} style={styles.offerImage} />
                  <Image source={{uri: 'offer2'}} style={styles.offerImage} />
                  <Image source={{uri: 'offer3'}} style={styles.offerImage} />
                  <Image source={{uri: 'offer4'}} style={styles.offerImage} />
                  {/*<Image source={{uri: 'test'}} style={styles.offerImage} />*/}
                </View>
              </ScrollView>
            </View>
            <View style={styles.marginLeftRight}>
              <Text style={styles.headingText}>Our Collections</Text>
              <ScrollView
                bounces={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  {this.props.hotels &&
                    this.props.hotels.map((item, index) =>
                      this._hotelsData(item, index),
                    )}
                </View>
              </ScrollView>
            </View>
            <View style={styles.marginLeftRight}>
              <Text style={styles.headingText}>Wizard</Text>
              <Image source={{uri: 'wizard'}} style={styles.wizardImage} />
            </View>
            <View style={styles.marginLeftRight}>
              <Text style={styles.headingText}>OYO Specials</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: widthScreen * 0.025}}>
                  <Image
                    source={{uri: 'oyoLife'}}
                    style={styles.oyoSpecialImage}
                  />
                  <View style={styles.oyoSpecialView}>
                    <Text style={styles.oyoSpecialText}>OYO LIFE</Text>
                    <Text style={styles.oyoSpecialDecText}>
                      Furnished Affordable Rental Homes for Boys, Girls &
                      Couples.
                    </Text>
                  </View>
                </View>
                <View style={{marginRight: widthScreen * 0.025}}>
                  <Image
                    source={{uri: 'weddingz'}}
                    style={styles.oyoSpecialImage}
                  />
                  <View style={styles.oyoSpecialView}>
                    <Text style={styles.oyoSpecialText}>Weddingz</Text>
                    <Text style={styles.oyoSpecialDecText}>
                      Plan your wedding with India's Largest Wedding Company
                      Weddingz.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.marginLeftRight}>
              <Text style={styles.headingText}>SOS for your safety</Text>
              <Image source={{uri: 'sos'}} style={styles.wizardImage} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  nearByView: {
    padding: widthScreen * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearByColor: {
    height: widthScreen * 0.18,
    width: widthScreen * 0.18,
    borderRadius: widthScreen * 0.25,
    backgroundColor: 'rgb(238,46,36)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgb(238,46,36)',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  headerMainView: {
    backgroundColor: 'rgb(238,46,36)',
    height: widthScreen * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextInput: {
    height: widthScreen * 0.12,
    fontSize: widthScreen * 0.045,
    fontFamily: 'OpenSans-Regular',
    width: widthScreen * 0.85,
    marginLeft: widthScreen * 0.005,
  },
  searchTextView: {
    width: widthScreen * 0.95,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: widthScreen * 0.015,
    alignItems: 'center',
    height: widthScreen * 0.12,
    // justifyContent: 'center',
  },
  oyoText: {
    fontSize: widthScreen * 0.08,
    fontFamily: 'OpenSans-ExtraBold',
    color: 'white',
  },
  oyoTextView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: widthScreen * 0.95,
  },
  cityMainView: {
    height: widthScreen * 0.3,
    // backgroundColor: 'pink',
  },
  offerImage: {
    height: widthScreen * 0.3,
    width: widthScreen * 0.48,
    resizeMode: 'cover',
    marginRight: widthScreen * 0.025,
    borderRadius: widthScreen * 0.026,
  },
  signupImage: {
    height: widthScreen * 0.6,
    width: widthScreen * 0.94,
    resizeMode: 'stretch',
    marginRight: widthScreen * 0.025,
    borderRadius: 5,
  },
  marginLeftRight: {
    marginLeft: widthScreen * 0.03,
    marginRight: widthScreen * 0.03,
  },
  headingText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.04,
    marginBottom: heightScreen * 0.015,
    marginTop: heightScreen * 0.015,
  },
  holetCollectionImage: {
    height: widthScreen * 0.4,
    width: widthScreen * 0.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  citiesView: {
    padding: widthScreen * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  citiesImage: {
    height: widthScreen * 0.18,
    width: widthScreen * 0.18,
    borderRadius: widthScreen * 0.25,
  },
  wizardImage: {
    height: widthScreen * 0.5,
    width: widthScreen * 0.93,
    borderRadius: 10,
  },
  hotelRatingView: {
    backgroundColor: 'rgb(52,94,12)',
    position: 'absolute',
    paddingLeft: widthScreen * 0.02,
    paddingRight: widthScreen * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: widthScreen * 0.35,
  },
  ratingText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: widthScreen * 0.04,
    marginRight: widthScreen * 0.01,
  },
  hotelDecriptionView: {
    backgroundColor: '#e5e5ff',
    height: widthScreen * 0.2,
    paddingLeft: widthScreen * 0.025,
    paddingTop: widthScreen * 0.025,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  oyoSpecialView: {
    backgroundColor: 'white',
    paddingLeft: widthScreen * 0.025,
    paddingTop: widthScreen * 0.035,
    paddingBottom: widthScreen * 0.03,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  hotelNameText: {
    color: 'rgb(23,62,100)',
    fontSize: widthScreen * 0.035,
    width: widthScreen * 0.35,
    height: heightScreen * 0.03,
    fontFamily: 'OpenSans-Bold',
  },
  oyoSpecialDecText: {
    fontSize: widthScreen * 0.03,
    width: widthScreen * 0.35,
    fontFamily: 'OpenSans-Regular',
  },
  oyoSpecialText: {
    fontSize: widthScreen * 0.035,
    fontFamily: 'OpenSans-SemiBold',
  },
  hotelStartingText: {
    color: 'rgb(23,62,100)',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.03,
  },
  priceText: {
    color: 'rgb(23,62,100)',
    fontFamily: 'OpenSans-Bold',
    fontSize: widthScreen * 0.048,
  },
  oyoSpecialImage: {
    width: widthScreen * 0.47,
    height: widthScreen * 0.28,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

const mapStatesToProps = state => {
  return {
    cities: state.HomeReducer.cities,
    hotels: state.HomeReducer.hotels,
  };
};

export default connect(
  mapStatesToProps,
  {_getCities, _getHotels, _getCurrentCIty, _getProfile, _findCity},
)(HomeClass);
