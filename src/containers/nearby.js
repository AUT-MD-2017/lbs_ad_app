import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView, TouchableHighlight, Text, View,
  RefreshControl, ActivityIndicator,
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

const ListFooter = styled(View)`
  height: 50;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: ${consts.WHITE};
`;

const LoadMoreIndicator = styled(ActivityIndicator)`
  margin-right: 8;
`;

const LoadMoreText = styled(Text)`
  color: ${consts.DARK_GREY};
`;

class NearbyScreen extends Component {
  static navigationOptions = {
    title: 'Nearby',
  }

  state = {
    loading: false,
    refreshing: false,
  }

  componentDidMount() {
    this.fetchLocations();
  }

  onListRefresh = () => {
    if (this.state.refreshing) return;

    this.setState({ refreshing: true });
    this.fetchLocations().then(() => {
      this.setState({ refreshing: false });
    });
  }

  onListLoadMore = () => {
    const { page, perPage } = this.props.locations;

    this.setState({ loading: true });
    this.fetchLocations({
      page: page + 1,
      perPage,
    }).then(() => {
      this.setState({ loading: false });
    });
  }

  onLocationItemPress = (location) => {
    const { navigation: { navigate } } = this.props;
    navigate('Location', { location });
  }

  fetchLocations = (query = {}) => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.props.actions.fetchLocations({
          ...pos,
          query,
        }).then(resolve);
      });
    });
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

  renderListRow = rowData => (
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

  renderListFooter = () => {
    const { total, page, perPage } = this.props.locations;

    if (page * perPage > total) return null;

    return this.state.loading ? (
      <ListFooter>
        <LoadMoreIndicator />
        <LoadMoreText>Loading</LoadMoreText>
      </ListFooter>
    ) : (
      <TouchableHighlight onPress={this.onListLoadMore}>
        <ListFooter>
          <LoadMoreText>Load More</LoadMoreText>
        </ListFooter>
      </TouchableHighlight>
    );
  }

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
          refreshControl={
            <RefreshControl
              title="Updating Locations"
              refreshing={this.state.refreshing}
              onRefresh={this.onListRefresh}
            />
          }
          dataSource={dataSource}
          renderRow={this.renderListRow}
          renderFooter={this.renderListFooter}
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
