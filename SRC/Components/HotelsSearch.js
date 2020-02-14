import React from 'react';
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
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width;
class HotelsSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      searchCity: '',
    };
  }
  componentDidMount(): void {
    this.setState({
      searchCity: this.props.searchCity,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainView}>
          <View style={styles.headerMainView}>
            <View
                style={styles.searchTextView}>
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
            </View>
          </View>
          <Text>test</Text>
          <Text>{this.state.searchCity && this.state.searchCity}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  headerMainView: {
    backgroundColor: 'rgb(238,46,36)',
    height: widthScreen * 0.17,
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
  searchTextInput: {
    height: widthScreen * 0.1,
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
});
const mapStatesToProps = state => {
  return {
    searchCity: state.HomeReducer.currentCity,
  };
};

export default connect(
  mapStatesToProps,
  null,
)(HotelsSearch);
