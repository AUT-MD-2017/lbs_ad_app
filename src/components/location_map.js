import React from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = {
  map: {
    height,
  },
};

export default class LocationMap extends React.Component {
  render() {
    const { props, props: { location } } = this;

    const region = {
      ...location.coords,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    return (
      <MapView
        showsUserLocation
        {...props}
        style={{
          ...styles.map,
          ...props.style,
        }}
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
}
