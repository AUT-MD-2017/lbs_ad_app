import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AsyncStorage, Text } from 'react-native';

import { AnonymousContainer } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


class IntroGuideScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
    const { actions, navigation } = this.props;

    AsyncStorage.getItem(consts.STORAGE_KEY.USER_TOKEN).then((token) => {
      if (token) {
        actions.setUserToken(token);
        navigation.navigate('LoggedIn');
      }
    });
  }

  render() {
    return (
      <AnonymousContainer>
        <Text>Intro Guide</Text>
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
)(IntroGuideScreen);
