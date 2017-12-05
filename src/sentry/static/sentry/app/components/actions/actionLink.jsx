import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Confirm from '../confirm';
import {t} from '../../locale';

export default class ActionLink extends React.Component {
  static propTypes = {
    shouldConfirm: PropTypes.bool,
    message: PropTypes.node,
    className: PropTypes.any,
    onAction: PropTypes.func.isRequired,
    title: PropTypes.string,
    confirmLabel: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    shouldConfirm: false,
    isDisabled: false,
  };

  render() {
    let {
      shouldConfirm,
      message,
      className,
      title,
      onAction,
      confirmLabel,
      disabled,
      children,
    } = this.props;

    let confirmMessage = (
      <div>
        {message}
        <p>{t('This action cannot be undone.')}</p>
      </div>
    );

    let cx = classNames(className, {
      disabled,
    });

    if (shouldConfirm) {
      return (
        <Confirm message={confirmMessage} confirmText={confirmLabel} onConfirm={onAction}>
          <a className={cx} title={title}>
            {' '}
            {children}
          </a>
        </Confirm>
      );
    } else {
      return (
        <a className={cx} onClick={!disabled && onAction}>
          {children}
        </a>
      );
    }
  }
}
