import React from 'react';
import {SelectDateModel} from '../Common/SelectDateModel';
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
  Animated,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Moment from 'moment';
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;
class HotelsSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      searchCity: '',
      isSearch: false,
      cities: [],
      openMOdel: false,
      checkIn: Moment(new Date()).format('YYYY-MM-DD'),
      checkOut: Moment(new Date()).format('YYYY-MM-DD'),
      room: '',
      guest: '',
      child: '',
      index: 0,
    };
  }

  _setStates = (key, value) => {
    this.setState({[key]: value});
  };
  _getday = date => {
    let temp = new Date();
    temp.setDate(temp.getDate() + 1);
    temp=Moment(new Date(temp)).format('YYYY-MM-DD');
    if (date === Moment(new Date()).format('YYYY-MM-DD')) {
      return <Text style={styles.dateTextInput}>Today</Text>;
    } else if(temp === date){
      return <Text style={styles.dateTextInput}>Tomorrow</Text>;
    }
    else {
      return (
        <Text style={styles.dateTextInput}>
          {Moment(this.state.checkOut).format('ddd,DD MMM')}
        </Text>
      );
    }
  };
  componentDidMount(): void {
    let checkoutDate = new Date();
    checkoutDate.setDate(checkoutDate.getDate() + 1);
    checkoutDate = Moment(new Date(checkoutDate)).format('YYYY-MM-DD');
    this.setState({
      searchCity: this.props.searchCity,
      cities: this.props.cities.find(item =>
        item.city[0].includes(this.props.searchCity),
      ),
      checkOut: checkoutDate,
    });
  }
  _closeModel = () => {
    this.setState({openMOdel: false});
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainView}>
          <SelectDateModel
            states={this.state}
            _setStates={(key, value) => {
              this._setStates(key, value);
            }}
            Close={this._closeModel}
          />
          <View style={styles.mainHeader}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name={'ios-arrow-round-back'}
                size={widthScreen * 0.1}
                color={'red'}
              />
            </TouchableWithoutFeedback>
            <Text
              style={[
                styles.headingText,
                {opacity: this.state.isSearch ? 0 : 1},
              ]}>
              Where in {this.state.searchCity && this.state.searchCity}?
            </Text>
            <TextInput
              style={[
                styles.searchTextInput,
                {opacity: this.state.isSearch ? 1 : 0},
              ]}
              placeholder={'Search for Hotel,City or Location'}
            />
            <TouchableWithoutFeedback
              onPress={() => this.setState({isSearch: true})}>
              <Icon1
                style={{marginLeft: widthScreen * 0.01}}
                name={'search1'}
                size={widthScreen * 0.055}
                color={'red'}
              />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <View style={styles.dateTimeMainView}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({openMOdel: true, index: 0})}>
                <View style={styles.dateTimeInnerView}>
                  {this._getday(this.state.checkIn)}
                  <Text style={styles.timeTextInput}>12:00 PM</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{width: widthScreen * 0.09}}>
                <View style={styles.virticalLineView} />

                <Text style={styles.totalNightText}>
                  {Moment(this.state.checkOut).diff(
                    Moment(this.state.checkIn),
                    'days',
                  )}
                  N
                </Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => this.setState({openMOdel: true, index: 1})}>
                <View style={styles.dateTimeInnerView}>
                  {this._getday(this.state.checkOut)}
                  <Text style={styles.timeTextInput}>11:00 AM</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.virticalLineView} />
              <TouchableWithoutFeedback
                onPress={() => this.setState({openMOdel: true, index: 2})}>
                <View style={styles.dateTimeInnerView}>
                  <Text style={styles.dateTextInput}>Room</Text>
                  <Text style={styles.timeTextInput}>Guest</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.horizantalLine} />
          <ScrollView>
            <View style={styles.allOfView}>
              <Text
                style={{
                  fontSize: widthScreen * 0.045,
                  fontFamily: 'OpenSans-Regular',
                }}>
                All of {this.state.searchCity && this.state.searchCity}
              </Text>
              <Icon2 name={'arrow-right'} size={widthScreen * 0.04} />
            </View>
            <View
              style={[
                styles.horizantalLine,
                {
                  width: widthScreen * 0.92,
                  alignSelf: 'center',
                  marginTop: widthScreen * 0.04,
                },
              ]}
            />
            <View style={styles.popularCitiesView}>
              <Text style={styles.popularCitiesText}>Popular Localities</Text>
            </View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {this.state.cities.area &&
                this.state.cities.area.map((item, index) =>
                  index < 5 ? (
                    <View style={styles.citiesTextView}>
                      <Text
                        style={{
                          fontSize: widthScreen * 0.04,
                          fontFamily: 'OpenSans-Light',
                        }}>
                        {item}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  ),
                )}
            </View>
            <View style={styles.popularCitiesView}>
              <Text style={styles.popularCitiesText}>All Localities</Text>
            </View>
            <View
              style={{
                marginLeft: widthScreen * 0.05,
                marginRight: widthScreen * 0.05,
              }}>
              {this.state.cities.area &&
                this.state.cities.area.map((item, index) => (
                  <View style={{marginBottom: widthScreen * 0.05}}>
                    <Text style={{fontFamily: 'OpenSans-Regular'}}>{item}</Text>
                    <View
                      style={[
                        styles.horizantalLine,
                        {
                          width: widthScreen * 0.92,
                          alignSelf: 'center',
                          marginTop: widthScreen * 0.04,
                        },
                      ]}
                    />
                  </View>
                ))}
            </View>
          </ScrollView>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: widthScreen * 0.05,
    marginRight: widthScreen * 0.05,
  },
  headingText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: widthScreen * 0.04,
  },
  searchTextInput: {position: 'absolute', left: widthScreen * 0.1},
  horizantalLine: {
    height: 1,
    width: widthScreen,
    backgroundColor: 'grey',
    opacity: 0.3,
    marginTop: widthScreen * 0.03,
  },
  dateTextInput: {
    color: 'red',
    fontSize: widthScreen * 0.035,
    fontFamily: 'OpenSans-Regular',
  },
  timeTextInput: {
    fontFamily: 'OpenSans-Regular',
    color: 'grey',
    fontSize: widthScreen * 0.028,
    padding: widthScreen * 0.02,
  },
  dateTimeMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: widthScreen * 0.05,
    marginRight: widthScreen * 0.05,
  },
  dateTimeInnerView: {
    alignItems: 'center',
    // backgroundColor: 'pink',
    paddingRight: widthScreen * 0.05,
    paddingLeft: widthScreen * 0.05,
    justifyContent: 'center',
  },
  virticalLineView: {
    height: widthScreen * 0.1,
    width: 1,
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  totalNightText: {
    backgroundColor: 'rgb(230,230,250)',
    position: 'absolute',
    top: widthScreen * 0.022,
    padding: widthScreen * 0.01,
    fontSize: widthScreen * 0.025,
    left: widthScreen * -0.025,
    zIndex: 5000,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  allOfView: {
    marginRight: widthScreen * 0.05,
    marginLeft: widthScreen * 0.05,
    paddingTop: widthScreen * 0.03,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  citiesTextView: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: widthScreen * 0.02,
    borderRadius: widthScreen * 0.25,
    marginTop: widthScreen * 0.02,
    marginRight: widthScreen * 0.02,
    marginLeft: widthScreen * 0.02,
  },
  popularCitiesView: {
    marginLeft: widthScreen * 0.05,
    marginTop: widthScreen * 0.035,
    marginBottom: widthScreen * 0.03,
  },
  popularCitiesText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.04,
  },
});
const mapStatesToProps = state => {
  return {
    searchCity: state.HomeReducer.currentCity,
    cities: state.HomeReducer.cities,
  };
};

export default connect(
  mapStatesToProps,
  null,
)(HotelsSearch);
