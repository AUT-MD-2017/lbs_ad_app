import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView, TouchableHighlight, RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import { LocationPrimaryInfo } from '../components';
import { Container, LocationItem } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';
import * as locationsActions from '../actions/locations';


const HighlightLocationItem = LocationItem.extend`
  background-color: ${consts.LIGHT_YELLOW};
`;

const ListFooter = styled.View`
  height: 50;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: ${consts.WHITE};
`;

const LoadMoreIndicator = styled.ActivityIndicator`
  margin-right: 8;
`;

const LoadMoreText = styled.Text`
  color: ${consts.DARK_GREY};
`;

class NearbyScreen extends React.Component {
  static navigationOptions = {
    title: 'Nearby',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map-marker" size={24} color={tintColor} />
    ),
  }

  state = {
    loading: false,
    refreshing: false,
  }

  componentDidMount() {
    this.fetchLocations();
    // TODO: should be called immediatly after logging in.
    this.props.actions.fetchCurrentUser();
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

  renderListRow = (rowData) => {
    const Item = rowData.discount ? HighlightLocationItem : LocationItem;

    return (
      <TouchableHighlight
        onPress={() => this.onLocationItemPress(rowData)}
      >
        <Item>
          <LocationPrimaryInfo showDiscount location={rowData} />
        </Item>
      </TouchableHighlight>
    );
  }

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

const mapStateToProps = ({ locations }) => ({
  locations,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
    ...locationsActions,
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearbyScreen);
