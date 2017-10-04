import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import {
  Title, PasswordArea, SubmitButton, Wrapper,
  TipArea, TipText, OperationText, RegisterScreen,
} from './register_screen';
import { AnonymousContainer } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


class LoginScreen extends RegisterScreen {
  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <AnonymousContainer>
        <Wrapper>
          <Title>{consts.APP_NAME}</Title>

          <FormLabel>Email</FormLabel>
          <FormInput
            keyboardType="email-address"
            placeholder="Please input your registered email"
            onChangeText={(email) => { this.setState({ email }); }}
            value={this.state.email}
          />

          <PasswordArea>
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Your password"
              onChangeText={(password) => { this.setState({ password }); }}
              value={this.state.password}
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
