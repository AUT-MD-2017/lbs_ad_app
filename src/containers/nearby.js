import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView, TouchableHighlight, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import * as consts from '../constants';
import { Container } from '../components/misc';
import * as locationsActions from '../actions/locations';


const Item = styled(View)`
  background-color: ${consts.WHITE};
  align-items: center;
  flex-direction: row;
  height: 60;
  paddingHorizontal: 24;
  border-bottom-color: ${consts.LIGHTER_GREY};
  border-bottom-width: 1;
`;

const LeftView = styled(View)`
  flex: 1;
  flex-direction: column;
`;

const RightView = styled(View)`
  align-items: center;
  flex-direction: row;
`;

const LocationName = styled(Text)`
  font-size: 16;
  color: ${consts.BLACK};
  margin-bottom: 5;
`;

const Category = styled(Text)`
  color: ${consts.GREY};
`;

const Distance = styled(Text)`
  font-size: 13;
  color: ${consts.GREY};
  width: 40;
  text-align: right;
  margin-left: 5;
`;

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

  renderPriceIcons = (priceLevel) => {
    let achived = false;
    return ['l', 'n', 'h'].map((level) => {
      const color = achived ? consts.LIGHT_GREY : consts.DARK_GREY;
      if (priceLevel === level) {
        achived = true;
      }
      return <Icon key={level} name="dollar" size={11} color={color} />;
    });
  }

  renderRow = rowData => (
    <TouchableHighlight
      onPress={() => this.onLocationItemPress(rowData)}
    >
      <Item>
        <LeftView>
          <LocationName>{rowData.name}</LocationName>
          <Category>{rowData.category}</Category>
        </LeftView>
        <RightView>
          {this.renderPriceIcons(rowData.priceLevel)}
          <Distance>{rowData.distance}</Distance>
        </RightView>
      </Item>
    </TouchableHighlight>
  );

  render() {
    const { locations: { items } } = this.props;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });
    const dataSource = ds.cloneWithRows(items);

    return (
      <Container>
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
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
