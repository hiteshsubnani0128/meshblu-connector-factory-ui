import React from 'react';
import { Link } from 'react-router'
import { Button } from 'zooid-ui'

const AppActions = () => {
  return (
    <ul>
      <li><Link to="/things/my" className="Button Button--no-style">My Things</Link></li>
      <li>|</li>
      <li><Link to="/things/all" className="Button Button--no-style">All Things</Link></li>
      <li>|</li>
      <li><Button href="https://meshblu-connectors.readme.io" kind="no-style">Getting Started</Button></li>
    </ul>
  )
};

export default AppActions;
