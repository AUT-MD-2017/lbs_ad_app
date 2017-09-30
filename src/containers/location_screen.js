import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableHighlight, Text } from 'react-native';
import Anime from 'react-native-anime';
import { phonecall, web } from 'react-native-communications';
import styled from 'styled-components/native';

import BookmarkButton from './bookmark_button';
import {
  Ionicons, ListItem, LocationMap, LocationPrimaryInfo,
} from '../components';
import {
  Card, Container, SmallText, SimpleCard,
} from '../components/misc';
import * as consts from '../constants';
import * as locationActions from '../actions/location';


const styles = {
  tipView: {
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: consts.LIGHT_BLUE,
  },
  tipText: {
    color: consts.WHITE,
  },
  map: {
    height: 200,
  },
};

const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

const FlexText = SmallText.extend`
  flex: 1;
`;

const FlexGreyText = FlexText.extend`
  color: ${consts.DARK_GREY};
  margin-left: 10;
`;

const Discount = styled.Text`
  font-size: 12;
  margin-top: 5;
  color: ${consts.RED};
`;

const HoursToday = styled.View`
  margin-top: 5;
`;

const WhiteView = styled.View`
  background-color: ${consts.WHITE};
`;

class LocaitonScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    const headerRightProps = {
      color: screenProps.tintColor,
      onPress: params.onPressHeaderRight,
    };

    return {
      title: params.location.name,
      ...consts.NAVIGATION_OPTIONS,
      headerRight: <BookmarkButton {...headerRightProps} />,
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { location } = navigation.state.params;

    navigation.setParams({
      onPressHeaderRight: this.onPressHeaderRight,
    });
    this.props.actions.fetchLocation(location.id);
  }

  onPressHeaderRight = () => {
    const { actions, location } = this.props;

    this._tip.height(30).wait(2000).height(0).start();

    actions[
      location.isCollected ? 'removeBookmark' : 'addBookmark'
    ](location.id);
  }

  onAddressPress = () => {
    const { navigation: { navigate }, location } = this.props;
    navigate('Map', { location });
  }

  onCallContact = () => {
    const num = this.props.location.contact.replace(/-/g, '');
    phonecall(num, false);
  }

  onVisitWebsite = () => {
    const url = `http://${this.props.location.website}`;
    web(url);
  }

  render() {
    const location = {
      ...this.props.location,
      ...this.props.navigation.state.params.location,
    };

    const { discount } = location;

    return (
      <StyledContainer>
        <Anime.View
          ref={(ref) => { this._tip = ref; }}
          style={styles.tipView}
        >
          <Text style={styles.tipText}>
            {this.props.location.isCollected ?
              'It has been added as a bookmark.' :
              'It has been removed from the bookmark.'
            }
          </Text>
        </Anime.View>
        <Card>
          <LocationPrimaryInfo location={location} />
          {discount &&
            <Discount>Coupon: Showing this to gain ${discount}% OFF</Discount>
          }
          <HoursToday>
            <SmallText>Hours Today: {location.hoursToday}</SmallText>
          </HoursToday>
        </Card>

        <SimpleCard>
          <TouchableHighlight onPress={this.onAddressPress}>
            <WhiteView>
              <LocationMap style={styles.map} location={location} />
              <ListItem>
                <FlexText>{location.address}</FlexText>
              </ListItem>
            </WhiteView>
          </TouchableHighlight>
        </SimpleCard>

        <SimpleCard>
          <TouchableHighlight onPress={this.onCallContact}>
            <ListItem>
              <Ionicons size={20} name="ios-call-outline" />
              <FlexGreyText>{location.contact}</FlexGreyText>
            </ListItem>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onVisitWebsite}>
            <ListItem>
              <Ionicons size={20} name="ios-laptop-outline" />
              <FlexGreyText>{location.website}</FlexGreyText>
            </ListItem>
          </TouchableHighlight>
        </SimpleCard>
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({ location }) => ({
  location,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(locationActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaitonScreen);
