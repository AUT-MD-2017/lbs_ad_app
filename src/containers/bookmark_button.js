import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { HeaderButton } from '../components';

class BookmarkButton extends React.Component {
  render() {
    const { props } = this;

    return (
      <HeaderButton onPress={props.onPress}>
        <Icon
          name={props.location.isCollected ? 'bookmark' : 'bookmark-o'}
          size={24}
          color={props.color}
        />
      </HeaderButton>
    );
  }
}

const mapStateToProps = ({ location }) => ({
  location,
});

export default connect(
  mapStateToProps,
)(BookmarkButton);
