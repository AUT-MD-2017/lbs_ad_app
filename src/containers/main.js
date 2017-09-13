import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, List, ListItem, Text } from 'native-base';
import styled from 'styled-components/native';

import * as locationsActions from '../actions/locations';


const StyledContainer = styled(Container)`
  background-color: white;
`;

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.onLocationItemPress = this.onLocationItemPress.bind(this);
  }

  componentDidMount() {
    // TODO: https://facebook.github.io/react-native/docs/geolocation.html
    const pos = {
      coords: {
        latitude: -36.92507,
        longitude: 174.73578,
      },
    };

    this.props.actions.fetchLocations(pos);
  }

  onLocationItemPress() {
  }

  render() {
    const { items } = this.props.locations;

    return (
      <StyledContainer>
        <List>
          {items.map(item => (
            <ListItem key={item.id} onPress={this.onLocationItemPress}>
              <Text>{item.name}</Text>
            </ListItem>
          ))}
        </List>
      </StyledContainer>
    );
  }
}

MainScreen.navigationOptions = {
  title: 'Nearby',
};

const mapStateToProps = ({ locations }) => {
  return { locations };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(locationsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreen);
