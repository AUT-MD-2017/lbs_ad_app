import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView, TouchableHighlight, Text, View,
  RefreshControl, ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

import * as consts from '../constants';
import { Container } from '../components/misc';
import LocationPrimaryInfo from '../components/location_primary_info';
import * as locationsActions from '../actions/locations';


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

class NearbyScreen extends React.Component {
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

  renderListRow = rowData => (
    <TouchableHighlight
      onPress={() => this.onLocationItemPress(rowData)}
    >
      <LocationPrimaryInfo location={rowData} />
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
