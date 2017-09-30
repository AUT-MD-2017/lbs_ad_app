import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import { Ionicons } from '../components';
import { Container, Card } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

export const StyledCard = Card.extend`
  flex-direction: row;
  align-items: center;
  padding-vertical: 20;
  padding-horizontal: 15;
  border-bottom-width: 0;
`;

const SettingsButton = styled.View`
  align-items: center;
  padding-horizontal: 12;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.Text`
  color: ${consts.DARK_GREY};
`;

class MyAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'My Account',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={24} color={tintColor} />
    ),
  }

  componentDidMount() {
    this.props.actions.fetchCurrentUser();
  }

  render() {
    const { user } = this.props;

    return (
      <StyledContainer>
        <StyledCard>
          <UserName>{user.email}</UserName>
          <TouchableWithoutFeedback>
            <SettingsButton>
              <Ionicons name="md-settings" size={20} color={consts.DARK_GREY} />
            </SettingsButton>
          </TouchableWithoutFeedback>
        </StyledCard>
      </StyledContainer>
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
)(MyAccountScreen);
