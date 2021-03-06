import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router';

import GroupStore from '../stores/groupStore';
import IssueList from './issueList';
import OrganizationHomeContainer from './organizations/homeContainer';
import {t} from '../locale';

const OrganizationIssueList = React.createClass({
  propTypes: {
    title: PropTypes.string,
    endpoint: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
  },

  getInitialState() {
    return this.getQueryStringState(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState(this.getQueryStringState(nextProps), this.fetchData);
    }
  },

  componentWillUnmount() {
    GroupStore.reset();
  },

  getQueryStringState(props) {
    let location = props.location;
    let status = location.query.hasOwnProperty('status')
      ? location.query.status
      : 'unresolved';
    return {
      status,
    };
  },

  render() {
    let path = this.props.location.pathname;
    let {status} = this.state;
    return (
      <OrganizationHomeContainer>
        <div className="pull-right">
          <div className="btn-group">
            <Link
              to={path}
              className={
                'btn btn-sm btn-default' + (status === 'unresolved' ? ' active' : '')
              }
            >
              {t('Unresolved')}
            </Link>
            <Link
              to={{pathname: path, query: {status: ''}}}
              className={'btn btn-sm btn-default' + (status === '' ? ' active' : '')}
            >
              {t('All Issues')}
            </Link>
          </div>
        </div>
        <h3>{this.props.title}</h3>
        <IssueList
          endpoint={this.props.endpoint}
          query={{
            status: this.state.status,
            statsPeriod: '24h',
            per_page: this.props.pageSize || 25,
          }}
          statsPeriod="24h"
          {...this.props}
        />
      </OrganizationHomeContainer>
    );
  },
});

export default OrganizationIssueList;
