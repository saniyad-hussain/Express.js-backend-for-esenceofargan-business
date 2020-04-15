'use strict';
const React = require('react');
// const PropTypes = require('prop-types');

const ShoppingBagIcon = props => {
  return (
    <svg {...props} version="1.1" viewBox="0 0 100 100">
      <polygon
        points="18 92 27 24 73 24 82 92"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
      />
      <path
        d="M 35 40 L 35 20 C 35 0, 65 0, 65 20 L 65 40"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
      />
    </svg>
  );
};

module.exports = ShoppingBagIcon;
