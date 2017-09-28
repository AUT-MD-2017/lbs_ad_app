import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import * as consts from '../constants';


const Container = styled(View)`
  align-items: center;
  flex-direction: row;
`;

class PriceLevel extends Component {
  renderPriceIcons = () => {
    let achived = false;

    return ['l', 'n', 'h'].map((level) => {
      const color = achived ? consts.LIGHT_GREY : consts.DARK_GREY;
      if (level === this.props.level) {
        achived = true;
      }
      return <Icon key={level} name="dollar" size={11} color={color} />;
    });
  }

  render() {
    return (
      <Container>{this.renderPriceIcons()}</Container>
    );
  }
}

export default PriceLevel;
