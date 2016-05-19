import React, { Component, PropTypes } from 'react';

import OctobluOauth from './octoblu-oauth';

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default class Authentication extends Component {
  render() {
    return (
      <OctobluOauth>
        {this.props.children}
      </OctobluOauth>
    );
  }
}

Authentication.propTypes = propTypes;