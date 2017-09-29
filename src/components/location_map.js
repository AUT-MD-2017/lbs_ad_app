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
  render() {
    const { props, props: { location } } = this;

    const region = {
      ...location.coords,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    const style = {
      ...styles.map,
      ...props.style,
    };

    if (location.coords) {
      return (
        <MapView
          showsUserLocation
          {...props}
          style={style}
          initialRegion={region}
        >
          <MapView.Marker
            title={location.name}
            description={`Address: ${location.address}`}
            coordinate={region}
          />
        </MapView>
      );
    }

    return (
      <Placeholder style={style}>
        <ActivityIndicator color={consts.WHITE} size="large" />
      </Placeholder>
    );
  }
}
