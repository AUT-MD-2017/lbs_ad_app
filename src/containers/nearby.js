import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, Text } from 'native-base';

import { Container } from '../components/misc';
import * as locationsActions from '../actions/locations';


class NearbyScreen extends Component {
  static navigationOptions = {
    title: 'Nearby',
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

  onLocationItemPress(location) {
    const { navigation: { navigate } } = this.props;
    navigate('Location', { location });
  }

  render() {
    const { locations: { items } } = this.props;

    return (
      <Container>
        <List>
          {items.map(item => (
            <ListItem
              key={item.id}
              onPress={() => {
                this.onLocationItemPress(item);
              }}
            >
              <Text>{item.name}</Text>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = ({ locations }) => {
  return { locations };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(locationsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearbyScreen);
