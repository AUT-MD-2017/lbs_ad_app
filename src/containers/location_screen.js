import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native';
import { phonecall, web } from 'react-native-communications';
import styled from 'styled-components/native';

import {
  Ionicons, ListItem, LocationMap, LocationPrimaryInfo,
} from '../components';
import {
  Card, Container, SmallText, SimpleCard,
} from '../components/misc';
import * as consts from '../constants';
import * as locationActions from '../actions/location';


const styles = {
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
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.location.name,
    ...consts.NAVIGATION_OPTIONS,
  });

  componentDidMount() {
    const { location } = this.props.navigation.state.params;
    this.props.actions.fetchLocation(location.id);
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

const mapStateToProps = ({ location }) => {
  return { location };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(locationActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaitonScreen);
