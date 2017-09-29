import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import * as consts from '../constants';
import { Card, Container, SmallText } from '../components/misc';
import Ionicons from '../components/ionicons';
import LocationMap from '../components/location_map';
import LocationPrimaryInfo from '../components/location_primary_info';
import * as locationActions from '../actions/location';


const styles = {
  map: {
    height: 200,
  },
};

const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

const AddressCard = Card.extend`
  flex-direction: row;
`;

const AddressText = SmallText.extend`
  flex: 1;
`;

const Discount = styled.Text`
  font-size: 12;
  margin-top: 5;
  color: ${consts.RED};
`;

const HoursToday = styled.View`
  margin-top: 5;
`;

class LocaitonScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.location.name,
  });

  componentDidMount() {
    const { location } = this.props.navigation.state.params;
    this.props.actions.fetchLocation(location.id);
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
        <View>
          <LocationMap style={styles.map} location={location} />
          <AddressCard>
            <AddressText adjustsFontSizeToFit>
              {location.address}
            </AddressText>
            <Ionicons />
          </AddressCard>
        </View>
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
