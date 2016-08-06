import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

class GivingForm extends Component {
  constructor() {
    super();
    this.state = {text: ''};
    this.submitEvent = this.submitEvent.bind(this);
  }

  submitEvent = (evt) => {
    const itemName = evt.nativeEvent.text;
    console.log(itemName);
    fetch('https://ct-parse-server.herokuapp.com/parse/classes/Item', {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': 'parse-server',
        'X-Parse-Master-Key': 'bermudaSpace',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: itemName,
      })
    }).then((response) => response.json())
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return <View>
      <Text>ของเหลือ?: </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 100}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        onSubmitEditing={this.submitEvent}
      />
    </View>;
  }
}

export default GivingForm;
