import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import * as consts from '../constants';
import * as userActions from '../actions/user';


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    ...consts.NAVIGATION_OPTIONS,
  }

  render() {
    return (
      <Text>User Settings</Text>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);
