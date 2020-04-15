import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './close-button.scss';

const CloseButton = ({ onClose, className }) => {
  return (
    <button
      className={classNames(styles.closeButton, className)}
      type="button"
      onClick={onClose}
    >
      <span className="sr-only">
        Close
      </span>
      <span aria-hidden>X</span>
    </button>
  );
};
CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default CloseButton;
