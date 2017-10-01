import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView, TouchableHighlight, TouchableWithoutFeedback, Text,
} from 'react-native';
import {
  TabViewAnimated, TabBar, SceneMap,
} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import {
  Ionicons, LocationPrimaryInfo, LocationMap,
} from '../components';
import {
  Container, Card, LocationItem,
} from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


const styles = {
  tabView: {
    flex: 1,
  },

  tabBar: {
    style: {
      backgroundColor: consts.DARK_WHITE,
    },
    labelStyle: {
      color: consts.BLACK,
    },
    tabStyle: {
      padding: 0,
      height: 30,
    },
    indicatorStyle: {
      backgroundColor: consts.LIGHT_BLUE,
    },
  },
};

const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

export const StyledCard = Card.extend`
  flex-direction: row;
  align-items: center;
  padding-vertical: 20;
  padding-horizontal: 12;
  border-bottom-width: 0;
`;

const UserName = styled.Text`
  color: ${consts.DARK_GREY};
`;

const BookmarkTitle = styled.Text`
  font-size: 16;
  color: ${consts.DARK_GREY};
  margin-top: 15;
  margin-left: 12;
  margin-bottom: 5;
`;

const SettingsButton = (props) => {
  const StyledView = styled.View`
    padding-horizontal: 12;
    align-items: center;
    justify-content: center;
  `;

  return (
    <TouchableWithoutFeedback {...props}>
      <StyledView>
        <Ionicons
          name="md-settings"
          size={20}
          color={consts.DARK_GREY}
        />
      </StyledView>
    </TouchableWithoutFeedback>
  );
};

const EmptyPlaceholder = (props) => {
  const StyledView = styled.View`
    align-items: center;
    justify-content: center;
    background-color: ${consts.WHITE};
    flex: 1;
  `;

  const StyledText = styled.Text`
    color: ${consts.RED};
  `;

  return (
    <StyledView>
      <StyledText>
        {props.children || 'There are no bookmark collections.'}
      </StyledText>
    </StyledView>
  );
};

class MyAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'My Account',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={24} color={tintColor} />
    ),
  }

  state = {
    index: 0,
    routes: [
      { key: 'list', title: 'LIST' },
      { key: 'map', title: 'MAP' },
    ],
  }

  componentWillReceiveProps(nextProps) {
    const { actions, user, nav } = this.props;

    if (nav.routeName !== nextProps.nav.routeName) {
      actions.fetchBookmarks(user);
    }
  }

  onTabIndexChange = index => this.setState({ index })

  onLocationItemPress = (location) => {
    const { navigation: { navigate } } = this.props;
    navigate('Location', { location });
  }

  onSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  }

  renderListRoute = () => {
    const { bookmarks } = this.props.user;

    if (_.isEmpty(bookmarks)) {
      return (
        <EmptyPlaceholder />
      );
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });
    const dataSource = ds.cloneWithRows(bookmarks);

    const renderListRow = rowData => (
      <TouchableHighlight
        onPress={() => this.onLocationItemPress(rowData)}
      >
        <LocationItem>
          <LocationPrimaryInfo showDiscount location={rowData} />
        </LocationItem>
      </TouchableHighlight>
    );

    return (
      <ListView
        enableEmptySections
        dataSource={dataSource}
        renderRow={renderListRow}
      />
    );
  }

  renderMapRoute = () => {
    const { bookmarks } = this.props.user;

    return _.isEmpty(bookmarks) ?
      <EmptyPlaceholder /> : <LocationMap locations={bookmarks} />;
  }

  render() {
    const { user } = this.props;

    const tabProps = {
      renderScene: SceneMap({
        list: this.renderListRoute,
        map: this.renderMapRoute,
      }),

      renderHeader: props => (
        <TabBar {...styles.tabBar} {...props} />
      ),
    };

    return (
      <StyledContainer>
        <StyledCard>
          <UserName>{user.email}</UserName>
          <TouchableWithoutFeedback>
            <SettingsButton onPress={this.onSettingsPress} />
          </TouchableWithoutFeedback>
        </StyledCard>

        <BookmarkTitle>BOOKMARKS</BookmarkTitle>

        <TabViewAnimated
          style={styles.tabView}
          navigationState={this.state}
          {...tabProps}
          onIndexChange={this.onTabIndexChange}
        />
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({ nav, user }) => ({
  nav,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAccountScreen);
