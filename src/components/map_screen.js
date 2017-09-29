import React from 'react';

import LocationMap from '../components/location_map';

export default class MapScreen extends React.Component {
  render() {
    return (
      <LocationMap
        location={this.props.navigation.state.params.location}
      />
    );
  }
}
