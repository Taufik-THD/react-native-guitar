/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { fetchUserInfo } from './src/store/actions';
import Routes from './Routes';

class App extends Component {
  async componentDidMount() {
    await this.checkPermission();
    await this.checkAsyncStorage();
  }

  checkAsyncStorage = async () => {
    const { fetchUser } = this.props;
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        fetchUser(token);
      }
    } catch (error) {
      throw err
    }
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    if (p === 'authorized') return;
    this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
  };

  render() {
    return (
      <Routes />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: token => dispatch(fetchUserInfo(token)),
});

export default connect(null, mapDispatchToProps)(App);
