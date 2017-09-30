import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import * as consts from '../constants';
import * as navigationActions from '../actions/navigation';


const Container = styled.View`
  height: 55;
  background-color: ${consts.WHITE};
  flex-direction: row;
  border-top-color: ${consts.LIGHT_BLUE};
  border-top-width: 2;
`;

const TouchableArea = styled.TouchableHighlight`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Item = styled.View`
  align-items: center;
  background-color: ${consts.WHITE};
`;

const Label = styled.Text`
  font-size: 10;
  margin-top: 3;
  height: 12;
  font-weight: bold;
  color: ${consts.DARK_GREY};
`;

const HighlightLabel = Label.extend`
  color: ${consts.LIGHT_BLUE};
`;

class NavigationTab extends React.Component {
  onChangeTab = () => {
  }

  render() {
    return (
      <Container>
        <TouchableArea onPress={() => {
          this.onChangeTab('nearby');
        }}
        >
          <Item>
            <Icon
              name="map-marker"
              size={24}
              color={consts.LIGHT_BLUE}
            />
            <HighlightLabel>
              Nearby
            </HighlightLabel>
          </Item>
        </TouchableArea>
        <TouchableArea onPress={() => {
          this.onChangeTab('my_account');
        }}
        >
          <Item>
            <Icon
              name="user"
              size={24}
              color={consts.DARK_GREY}
            />
            <Label>
              My Account
            </Label>
          </Item>
        </TouchableArea>
      </Container>
    );
  }
}

const mapStateToProps = ({ navigation }) => {
  return { navigation };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(navigationActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationTab);
