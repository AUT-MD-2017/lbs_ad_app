import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';


const Container = styled.View`
  padding-horizontal: 10;
`;

export default class HeaderButton extends React.Component {
  render() {
    const { props } = this;

    return (
      <TouchableWithoutFeedback {...props}>
        <Container>
          {props.children}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
