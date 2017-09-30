import React from 'react';

import LocationMap from '../components/location_map';
import * as consts from '../constants';


export default class MapScreen extends React.Component {
  static navigationOptions = () => ({
    ...consts.NAVIGATION_OPTIONS,
  });

  render() {
    return (
      <LocationMap
        location={this.props.navigation.state.params.location}
      />
    );
  }
}
