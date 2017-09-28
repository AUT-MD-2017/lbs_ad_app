import React from 'react';
import styled from 'styled-components/native';

import * as consts from '../constants';
import PriceLevel from '../components/price_level';


const Item = styled.View`
  background-color: ${consts.WHITE};
  align-items: center;
  flex-direction: row;
  height: 60;
`;

const LeftView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const RightView = styled.View`
  align-items: center;
  flex-direction: row;
`;

const LocationName = styled.Text`
  font-size: 16;
  color: ${consts.BLACK};
  margin-bottom: 5;
`;

const Category = styled.Text`
  color: ${consts.GREY};
`;

const Distance = styled.Text`
  font-size: 13;
  color: ${consts.GREY};
  width: 40;
  text-align: right;
  margin-left: 5;
`;

export default class LocationPrimaryInfo extends React.Component {
  render() {
    const { name, category, priceLevel, distance } = this.props.location;

    return (
      <Item>
        <LeftView>
          <LocationName>{name}</LocationName>
          <Category>{category}</Category>
        </LeftView>
        <RightView>
          <PriceLevel level={priceLevel} />
          <Distance>{distance}</Distance>
        </RightView>
      </Item>
    );
  }
}
