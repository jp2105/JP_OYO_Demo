import React, {useState} from 'react';
import {OtpModel} from '../Common/OtpModel';
import {CountryCode} from '../Common/CountryCode';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Platform,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import {
  _getAsyncStroge,
  _setAsyncStroge,
  _removeAsyncStorage,
} from '../Common/AsyncStorage';
import {_CountryCode} from '../Actions/ProfileActions';
import {_setProfile, _getProfile} from '../Actions/ProfileActions';
import {LOGIN_ASYNC_STORAGE} from '../Constants';
Icon.loadFont();
Icon1.loadFont();
Icon2.loadFont();
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;
class ProfileClass extends React.Component {
  componentDidMount() {
    this._LoginCheck();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profile && prevProps.profile !== this.props.profile) {
      this.componentDidMount();
    }
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params != prevProps.navigation.state.params
    ) {
      this.componentDidMount();
    }
  }
  constructor() {
    super();
    this.state = {
      isLogin: false,
      openMOdel: false,
      phone: '',
      showMsg: false,
      isFocuse: false,
      gender: '',
      married: '',
      date: '',
      isCountryCodeModel: false,
      countryCode: '+91',
    };
    this.email = '';
    this.name = '';
    this.city = '';
    this.cityOnId = '';
  }
  _setAllValue = () => {
    if (this.props.profile[0]) {
      this.email = this.props.profile[0].hasOwnProperty('email')
        ? this.props.profile[0].email
        : '';
      this.name = this.props.profile[0].hasOwnProperty('name')
        ? this.props.profile[0].name
        : '';
      this.city = this.props.profile[0].hasOwnProperty('city')
        ? this.props.profile[0].city
        : '';
      this.cityOnId = this.props.profile[0].hasOwnProperty('city_on_ID')
        ? this.props.profile[0].city_on_ID
        : '';
      this.phone = this.props.profile[0].hasOwnProperty('email')
        ? this.props.profile[0].phone
        : '';
      this.setState({
        gender: this.props.profile[0].hasOwnProperty('gender')
          ? this.props.profile[0].gender
          : '',
        married: this.props.profile[0].hasOwnProperty('married') ? 'unmarried' : 'married',
        date: this.props.profile[0].hasOwnProperty('dob')
          ? this.props.profile[0].dob
          : '',
        phone: this.props.profile[0].hasOwnProperty('phone')
          ? this.props.profile[0].phone
          : '',
      });
    }
  };
  _LoginCheck = () => {
    if (this.props.profile) {
      this.setState({isLogin: true});
      this._setAllValue();
    } else {
      const temp = this.props.navigation.getParam('phone', '');
      if (temp.length) {
        let data = {phone: this.state.phone};
        this.props._getProfile(data).then(res => {
          this.setState({isLogin: true, phone: temp});
          _setAsyncStroge(LOGIN_ASYNC_STORAGE, temp);
          this._setAllValue();
        });
      }
    }
  };
  _ifLogin = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.textInputView}>
            <Icon1
              name={'mail'}
              size={widthScreen * 0.05}
              style={{opacity: 0.5}}
            />
            <TextInput
              style={styles.textView}
              keyboardType={'email-address'}
              placeholder={'Email'}
              onChangeText={value => {
                this.email = value;
              }}>
              {this.email}
            </TextInput>
          </View>

          <View style={styles.textInputView}>
            <Icon2
              name={'phone'}
              size={widthScreen * 0.05}
              style={{opacity: 0.5}}
            />
            <TextInput
              style={styles.textView}
              keyboardType={'phone-pad'}
              placeholder={'Phone'}
              editable={false}>
              {this.state.phone}
            </TextInput>
          </View>

          <View style={styles.textInputView}>
            <Icon1
              name={'user'}
              size={widthScreen * 0.05}
              style={{opacity: 0.5}}
            />
            <TextInput
              style={styles.textView}
              placeholder={'Name'}
              onChangeText={value => {
                this.name = value;
              }}>
              {this.name}
            </TextInput>
          </View>

          <View style={styles.genderMainView}>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({gender: 'male'})}>
                <View style={styles.genderview}>
                  <Icon2
                    name={'user'}
                    size={widthScreen * 0.2}
                    color={
                      this.state.gender === 'male'
                        ? '#FF1D8E'
                        : 'rgb(100,100,101)'
                    }
                  />
                  <Text
                    style={{
                      color:
                        this.state.gender === 'male'
                          ? '#FF1D8E'
                          : 'rgb(100,100,101)',
                      marginLeft: widthScreen * 0.055,
                    }}>
                    Male
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.setState({gender: 'female'})}>
                <View
                  style={[styles.genderview, {marginLeft: widthScreen * 0.1}]}>
                  <Icon2
                    name={'user-female'}
                    size={widthScreen * 0.2}
                    color={
                      this.state.gender === 'female'
                        ? '#FF1D8E'
                        : 'rgb(100,100,101)'
                    }
                  />
                  <Text
                    style={{
                      marginLeft: widthScreen * 0.04,
                      color:
                        this.state.gender === 'female'
                          ? '#FF1D8E'
                          : 'rgb(100,100,101)',
                    }}>
                    Female
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={{flexDirection: 'row', marginTop: widthScreen * 0.03}}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({married: 'married'})}>
                <View
                  style={[
                    styles.marriedView,
                    {
                      backgroundColor:
                        this.state.married === 'married' ? 'pink' : 'white',
                    },
                  ]}>
                  <Image
                    source={require('../Assets/Images/married.png')}
                    style={styles.marriedImage}
                  />
                  <Text
                    style={{
                      fontSize: widthScreen * 0.04,
                      color:
                        this.state.married === 'married'
                          ? 'white'
                          : 'rgb(100,100,101)',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    Married
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.setState({married: 'unmarried'})}>
                <View
                  style={[
                    styles.marriedView,
                    {
                      paddingLeft: widthScreen * 0.03,
                      paddingRight: widthScreen * 0.13,
                      marginLeft: widthScreen * 0.03,
                      backgroundColor:
                        this.state.married === 'unmarried' ? 'pink' : 'white',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: widthScreen * 0.04,
                      color:
                        this.state.married === 'unmarried'
                          ? 'white'
                          : 'rgb(100,100,101)',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    Unmarried
                  </Text>
                  <Image
                    source={
                      this.state.gender === 'female'
                        ? require('../Assets/Images/unmarriedfemale.png')
                        : require('../Assets/Images/unmarried.png')
                    }
                    style={styles.unmarriedImage}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.textInputView}>
            <Icon3
              name={'building-o'}
              size={widthScreen * 0.05}
              style={{opacity: 0.5}}
            />
            <TextInput
              style={styles.textView}
              placeholder={'Your City of Residence'}
              onChangeText={value => {
                this.city = value;
              }}>
              {this.city}
            </TextInput>
          </View>
          <View style={styles.textInputView}>
            <Icon1
              name={'idcard'}
              size={widthScreen * 0.05}
              style={{opacity: 0.5}}
            />
            <TextInput
              style={styles.textView}
              placeholder={'City on your ID Card'}
              onChangeText={value => {
                this.cityOnId = value;
              }}>
              {this.cityOnId}
            </TextInput>
          </View>
          <View
            style={[
              styles.textInputView,
              // {padding: widthScreen * 0.015}
            ]}>
            <Icon1
              name={'idcard'}
              size={widthScreen * 0.05}
              style={{opacity: 0.5}}
            />
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="Your Birthday"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  fontSize: widthScreen * 0.05,
                  width: widthScreen * 0.75,
                  color: 'grey',
                  borderWidth: 0,
                  right: 0,
                  position: 'absolute',
                },
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
            />
          </View>
        </ScrollView>

        <View
          style={{
            marginBottom: widthScreen * 0.03,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'grey',
            width: widthScreen * 0.9,
            alignSelf: 'center',
            borderRadius: widthScreen * 0.25,
          }}>
          <TouchableWithoutFeedback
            style={{position: 'absolute'}}
            onPress={() => {
              _removeAsyncStorage(LOGIN_ASYNC_STORAGE).then(res => {
                this.props._setProfile('');
                this.props.navigation.navigate('Home');
              });
            }}>
            <Text
              style={{
                fontSize: widthScreen * 0.05,
                padding: widthScreen * 0.02,
              }}>
              Logout
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  _closeModel = () => {
    this.setState({openMOdel: false, isCountryCodeModel: false});
  };

  _removeFocuse = () => {
    this.setState({isFocuse: !this.state.openMOdel});
  };
  _setCountryCode = code => {
    this.setState({countryCode: code});
  };
  _ifNotLogin = () => {
    return (
      <View style={{flex: 1}}>
        <OtpModel
          states={this.state}
          me={this}
          Close={this._closeModel}
          _removeFocuse={this._removeFocuse}
        />
        <CountryCode
            states={this.state}
            Close={this._closeModel}
            myProps={this.props}
            _setCountryCode={code => {
              this._setCountryCode(code);
            }}
        />
        <View style={styles.middelScreen}>
          <Image
            source={require('../Assets/Images/profile.jpg')}
            style={{height: widthScreen * 0.5, width: widthScreen * 0.5}}
          />
          <Text style={styles.signinText}>Sign in to access your profile</Text>
          <Text style={styles.smallText}>
            All your preferences are saved to your account
          </Text>
        </View>
        <View style={styles.mobileNoMainView}>
          <View style={styles.mobileNoInnerView}>
            <View style={styles.mobileNoView}>
              <TouchableWithoutFeedback
                  onPress={() => {
                    this.props
                        ._CountryCode()
                        .then(this.setState({isCountryCodeModel: true}));
                  }}>
                <Text style={{marginLeft: widthScreen * 0.05}}>
                   {this.state.countryCode}{' '}
                </Text>
              </TouchableWithoutFeedback>
              <TextInput
                maxLength={10}
                keyboardType={'numeric'}
                style={styles.mobileNoText}
                placeholder={'Mobile Number'}
                onChangeText={value => {
                  this.setState({phone: value});
                }}
              />
              <TouchableWithoutFeedback onPress={() => this._checkPhone()}>
                <View style={styles.mobileIconView}>
                  <Icon
                    name={'ios-arrow-round-forward'}
                    size={widthScreen * 0.1}
                    color={'white'}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            {this.state.showMsg ? (
              <Text style={{color: 'red'}}>Please enter valid phone no.</Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    );
  };
  _checkPhone = () => {
    this.state.phone.length === 10
      ? this.setState({openMOdel: true, showMsg: false})
      : this.setState({showMsg: true});
  };
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainView}>
          <View style={styles.mainHeader}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name={'ios-arrow-round-back'}
                size={widthScreen * 0.1}
                style={{position: 'absolute', left: widthScreen * 0.05}}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.headingText}>Profile</Text>
            <View style={{position: 'absolute', right: widthScreen * 0.05}}>
              {this.state.isLogin ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    let data = {
                      email: this.email,
                      phone: this.state.phone,
                      name: this.name,
                      gender: this.state.gender,
                      married: this.state.married === 'married' ? true : false,
                      city: this.city,
                      city_on_ID: this.cityOnId,
                      dob: this.state.date,
                    };
                    this.props._setProfile(data);
                    this.props.navigation.navigate('Home');
                  }}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      padding: widthScreen * 0.02,
                      borderRadius: widthScreen * 0.25,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'OpenSans-SemiBold',
                        fontSize: widthScreen * 0.035,
                      }}>
                      SAVE
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View
            style={{height: 1, width: widthScreen, backgroundColor: 'grey',opacity:0.5}}
          />
          {this.state.isLogin ? this._ifLogin() : this._ifNotLogin()}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  unmarriedImage: {
    position: 'absolute',
    right: widthScreen * 0.03,
    width: widthScreen * 0.09,
    height: widthScreen * 0.085,
  },
  marriedImage: {
    position: 'absolute',
    left: widthScreen * 0.03,
    width: widthScreen * 0.1,
    height: widthScreen * 0.1,
  },
  marriedView: {
    borderColor: 'rgb(100,100,101)',
    borderWidth: 2,
    paddingTop: widthScreen * 0.02,
    paddingBottom: widthScreen * 0.02,
    paddingLeft: widthScreen * 0.17,
    paddingRight: widthScreen * 0.03,
    borderRadius: widthScreen * 0.25,
  },
  genderTextView: {
    flexDirection: 'row',
    width: widthScreen * 0.9,
    alignContent: 'center',
    justifyContent: 'center',
  },
  genderview: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  genderMainView: {
    marginLeft: widthScreen * 0.04,
    marginRight: widthScreen * 0.04,
    marginTop: widthScreen * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    padding: widthScreen * 0.04,
    backgroundColor: 'rgb(247,247,251)',
    // backgroundColor: 'red',
    borderRadius: widthScreen * 0.2,
  },
  textView: {
    fontSize: widthScreen * 0.05,
    width: widthScreen * 0.75,
    color: 'grey',
  },
  textInputView: {
    marginLeft: widthScreen * 0.04,
    marginRight: widthScreen * 0.04,
    marginTop: widthScreen * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: widthScreen * 0.04,
    backgroundColor: 'rgb(247,247,251)',
    // backgroundColor: 'red',
    borderRadius: widthScreen * 0.2,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgb(238,46,36)',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainHeader: {
    height: widthScreen * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthScreen,
    flexDirection: 'row',
  },
  headingText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: widthScreen * 0.05,
  },
  middelScreen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  signinText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: widthScreen * 0.035,
  },
  smallText: {fontFamily: 'OpenSans-Light', fontSize: widthScreen * 0.03},
  mobileNoMainView: {
    height: widthScreen * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileNoInnerView: {
    height: widthScreen * 0.3,
    width: widthScreen * 0.85,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
  },
  mobileNoView: {
    backgroundColor: 'rgb(247,247,251)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthScreen * 0.75,
  },
  mobileNoText: {
    width: widthScreen * 0.48,
  },
  mobileIconView: {
    backgroundColor: 'rgb(226,33,53)',
    paddingLeft: widthScreen * 0.05,
    paddingRight: widthScreen * 0.05,
  },
});
const mapStatesToProps = state => {
  return {
    profile: state.ProfileReducer.profile,
    countryCode: state.ProfileReducer.CountryCode,
  };
};
export default connect(
  mapStatesToProps,
  {_setProfile, _getProfile, _CountryCode},
)(ProfileClass);
