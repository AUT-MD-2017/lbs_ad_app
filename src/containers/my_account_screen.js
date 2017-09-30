import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { Tab, Tabs, TabHeading, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

import { Ionicons } from '../components';
import { Container, Card } from '../components/misc';
import * as consts from '../constants';
import * as userActions from '../actions/user';


const styles = {
  tab: {
    tabBarBackgroundColor: consts.RED,
    tabStyle: {
      backgroundColor: consts.RED,
      borderBottomColor: consts.RED,
      borderBottomWidth: 1,
    },
  },
  tabHeading: {
    backgroundColor: consts.DARK_WHITE,
    borderBottomColor: consts.RED,
    borderBottomWidth: 1,
  },
};

const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

export const StyledCard = Card.extend`
  flex-direction: row;
  align-items: center;
  padding-vertical: 20;
  padding-horizontal: 12;
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

const BookmarkTitle = styled.Text`
  font-size: 16;
  color: ${consts.DARK_GREY};
  margin-top: 15;
  margin-left: 12;
  margin-bottom: 5;
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

        <BookmarkTitle>BOOKMARKS</BookmarkTitle>
        <Tabs
          tabBarActiveTextColor={consts.RED}
          tabBarTextStyle={styles.tabHeading}
        >
          <Tab
            heading={
              <TabHeading
                style={styles.tabHeading}
              >
                <Text>Tab 1</Text>
              </TabHeading>
            }
            {...styles.tab}
          >
            <Text>Tab 1</Text>
          </Tab>
        </Tabs>
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
