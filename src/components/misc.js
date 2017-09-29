import { Container as BaseContainer } from 'native-base';
import styled from 'styled-components/native';

import * as consts from '../constants';


export const Container = styled(BaseContainer)`
  background-color: ${consts.WHITE};
`;

export const SmallText = styled.Text`
  font-size: 12;
`;

export const Card = styled.View`
  background-color: ${consts.WHITE};
  border-bottom-color: ${consts.LIGHTER_GREY};
  border-bottom-width: 1;
  margin-bottom: 15;
  padding-vertical: 10;
  padding-horizontal: 10;
`;
