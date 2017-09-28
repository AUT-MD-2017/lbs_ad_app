import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import * as consts from '../constants';
import { Container } from '../components/misc';
import * as locationActions from '../actions/location';


const StyledContainer = styled(Container)`
  background-color: ${consts.DARK_WHITE};
`;

const Card = styled(View)`
  background-color: ${consts.WHITE};
  padding-vertical: 10;
  padding-horizontal: 10;
`;

class LocaitonScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.location.name,
  });

  componentDidMount() {
    const { location } = this.props.navigation.state.params;
    this.props.actions.fetchLocation(location.id);
  }

  render() {
    const { location } = this.props.navigation.state.params;

    return (
      <StyledContainer>
        <Card>
          <Text>{location.name}</Text>
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
