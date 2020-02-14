import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import {_getAsyncStroge} from '../Common/AsyncStorage';
import {LOGIN_ASYNC_STORAGE} from '../Constants';
import {NavigationEvents} from 'react-navigation';
Icon.loadFont();
Icon1.loadFont();
Icon3.loadFont();
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;
class DrawerDesign extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'Hi Guest',
      phone: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profile != this.props.profile) {
      this.componentDidMount();
    }
  }

  componentDidMount() {
    if (this.props.profile && this.props.profile[0]) {
      this.setState(
        {
          username: this.props.profile[0].name
            ? this.props.profile[0].name
            : 'Hi Guest',
          phone: this.props.profile[0].phone
            ? '+91 ' + this.props.profile[0].phone
            : '',
        },
        () => {},
      );
    } else {
      this.setState({username: 'Hi Guest', phone: ''}, () => {});
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationEvents
          onWillFocus={payload => {
            this.componentDidMount();
          }}
          onDidFocus={payload => {
            this.componentDidMount();
          }}
        />
        <View style={styles.mainView}>
          <ScrollView>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}>
              <View style={styles.headerView}>
                <View style={styles.userNameView}>
                  <View style={styles.userIconView}>
                    <Icon
                      name={'user'}
                      size={widthScreen * 0.07}
                      color={'white'}
                    />
                  </View>
                  <View>
                    <Text style={styles.userNameText}>
                      {this.state.username}
                    </Text>
                    <Text style={styles.userNameText}>{this.state.phone}</Text>
                  </View>
                </View>
                <Icon
                  name={'right'}
                  color={'white'}
                  size={widthScreen * 0.07}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Wizard')}>
              <View style={[styles.wizardMainView, styles.marginLeftRight]}>
                <View style={styles.wizardIcinView}>
                  <Text style={styles.wizardIcon}>W</Text>
                </View>
                <View style={{marginLeft: widthScreen * 0.02}}>
                  <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                    Become an OYO Wizard
                  </Text>
                  <Text style={{fontFamily: 'OpenSans-Regular'}}>
                    Enjoiy upto 10% on your booking
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.walletText, styles.marginLeftRight]}>
              Wallets
            </Text>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Icon1 name={'wallet'} size={widthScreen * 0.06} />
              <Text style={styles.bigText}>All Wallets</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('Invite');
              }}>
              <View style={[styles.marginLeftRight, styles.screenList]}>
                <Icon name={'adduser'} size={widthScreen * 0.06} />
                <View>
                  <Text style={styles.bigText}>Invite and Earn</Text>
                  <Text style={styles.smallText}>
                    Refer your friends and earn OYO Rupee
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Icon1 name={'message'} size={widthScreen * 0.06} />
              <View>
                <Text style={styles.bigText}>OYO Ping</Text>
                <Text style={styles.smallText}>Chat with us</Text>
              </View>
            </View>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Icon1 name={'help'} size={widthScreen * 0.06} />
              <View>
                <Text style={styles.bigText}>Need Help?</Text>
                <Text style={styles.smallText}>Manage your bookings</Text>
              </View>
            </View>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Icon2 name={'landmark'} size={widthScreen * 0.06} />
              <Text style={styles.bigText}>List your property</Text>
            </View>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Icon3 name={'language'} size={widthScreen * 0.06} />
              <Text style={styles.bigText}>Change Language</Text>
            </View>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Icon3 name={'lock'} size={widthScreen * 0.06} />
              <Text style={styles.bigText}>Privacy</Text>
            </View>
            <View style={[styles.marginLeftRight, styles.screenList]}>
              <Text style={styles.smallText}>v -5.2.43</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  bigText: {marginLeft: widthScreen * 0.04, fontSize: widthScreen * 0.036},
  smallText: {
    marginLeft: widthScreen * 0.04,
    fontFamily: 'OpenSans-Light',
    fontSize: widthScreen * 0.033,
  },
  screenList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: heightScreen * 0.02,
    paddingBottom: heightScreen * 0.01,
  },
  walletText: {fontFamily: 'OpenSans-Light'},
  wizardMainView: {
    height: widthScreen * 0.22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wizardIcinView: {
    backgroundColor: 'black',
    height: widthScreen * 0.11,
    width: widthScreen * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthScreen * 0.5,
  },
  wizardIcon: {
    color: 'gold',
    fontSize: widthScreen * 0.06,
    fontFamily: 'OpenSans-Bold',
  },
  marginLeftRight: {
    paddingRight: widthScreen * 0.03,
    paddingLeft: widthScreen * 0.03,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(238,46,36,0.7)',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  userIcon: {
    width: widthScreen * 0.1,
    height: widthScreen * 0.1,
  },
  headerView: {
    height: widthScreen * 0.25,
    backgroundColor: 'rgb(238,46,36)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: widthScreen * 0.03,
    paddingLeft: widthScreen * 0.03,
  },
  userIconView: {
    backgroundColor: 'rgb(165,25,50)',
    height: widthScreen * 0.1,
    width: widthScreen * 0.1,
    borderRadius: widthScreen * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameText: {
    color: 'white',
    fontSize: widthScreen * 0.04,
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: widthScreen * 0.03,
  },
});
const mapStatesToProps = state => {
  return {
    profile: state.ProfileReducer.profile,
  };
};
export default connect(
  mapStatesToProps,
  null,
)(DrawerDesign);
