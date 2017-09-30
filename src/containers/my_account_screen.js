import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import * as consts from '../constants';


const StyledText = styled.Text`
  color: ${consts.RED};
`;

class MyAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'My Account',

    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="user"
        size={24}
        color={tintColor}
      />
    ),
  }

  render() {
    return (
      <StyledText>My Account</StyledText>
    );
  }
}

export default MyAccountScreen;
