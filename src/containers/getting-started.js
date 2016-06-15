import React, { Component, PropTypes } from 'react';
import AppActions from '../components/AppActions';
import { connect } from 'react-redux';

import { setBreadcrumbs } from '../actions/page-actions'
import PageLayout from './page-layout'

import '../styles/getting-started.css';

class GettingStarted extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'Getting Started',
      },
    ]))
  }

  render() {
    return (
      <PageLayout title="Getting Started" actions={<AppActions />}>
        <div className="GettingStarted">
          <p>Welcome to the Meshblu Connector Factory. Here you will find a new way of creating, installing and managing Things.</p>
          <p>
            Running Meshblu Connectors independently allows us to simplify the installation and management process.
          </p>
          <h2>Why?</h2>
          <p>
            These Meshblu Connectors will replace the need for running a Gateblu.
            However there are few things Gateblu provides that cannot be done with the connectors.
            Like, managing a devices set in a headless enviroment.
            In that case, we will replace Gateblu with a simple utility that uses the core components from the Connector Installer.
          </p>
          <h2>How?</h2>
          <p>
            Here is the basics. Each connector is a simple node library that handles a variety of events from Meshblu.
            Those connectors, are pre-compiled and deployed to github releases.
            When you create a device here,
            it create the device in Meshblu,
            generate a One Time Password (OTP),
            and create / download a pre-configured installer.
          </p>
          <p>
            Once downloaded, you'll need to open the the DMG on Mac OS.
            On Windows and Linux, you'll need to unzip the installer whilst <u><strong>preserving the filename</strong></u>.
            That can be done by right clicking on the zip and selecting the extract here or extract all option.
          </p>
          <p>
            During the installation process,
            the installer will download the <a href="https://github.com/octoblu/go-meshblu-connector-assembler">assembler</a>,
            and the <a href="https://github.com/octoblu/go-meshblu-connector-dependency-manager">dependency manager</a>.
            The dependency manager will download and install thing like node and npm.
            The assembler handles downloading, extracting, configuring and setting up the service files for the connector.
            Both are cross-platform go libaries.
            The assembler, also downloads the <a href="https://github.com/octoblu/go-meshblu-connector-ignition">ignition script</a>.
            The ignition script handles the service interface for the different platforms and it spawns of the node processes.
          </p>
          <h2>Backwards Compatibility</h2>
          <p>This new way should be backwards compatible with the old way of running connectors.</p>
        </div>
      </PageLayout>
    );
  }
}

GettingStarted.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(GettingStarted)