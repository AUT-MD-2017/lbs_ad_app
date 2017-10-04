import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native';

import { AnonymousContainer } from '../../components/misc';
import * as consts from '../../constants';
import * as userActions from '../../actions/user';


const Logo = () => {
  const StyledView = styled.View`
    margin-top: 25%;
    align-items: center;
  `;
  const StyledImage = styled.Image`
    width: 130;
    height: 130;
    margin-bottom: 10;
  `;
  const StyledText = styled.Text`
    font-size: 28;
    color: ${consts.RED};
  `;
  const source = require('./logo.png');

  return (
    <StyledView>
      <StyledImage source={source} />
      <StyledText>{consts.APP_NAME}</StyledText>
    </StyledView>
  );
};

const ButtonArea = styled.View`
  margin-horizontal: 15;
  margin-top: 50%;
`;

const RegisterButton = styled(Button)`
  margin-bottom: 15;
`;

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
    const { navigation: { navigate } } = this.props;

    return (
      <AnonymousContainer>
        <Logo />
        <ButtonArea>
          <RegisterButton
            {...consts.PRIMARY_BUTTON}
            borderRadius={100}
            title="REGISTER"
            onPress={() => {
              navigate('Register');
            }}
          />
          <Button
            {...consts.PRIMARY_OUTLINE_BUTTON}
            borderRadius={100}
            title="LOG IN"
            onPress={() => {
              navigate('Login');
            }}
          />
        </ButtonArea>
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
