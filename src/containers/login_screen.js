import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import {
  Title, PasswordArea, SubmitButton, Wrapper, TipArea,
  TipText, OperationText,
} from './register_screen';
import { AnonymousContainer } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  onFormSubmit = () => {
    this.props.actions.login(
      this._email.value,
      this._password.value,
    );
  }

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <AnonymousContainer>
        <Wrapper>
          <Title>{consts.APP_NAME}</Title>

          <FormLabel>Email</FormLabel>
          <FormInput
            ref={(ref) => { this._email = ref; }}
            keyboardType="email-address"
            placeholder="Please input your registered email"
          />

          <PasswordArea>
            <FormLabel>Password</FormLabel>
            <FormInput
              ref={(ref) => { this._password = ref; }}
              secureTextEntry
              placeholder="Your password"
            />
          </PasswordArea>

          <SubmitButton
            {...consts.PRIMARY_BUTTON}
            title="LOG IN"
            onPress={this.onFormSubmit}
          />
        </Wrapper>

        <TouchableWithoutFeedback
          onPress={() => {
            navigate('Register');
          }}
        >
          <TipArea>
            <TipText>Not a member yet?</TipText>
            <OperationText>REGISTER</OperationText>
          </TipArea>
        </TouchableWithoutFeedback>
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
