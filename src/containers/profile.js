import React, { Component } from 'react';
import { Button } from 'react-native';


class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
    const { goBack } = this.props.navigation;

    return (
      <Button
        title="Go back"
        onPress={() => goBack()}
      />
    );
  }
}

export default ProfileScreen;
