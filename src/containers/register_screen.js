import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  AsyncStorage, TouchableWithoutFeedback,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import styled from 'styled-components/native';

import { AnonymousContainer } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


export const Title = styled.Text`
  margin-top: 25%;
  margin-bottom: 25%;
  font-size: 28;
  color: ${consts.LIGHT_BLUE};
  text-align: center;
`;

export const PasswordArea = styled.View`
  margin-top: 15;
  margin-bottom: 60;
`;

export const SubmitButton = styled(Button)`
  margin-horizontal: 5;
`;

export const Wrapper = styled.View`
  flex: 1;
`;

export const TipArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 10;
`;

export const TipText = styled.Text`
  color: ${consts.GREY};
  font-size: 12;
`;

export const OperationText = TipText.extend`
  margin-left: 5;
  color: ${consts.RED};
`;

class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    email: '',
    password: '',
  }

  onFormSubmit = () => {
    const { actions, navigation } = this.props;
    const { email, password } = this.state;

    actions.register(email, password).then(() => {
      navigation.navigate('LoggedIn');
    });
  }

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <AnonymousContainer>
        <Wrapper>
          <Title>{consts.APP_NAME}</Title>

          <FormLabel>Email</FormLabel>
          <FormInput
            keyboardType="email-address"
            placeholder="Please input a valid email address"
            onChangeText={(email) => { this.setState({ email }); }}
            value={this.state.email}
          />

          <PasswordArea>
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Should more than 6 characters"
              onChangeText={(password) => { this.setState({ password }); }}
              value={this.state.password}
            />
          </PasswordArea>

          <SubmitButton
            {...consts.PRIMARY_BUTTON}
            title="REGISTER"
            onPress={this.onFormSubmit}
          />
        </Wrapper>

        <TouchableWithoutFeedback
          onPress={() => {
            navigate('Login');
          }}
        >
          <TipArea>
            <TipText>Have been here before?</TipText>
            <OperationText>LOG IN</OperationText>
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
)(RegisterScreen);
