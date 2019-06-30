import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import {  getPermission } from './constants/NotificationCards'

class App extends React.Component {

  componentDidMount() {
    getPermission()
  }

  render() {
    return (
      <Provider store={createStore(reducers)} >
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
