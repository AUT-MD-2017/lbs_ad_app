import React, { Component } from 'react';
import { Text } from 'react-native';

import { Container } from '../components/misc';


class LocaitonScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.location.name,
  });

  render() {
    const { location } = this.props.navigation.state.params;

    return (
      <Container>
        <Text>{location.name}</Text>
      </Container>
    );
  }
}

export default LocaitonScreen;
