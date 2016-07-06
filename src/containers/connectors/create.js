import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../page-layout'
import { setBreadcrumbs } from '../../actions/page-actions'

import VersionsSelect from '../../components/VersionsSelect';

import { fetchConnectorDetails, selectVersion } from '../../actions/connectors/detail-actions';
import { upsertConnectorAction, gotToGeneratedConnector } from '../../actions/connectors/connector-actions';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVersion: null,
    }
    this.versionSelect = this.versionSelect.bind(this);
    this.createDevice = this.createDevice.bind(this);
    this.getGithubSlug = this.getGithubSlug.bind(this);
    this.getRegistryItem = this.getRegistryItem.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Connectors',
        link: '/',
      },
      {
        label: 'Available Connectors',
        link: '/connectors/available',
      },
      {
        label: 'Create',
      },
    ]))
    const githubSlug = this.getGithubSlug()
    this.props.dispatch(fetchConnectorDetails({ githubSlug }))
  }

  componentWillReceiveProps(nextProps) {
    const { key, uuid } = nextProps.connector;
    if (key && uuid) {
      this.props.dispatch(gotToGeneratedConnector({ key, uuid }))
    }
  }

  getConnectorDetails() {
    const githubSlug = this.getGithubSlug()
    let found = null
    _.some(_.values(this.props.available.registries), (registry) => {
      found = _.find(registry.items, { githubSlug })
      if (found) {
        return true
      }
      return false
    })
    return found || {}
  }

  getGithubSlug() {
    const { owner = 'octoblu', connector } = this.props.params
    return `${owner}/${connector}`
  }

  getRegistryItem() {
    const githubSlug = this.getGithubSlug()
    const { registries } = this.props.available
    let found = null
    _.some(_.values(registries), (registry) => {
      found = _.find(registry.items, { githubSlug })
    })
    if (!found) {
      return {
        githubSlug,
      }
    }
    return found
  }

  createDevice() {
    const { octoblu } = this.props
    const { version } = this.props.details.selectedVersion;
    const registryItem = this.getRegistryItem()
    const { connector } = this.props.params
    this.props.dispatch(upsertConnectorAction({ registryItem, version, connector, octoblu }))
  }

  versionSelect(selectedVersion) {
    this.props.dispatch(selectVersion(selectedVersion))
  }

  renderContent(content) {
    const { type, name } = this.getConnectorDetails()
    return (
      <PageLayout type={type} title={`Create ${name}`}>
        {content}
      </PageLayout>
    );
  }

  render() {
    const { info, selectedVersion } = this.props.details

    return this.renderContent(<VersionsSelect
      onSelect={this.createDevice}
      selected={selectedVersion}
      versions={info.tags}
    />);
  }
}

Create.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available, details, connector, octoblu }) {
  const { uuid, token } = octoblu
  return { available, details, connector, octoblu: { uuid, token } }
}

export default connect(mapStateToProps)(Create)
