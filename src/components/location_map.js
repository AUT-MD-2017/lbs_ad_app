import _ from 'lodash';
import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

import * as consts from '../constants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = {
  map: {
    height,
  },
};

const Placeholder = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${consts.LIGHT_BLUE};
`;

export default class LocationMap extends React.Component {
  renderMarkers = locations => locations.map(location => (
    <MapView.Marker
      key={location.id}
      title={location.name}
      description={`Address: ${location.address}`}
      pinColor={consts.RED}
      coordinate={location.coords}
    />
  ))

  render() {
    const { props } = this;

    const location = props.location || _.first(props.locations);

    const region = {
      ...location.coords,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    const style = {
      ...styles.map,
      ...props.style,
    };

    return location.coords ? (
      <MapView
        showsUserLocation
        {...props}
        style={style}
        initialRegion={region}
      >
        {this.renderMarkers(props.locations || [location])}
      </MapView>
    ) : (
      <Placeholder style={style}>
        <ActivityIndicator color={consts.WHITE} size="large" />
      </Placeholder>
    );
  }
}
