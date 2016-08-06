/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

var Login = React.createClass({
  render: function() {
    return (
      <View>
      <LoginButton
      publishPermissions={["publish_actions"]}
      onLoginFinished={
        (error, result) => {
          if (error) {
            alert("login has error: " + result.error);
          } else if (result.isCancelled) {
            alert("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                this.props.loginCallback();
              }
            )
          }
        }
      }
      onLogoutFinished={() => {
        this.props.logoutCallback();
        alert("Logout.");
      }}/>
      </View>
    );
  }
});

class BermudaSpace extends Component {
  constructor() {
    super();
    this.state = {
      fbName: null,
    };
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.logoutCallback = this.logoutCallback.bind(this);
    this.requestForFacebookMe();
  }

  _responseInfoCallback = (error: ?Object, result: ?Object) => {
    if (error) {
      // alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result);
      alert('Hello, ' + result.name);
      this.setState({fbName: result.name});
    }
  }

  requestForFacebookMe = () => {
    const infoRequest = new GraphRequest(
      '/me',
      null,
      this._responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  logoutCallback = () => {
    this.setState({fbName: ''});
  }

  render() {
    // this.requestForFacebookMe();
    const fbDiv = (this.state.fbName) ? `Hello, ${this.state.fbName}` : "Welcome to React Native!";
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
        {fbDiv}
      </Text>
      <Text style={styles.instructions}>
      To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
      </Text>
      <Login
        loginCallback={this.requestForFacebookMe}
        logoutCallback={this.logoutCallback}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BermudaSpace', () => BermudaSpace);
