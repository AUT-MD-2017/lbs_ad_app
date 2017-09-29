import React from 'react';
import styled from 'styled-components/native';

import * as consts from '../constants';
import Ionicons from '../components/ionicons';


const Item = styled.View`
  padding-vertical: 10;
  padding-horizontal: 10;
  border-bottom-color: ${consts.LIGHTER_GREY};
  border-bottom-width: 1;
  flex-direction: row;
`;

const ListItem = (props) => {
  return (
    <Item>
      {props.children}
      <Ionicons />
    </Item>
  );
};

export default ListItem;
