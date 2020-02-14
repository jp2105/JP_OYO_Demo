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
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AlphabetFlatList from 'react-native-alphabetflatlist';
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;

export const CountryCode = props => {
  let countryCOdeArray =
    props.myProps.countryCode &&
    props.myProps.countryCode.data.map(
      item => item.name + ' (+' + item.callingCodes + ')',
    );
  // console.log(countryCOdeArray);
  return (
    <Modal
      visible={props.states.isCountryCodeModel}
      transparent={true}
      animated={true}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.mainView}>
          <View style={styles.mainHeader}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.Close();
              }}>
              <Icon
                name={'close'}
                size={widthScreen * 0.1}
                style={{position: 'absolute', left: widthScreen * 0.05}}
                color={'red'}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.headingText}>Select a country / Region</Text>
          </View>
          <View
            style={{height: 1, width: widthScreen, backgroundColor: 'grey',opacity:0.5}}
          />
          <View style={{flex: 1}}>
            <AlphabetFlatList
              getItemLayout={(data, index) => ({
                length: (widthScreen*0.12)+20,
                offset: (widthScreen*0.12)* index+20,
                index,
              })}
              renderItem={({item, index}) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    let data = item.substring(
                      item.indexOf('(') + 1,
                      item.indexOf(')'),
                    );
                    props._setCountryCode(data);
                    props.Close();
                  }}>
                  <View style={styles.countryView}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.countryText}>{item}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              showsVerticalScrollIndicator={false}
              data={countryCOdeArray}
              alphabetListProps={{
                selectedAlphabetTextStyle: {
                  fontSize: widthScreen * 0.035,
                  color: 'black',
                },
                alphabetTextStyle: {fontSize: widthScreen * 0.035,
                color: 'grey'},
                alphabetListContainerStyle: {
                  flex: 0.1,
                },
                showsVerticalScrollIndicator: false,
              }}
            />
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainHeader: {
    height: widthScreen * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthScreen,
  },
  headingText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: widthScreen * 0.045,
  },
  countryText: {
    fontFamily: 'OpenSans-Light',
    fontSize: widthScreen * 0.04,
  },
  countryView: {
    flexDirection: 'row',
    // marginTop: widthScreen * 0.08,
    marginLeft: widthScreen * 0.05,
    height: widthScreen*0.12,
    alignItems: 'center'

  },
});
