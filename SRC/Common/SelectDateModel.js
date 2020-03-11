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
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Ionicons';
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;

export const SelectDateModel = props => {
  const scrollEle = useRef(null);
  const [belowBorder, setBelowBorder] = useState(0);
  const [isChildren, setisChildren] = useState(false);
  const [person, setPerson] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenMsg, setChildrenMsg] = useState(false);
  const [matressMsg, setmatressMsg] = useState(false);
  const [checkoutErrorToastAnim] = useState(new Animated.Value(0));
  const [hideChildView] = useState(new Animated.Value(0));
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
      Animated.timing(checkoutErrorToastAnim, {
        toValue: 1,
        duration: 1000,
      }).start(() => {
        Animated.timing(checkoutErrorToastAnim, {
          toValue: 0,
          duration: 1000,
        }).start();
      });
      // setTimeout(() => setErrorToast(false), 2000); // show toast after 2s
    }
  }

  function _addChildren() {
    debugger;
    setisChildren(!isChildren);
    setChildren(children ? 0 : 1);
    if (isChildren) {
      Animated.timing(hideChildView, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(hideChildView, {
        toValue: 1,
        duration: 500,
      }).start();
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
                  {Moment(props.states.checkIn).format('ddd, DD MMM')}
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
                  {Moment(props.states.checkOut).format('ddd, DD MMM')}
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
            <Animated.View
              style={[styles.toastView, {opacity: checkoutErrorToastAnim}]}>
              <Text style={{fontSize: widthScreen * 0.05}}>
                CheckOut date should be after CheckIn date
              </Text>
            </Animated.View>
            {/*///////////////////////////////////////*/}
            <ScrollView
              style={{backgroundColor: 'rgb(255,255,240)'}}
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
                      arrorType: 'checkIn',
                      date: props.states.checkIn,
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
                      arrorType: 'checkIn',
                      date: props.states.checkIn,
                    },
                    [props.states.checkOut]: {
                      selected: true,
                      selectedColor: 'red',
                      arrorType: 'checkOut',
                      date: props.states.checkOut,
                    },
                  }}
                />
              </View>

              <View style={{width: widthScreen}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ScrollView>
                    <View>
                      <View style={styles.roomMainView}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.personText}>Room 1</Text>
                          <View style={styles.guestView}>
                            <Text style={styles.personText}>
                              {person} Guest
                            </Text>
                            <Icon
                              name={'up'}
                              size={widthScreen * 0.05}
                              color={'red'}
                              style={{marginLeft: widthScreen * 0.04}}
                            />
                          </View>
                        </View>
                        <View style={styles.horizantalLine} />
                        <View style={styles.guestInnerView}>
                          <View>
                            <Text style={styles.personInnerText}>Adults</Text>
                            <Text style={styles.personInnerSmallText}>
                              (5+years)
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setPerson(1);
                              }}>
                              <View
                                style={[
                                  styles.numberOfPersonBox,
                                  {
                                    backgroundColor:
                                      person === 1 ? 'red' : 'white',
                                    borderBottomLeftRadius: widthScreen * 0.25,
                                    borderTopLeftRadius: widthScreen * 0.25,
                                  },
                                ]}>
                                <Text
                                  style={{
                                    color: person === 1 ? 'white' : 'black',
                                  }}>
                                  1
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setPerson(2);
                              }}>
                              <View
                                style={[
                                  styles.numberOfPersonBox,
                                  {
                                    backgroundColor:
                                      person === 2 ? 'red' : 'white',
                                  },
                                ]}>
                                <Text
                                  style={{
                                    color: person === 2 ? 'white' : 'black',
                                  }}>
                                  2
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setPerson(3);
                              }}>
                              <View
                                style={[
                                  styles.numberOfPersonBox,
                                  {
                                    backgroundColor:
                                      person === 3 ? 'red' : 'white',
                                    borderBottomRightRadius: widthScreen * 0.25,
                                    borderTopRightRadius: widthScreen * 0.25,
                                  },
                                ]}>
                                <Text
                                  style={{
                                    color: person === 3 ? 'white' : 'black',
                                  }}>
                                  3
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        </View>

                        <View style={styles.guestInnerView}>
                          <Text style={styles.personInnerText}>
                            Travelling with children? (0-5 years)
                          </Text>
                          <TouchableWithoutFeedback
                            onPress={() => {
                              _addChildren();
                            }}>
                            <Icon2
                              name={
                                isChildren
                                  ? 'check-box'
                                  : 'check-box-outline-blank'
                              }
                              color={isChildren ? 'red' : '#d3d3d3'}
                              size={widthScreen * 0.06}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                        <Animated.View
                          style={[
                            styles.guestInnerView1,
                            {backgroundColor: 'green'},
                            {
                              height: hideChildView.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, widthScreen * 0.1],
                                extrapolate: 'clamp',
                              }),
                            },
                          ]}>
                          <View
                            style={[
                              styles.childTextView,
                              {opacity: hideChildView ? 1 : 0},
                            ]}>
                            <Icon3
                              name={'face-outline'}
                              size={widthScreen * 0.05}
                              color={'grey'}
                            />
                            <Text style={styles.personInnerText}>Children</Text>
                            <Icon4
                              name={'ios-information-circle-outline'}
                              size={widthScreen * 0.05}
                              color={'red'}
                            />
                          </View>
                          <View
                            style={[
                              styles.addChildView,
                              {borderWidth: isChildren ? 1 : 0},
                            ]}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                children <= 1
                                  ? setChildrenMsg(true)
                                  : setChildren(children - 1);
                              }}>
                              <Icon
                                name={'minus'}
                                color={'red'}
                                size={widthScreen * 0.06}
                              />
                            </TouchableWithoutFeedback>
                            <Text>{children}</Text>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                person + children >= 4
                                  ? setmatressMsg(true)
                                  : setChildren(children + 1);
                              }}>
                              <Icon4
                                name={'ios-add'}
                                color={'red'}
                                size={widthScreen * 0.07}
                              />
                            </TouchableWithoutFeedback>
                          </View>
                        </Animated.View>
                        <View
                          style={[
                            styles.horizantalLine,
                            {marginTop: widthScreen * 0.01},
                          ]}
                        />
                        <View style={styles.addRoomView}>
                          <Text style={styles.addRoomText}>Add Room</Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
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
  roomMainView: {
    backgroundColor: 'white',
    // backgroundColor: 'gray',
    width: widthScreen * 0.9,
    marginTop: widthScreen * 0.02,
    padding: widthScreen * 0.04,
  },
  personText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.04,
  },
  guestView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizantalLine: {
    height: 1,
    width: widthScreen * 0.8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: widthScreen * 0.04,
  },
  guestInnerView: {
    marginTop: widthScreen * 0.04,
    marginBottom: widthScreen * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestInnerView1: {
    marginTop: widthScreen * 0.02,
    marginBottom: widthScreen * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 0,
  },
  personInnerText: {
    fontFamily: 'OpenSans-Light',
    fontSize: widthScreen * 0.04,
  },
  personInnerSmallText: {
    fontFamily: 'OpenSans-Light',
    fontSize: widthScreen * 0.03,
    color: 'grey',
  },
  numberOfPersonBox: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: widthScreen * 0.08,
    paddingRight: widthScreen * 0.08,
    borderColor: '#d3d3d3',
  },
  addRoomView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthScreen * 0.04,
  },
  addRoomText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.035,
    color: 'red',
  },
  childTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.3,
    alignItems: 'center',
  },
  addChildView: {
    flexDirection: 'row',
    width: widthScreen * 0.4,
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
    paddingLeft: widthScreen * 0.04,
    paddingRight: widthScreen * 0.04,
    borderColor: '#d3d3d3',
    borderRadius: widthScreen * 0.2,
  },
});
