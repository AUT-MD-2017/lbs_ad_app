import styled from 'styled-components/native';

import * as consts from '../constants';


export const Container = styled.View`
  flex: 1;
  background-color: ${consts.WHITE};
`;

export const DarkWhiteContainer = Container.extend`
  background-color: ${consts.DARK_WHITE};
`;

export const AnonymousContainer = Container.extend`
  margin-top: ${consts.STATUSBAR_HEIGHT};
`;

export const SmallText = styled.Text.attrs({
  adjustsFontSizeToFit: true,
})`
  font-size: 12;
`;

export const Card = styled.View`
  background-color: ${consts.WHITE};
  border-top-color: ${consts.LIGHTER_GREY};
  border-top-width: 1;
  border-bottom-color: ${consts.LIGHTER_GREY};
  border-bottom-width: 1;
  margin-bottom: 15;
  padding-vertical: 10;
  padding-horizontal: 10;
`;

export const SimpleCard = Card.extend`
  padding-vertical: 0;
  padding-horizontal: 0;
  border-bottom-width: 0;
`;

export const LocationItem = styled.View`
  background-color: ${consts.WHITE};
  border-bottom-color: ${consts.LIGHTER_GREY};
  border-bottom-width: 1;
  padding-horizontal: 20;
`;
