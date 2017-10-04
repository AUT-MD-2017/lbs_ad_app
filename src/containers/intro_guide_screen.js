import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import { AnonymousContainer } from '../components/misc';
import * as userActions from '../actions/user';


class IntroGuideScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
    // this.props.navigation.navigate('LoggedIn');
  }

  render() {
    return (
      <AnonymousContainer>
        <Text>Intro Guide</Text>
      </AnonymousContainer>
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
)(IntroGuideScreen);
