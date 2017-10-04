import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { AnonymousContainer } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
  }

  render() {
    return (
      <AnonymousContainer>
        <Text>Login</Text>
      </AnonymousContainer>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
