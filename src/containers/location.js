import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import * as consts from '../constants';
import { Container, SmallText } from '../components/misc';
import LocationPrimaryInfo from '../components/location_primary_info';
import * as locationActions from '../actions/location';


const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

const Card = styled.View`
  background-color: ${consts.WHITE};
  padding-vertical: 10;
  padding-horizontal: 10;
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

    return (
      <StyledContainer>
        <Card>
          <LocationPrimaryInfo location={location} />
          <HoursToday>
            <SmallText>Hours Today: {location.hoursToday}</SmallText>
          </HoursToday>
        </Card>
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
