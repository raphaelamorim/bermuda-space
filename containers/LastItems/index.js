import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class LastItems extends Component {
  constructor() {
    super();
    this.state = {availableItems: []};
  }

  componentDidMount() {
    this._onPressButton();
  }

  _onPressButton = () => {
    const url = new URL("https://ct-parse-server.herokuapp.com/parse/classes/Item");
    const params = {limit:3, order:'-createdAt'};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url.href);
    fetch(url.href, {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': 'parse-server',
        'X-Parse-Master-Key': 'bermudaSpace',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((res) => {
      this.setState({
        availableItems: res.results,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const availableItems = this.state.availableItems.length > 0 ?
      this.state.availableItems.map((item, i) => {
        return <View key={i}><Text>{item.name}</Text></View>;
      })
    : null;
    return <View style={{marginTop: 50}}>
      <TouchableOpacity onPress={this._onPressButton}>
        <Text style={{fontSize: 30}}>Reload</Text>
      </TouchableOpacity>
      <Text>---- สินค้าให้ ----</Text>
      {availableItems}
    </View>;
  }
}

export default LastItems;
