import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';


const IconView = styled.View`
  justify-content: center;
`;

export default class Ionicons extends React.Component {
  render() {
    const { props } = this;

    return (
      <IconView style={props.style}>
        <Icon
          name={props.name || 'ios-arrow-forward'}
          size={props.size || 18}
          color={props.color}
        />
      </IconView>
    );
  }
}
