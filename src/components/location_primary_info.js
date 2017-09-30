import React from 'react';
import styled from 'styled-components/native';

import PriceLevel from './price_level';
import * as consts from '../constants';


const Item = styled.View`
  background-color: ${consts.WHITE};
  align-items: center;
  flex-direction: row;
  height: 60;
`;

const HighlightItem = Item.extend`
  background-color: ${consts.LIGHT_YELLOW};
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
  margin-bottom: 5;
`;

const Category = styled.Text`
  font-size: 12;
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
    const {
      name, category, discount, priceLevel, distance,
    } = this.props.location;
    const showDiscount = this.props.showDiscount && discount;
    const ItemContainer = showDiscount ? HighlightItem : Item;

    return (
      <ItemContainer>
        <LeftView>
          <LocationName>{name}</LocationName>
          {showDiscount && discount ?
            <Category>{category} | Coupon for {discount}% OFF</Category> :
            <Category>{category}</Category>
          }
        </LeftView>
        <RightView>
          <PriceLevel level={priceLevel} />
          <Distance>{distance}</Distance>
        </RightView>
      </ItemContainer>
    );
  }
}
