import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, Switch } from 'react-native';
import styled from 'styled-components/native';

import { DarkWhiteContainer } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


const Title = styled.Text`
  color: ${consts.DARK_GREY};
  marginTop: 30;
  marginBottom: 10;
  marginLeft: 10;
`;

const Card = styled.View`
  background-color: ${consts.WHITE};
  display: flex;
`;

const mixinStyles = `
  height: 45;
  padding-horizontal: 10;
  borderBottomColor: ${consts.LIGHTER_GREY};
  borderBottomWidth: 1;
`;

const Item = styled.View`
  ${mixinStyles};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LastItem = Item.extend`
  borderBottomWidth: 0;
`;

const EmailInput = styled.TextInput.attrs({
  keyboardType: 'email-address',
})`
  ${mixinStyles};
  font-size: 12;
  width: 100%;
`;

const PasswordInput = EmailInput.extend`
  borderBottomWidth: 0;
`;

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    ...consts.NAVIGATION_OPTIONS,
  }

  componentDidMount() {
    const { actions, user } = this.props;
    actions.fetchSettings(user);
  }

  renderNotificationSettings = () => {
    const { actions, user } = this.props;
    const { notification } = user.settings;

    return _.toPairs(notification).map(([key, value]) => (
      <Item key={key}>
        <Text>{key}</Text>
        <Switch
          onValueChange={(value) => {
            actions.changeNotificationSettings({
              user, key, value,
            });
          }}
          value={value}
        />
      </Item>
    ));
  }

  render() {
    const { user } = this.props;

    return (
      <DarkWhiteContainer>
        <Title>ACCOUNT</Title>
        <Card>
          <EmailInput defaultValue={user.email} />
          <PasswordInput
            secureTextEntry
            defaultValue={user.password}
          />
        </Card>
        <Title>NOTIFICATION</Title>
        <Card>
          {this.renderNotificationSettings()}
        </Card>
      </DarkWhiteContainer>
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
)(SettingsScreen);
