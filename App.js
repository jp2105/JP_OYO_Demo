import React from 'react';
import {Provider} from 'react-redux';
import store from './SRC/Store/configStore';
import {SafeAreaView, StatusBar} from 'react-native';
import Route from './SRC/Navigation/route';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="rgb(238,46,36)" barStyle="light-content" />
      <Route />
    </Provider>
  );
};

export default App;
