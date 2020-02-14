import React from 'react';
import {OtpModel} from '../Common/OtpModel';
import {CountryCode} from '../Common/CountryCode';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {_CountryCode} from '../Actions/ProfileActions';
import {connect} from 'react-redux';
Icon.loadFont();
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;
class SavedClass extends React.Component {
  componentDidMount() {
    this._LoginCheck();
  }
  constructor() {
    super();
    this.state = {
      isLogin: false,
      openMOdel: false,
      phone: '',
      showMsg: false,
      isFocuse: false,
      isCountryCodeModel: false,
      countryCode: '+91',
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profile != this.props.profile) {
      this.componentDidMount();
    }
  }
  _LoginCheck = () => {
    if (this.props.profile) {
      this.setState({isLogin: true}, () => {});
    } else {
      this.setState({isLogin: false}, () => {});
    }
  };

  _ifLogin = () => {
    return <Text>HOME</Text>;
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
          <Text style={styles.headingText}>Saved Hotels</Text>
        </View>
        <View
          style={{height: 1, width: widthScreen, backgroundColor: 'grey',opacity:0.5}}
        />
        <View style={styles.middelScreen}>
          <Image
            source={require('../Assets/Images/saved_hotel.gif')}
            style={{height: widthScreen * 0.5, width: widthScreen * 0.5}}
          />
          <Text style={styles.signinText}>
            Sign in to view your saved hotels
          </Text>
          <Text style={styles.smallText}>
            Shortlisted hotels are saved to your account
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
          <View />
          {this.state.isLogin ? this._ifLogin() : this._ifNotLogin()}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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
  {_CountryCode},
)(SavedClass);
