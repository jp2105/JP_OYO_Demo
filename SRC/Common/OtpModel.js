import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;
let otpTextInput = [];
let keyPress = null;
let dontCall = true;
let intervalTime = null;
const inputs = Array(4).fill(0);

export const OtpModel = props => {
  const [otpTimer, setotpTimer] = useState(30);
  const [otp, setotp] = useState([]);
  const _onKeyPress = (key, index) => {
    keyPress = key;
    if (
      key != 'Backspace' &&
      otp[index] &&
      otp[index].length > 0 &&
      index != 4
    ) {
      let temp = [...otp];
      temp[index + 1] = key;
      setotp(temp);
      props.me.forceUpdate();
      focusNext(index, key);
      dontCall = false;
    }
    if (key === 'Backspace' && index != 0) {
      focusPrevious(key, index);
      dontCall = false;
    }
  };

  const txt = inputs.map((i, j) => (
    <View>
      <TextInput
        style={{
          width: widthScreen * 0.13,
          fontSize: heightScreen * 0.04,
          alignSelf: 'center',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginLeft: widthScreen * 0.05,
          textAlign: 'center',
        }}
        maxLength={1}
        autoFocus={j == 0 ? true : false}
        keyboardType="numeric"
        onChangeText={v => _press(v, j)}
        returnKeyType="next"
        onKeyPress={e => _onKeyPress(e.nativeEvent.key, j)}
        ref={ref => {
          otpTextInput[j] = ref;
        }}
      />
    </View>
  ));

  const focusNext = (index, value) => {
    let temp = [...otp];
    setotp(temp);
    if (index < otpTextInput.length - 1 && value) {
      otpTextInput[index + 1].focus();
    }
    if (index === otpTextInput.length - 1) {
      // otpTextInput[index].blur();
      props.Close();
      props.me.props.navigation.navigate('Profile', {
        phone: props.states.phone,
      });
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) {
      otpTextInput[index - 1].focus();
    }
  };
  function timerChange() {
    intervalTime = setInterval(_setInterval, 1000);
  }
  function _setInterval() {
    if (otpTimer == 0) {
      clearInterval(intervalTime);
    }
    setotpTimer(otpTimer => otpTimer - 1);
  }
  const _press = (v, j) => {
    if (dontCall) {
      let temp = [...otp];
      temp[j] = v;

      if (temp[j].length === 1) {
        focusNext(j, v);
      }
      if (temp[j].length == 0) {
        focusPrevious(keyPress, j);
      }
    } else {
      dontCall = true;
    }
  };
  return (
    <Modal
      visible={props.states.openMOdel}
      transparent={true}
      animated={true}
      onShow={timerChange}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.mainView}>
          <View style={styles.modelMainView}>
            <View
              style={{
                flexDirection: 'row-reverse',
                padding: widthScreen * 0.06,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.Close();
                }}>
                <Icon name={'close'} size={widthScreen * 0.07} color={'red'} />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.textView}>
              <Text>Detecting OTP {otpTimer} s</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>We have sent a 4-digit OTP on </Text>
              <Text style={styles.text}>+91 {props.states.phone}</Text>
            </View>
            <View style={[styles.optTextView, styles.textView]}>{txt}</View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: widthScreen * 0.1,
    borderBottomColor: 'black',
    fontSize: widthScreen * 0.05,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginRight: widthScreen * 0.06,
  },
  optTextView: {flexDirection: 'row'},
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: widthScreen * 0.035,
  },
  textView: {alignItems: 'center', justifyContent: 'center'},
  modelMainView: {
    height: heightScreen * 0.4,
    width: widthScreen,
    backgroundColor: 'white',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column-reverse',
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
