import React, {useRef, useState} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Moment from 'moment';
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
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;

export const SelectDateModel = props => {
  const scrollEle = useRef(null);
  const [belowBorder, setBelowBorder] = useState(0);
  const [errorToast, setErrorToast] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 60);
  const minDateCheckOut = new Date(props.states.checkIn);
  const maxDateCheckOut = new Date();
  maxDateCheckOut.setDate(minDateCheckOut.getDate() + 60);

  function _scrolling(index) {
    setBelowBorder(index);
    if (scrollEle) {
      scrollEle.current.scrollTo({
        x: widthScreen * index,
        y: 0,
        animated: true,
      });
    }
  }
  function _apply() {
    if (props.states.checkIn !== props.states.checkOut) {
      props.Close();
    } else {
      // setErrorToast(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
        }).start();
      });
      // setTimeout(() => setErrorToast(false), 2000); // show toast after 2s
    }
  }

  return (
    <Modal
      visible={props.states.openMOdel}
      transparent={true}
      animated={true}
      onShow={() => {
        if (props.states.openMOdel) {
          _scrolling(props.states.index);
        }
      }}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.mainView}>
          <View style={styles.hearderMAin}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.Close();
              }}>
              <Icon
                style={styles.closeIcon}
                name={'close'}
                size={widthScreen * 0.07}
                color={'grey'}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.headerText}>Select Check-In Date</Text>
          </View>
          <View style={styles.dateHeaderView}>
            <TouchableWithoutFeedback
              onPress={() => {
                _scrolling(0);
              }}>
              <View
                style={[
                  styles.dateInnerView,
                  {borderBottomWidth: belowBorder == 0 ? 2 : 0},
                ]}>
                <Text style={styles.dateSmallText}>CHECK IN</Text>
                <Text
                  style={[
                    styles.dateBigText,
                    {color: belowBorder == 0 ? 'red' : 'grey'},
                  ]}>
                  {Moment(props.states.checkIn).format('ddd,DD MMM')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => _scrolling(1)}>
              <View
                style={[
                  styles.dateInnerView,
                  {borderBottomWidth: belowBorder == 1 ? 2 : 0},
                ]}>
                <Text style={styles.dateSmallText}>CHECK OUT</Text>
                <Text
                  style={[
                    styles.dateBigText,
                    {color: belowBorder == 1 ? 'red' : 'grey'},
                  ]}>
                  {Moment(props.states.checkOut).format('ddd,DD MMM')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => _scrolling(2)}>
              <View
                style={[
                  styles.dateInnerView,
                  {borderBottomWidth: belowBorder == 2 ? 2 : 0},
                ]}>
                <Text style={styles.dateSmallText}>ROOM</Text>
                <View style={styles.userIconView}>
                  <Icon1
                    name={'user-o'}
                    size={widthScreen * 0.04}
                    color={belowBorder == 2 ? 'red' : 'grey'}
                  />
                  <Text
                    style={[
                      styles.dateBigText,
                      {color: belowBorder == 2 ? 'red' : 'grey'},
                    ]}>
                    date
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{flex: 1, marginTop: widthScreen * 0.02}}>
            {/*////////////////////////////////////////*/}
            <Animated.View style={[styles.toastView, {opacity: fadeAnim}]}>
              <Text style={{fontSize: widthScreen * 0.05}}>
                CheckOut date should be after CheckIn date
              </Text>
            </Animated.View>
            {/*///////////////////////////////////////*/}
            <ScrollView
              ref={scrollEle}
              horizontal={true}
              bounces={false}
              pagingEnabled={true}>
              <View style={{width: widthScreen}}>
                <CalendarList
                  onDayPress={day => {
                    props._setStates('checkIn', day.dateString);
                    props._setStates('checkOut', day.dateString);
                    _scrolling(1);
                  }}
                  calendarType={'checkIn'}
                  pastScrollRange={50}
                  futureScrollRange={50}

                  scrollEnabled={true}
                  showScrollIndicator={false}
                  minDate={Moment(new Date(minDate)).format('YYYY-MM-DD')}
                  maxDate={Moment(new Date(maxDate)).format('YYYY-MM-DD')}
                  monthFormat={'MMMM yyyy'}
                  hideExtraDays={true}
                  disableMonthChange={true}
                  markedDates={{
                    [props.states.checkIn]: {
                      selected: true,
                      selectedColor: 'red',
                    },
                  }}
                />
              </View>
              <View style={{width: widthScreen}}>
                <CalendarList
                  onDayPress={day => {
                    props._setStates('checkOut', day.dateString);
                    _scrolling(2);
                  }}
                  pastScrollRange={50}
                  futureScrollRange={50}
                  scrollEnabled={true}
                  showScrollIndicator={false}
                  minDate={Moment(new Date(minDateCheckOut)).format(
                    'YYYY-MM-DD',
                  )}
                  maxDate={Moment(new Date(maxDateCheckOut)).format(
                    'YYYY-MM-DD',
                  )}
                  monthFormat={'MMMM yyyy'}
                  hideExtraDays={true}
                  disableMonthChange={true}
                  calendarType={'checkOut'}
                  markedDates={{
                    [props.states.checkIn]: {
                      selected: true,
                      selectedColor: 'red',
                    },
                    [props.states.checkOut]: {
                      selected: true,
                      selectedColor: 'red',
                    },
                  }}
                />
              </View>
              <View
                style={{
                  width: widthScreen,
                  height: 100,
                  backgroundColor: 'yellow',
                }}
              />
            </ScrollView>
            <View style={styles.applyMainView}>
              <TouchableOpacity onPress={() => _apply()}>
                <View style={styles.applyInnerView}>
                  <Text style={styles.applyText}>APPLY</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(238,46,36,0.5)',
  },
  hearderMAin: {
    marginTop: widthScreen * 0.05,
    marginRight: widthScreen * 0.05,
    marginLeft: widthScreen * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {position: 'absolute', left: 0},
  headerText: {fontSize: widthScreen * 0.04, fontFamily: 'OPenSans-SemiBold'},
  dateHeaderView: {
    marginTop: widthScreen * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInnerView: {
    // backgroundColor: 'pink',
    justifyContent: 'space-evenly',
    width: widthScreen * 0.33,
    alignItems: 'center',
    // borderBottomWidth:1,
    borderBottomColor: 'red',
  },
  dateSmallText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: widthScreen * 0.03,
    color: 'grey',
  },
  dateBigText: {
    color: 'red',
    fontSize: widthScreen * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  userIconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyMainView: {
    height: heightScreen * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyInnerView: {
    backgroundColor: 'rgb(26,182,79)',
    width: widthScreen * 0.9,
    height: heightScreen * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  applyText: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.04,
  },
  toastView: {
    width: widthScreen * 0.8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 4000,
    left: widthScreen * 0.1,
    padding: widthScreen * 0.04,
    borderRadius: widthScreen * 20,
  },
});
