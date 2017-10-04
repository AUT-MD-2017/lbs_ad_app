import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
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

const PasswordArea = styled.View`
  margin-top: 15;
  margin-bottom: 60;
`;

const SubmitButton = styled(Button)`
  margin-horizontal: 5;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const TipArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 10;
`;

const TipText = styled.Text`
  color: ${consts.GREY};
  font-size: 12;
`;

const OperationText = TipText.extend`
  padding-left: 5;
  color: ${consts.RED};
`;

class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
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
            placeholder="Please input a valid email address."
          />

          <PasswordArea>
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Should more than 6 characters."
            />
          </PasswordArea>

          <SubmitButton
            {...consts.PRIMARY_BUTTON}
            title="REGISTER"
            onPress={() => {
            }}
          />
        </Wrapper>

        <TipArea>
          <TipText>Have been here before?</TipText>
          <TouchableWithoutFeedback
            onPress={() => {
              navigate('Login');
            }}
          >
            <OperationText>LOG IN</OperationText>
          </TouchableWithoutFeedback>
        </TipArea>
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
