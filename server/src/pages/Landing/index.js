'use strict';
const React = require('react');
// const PropTypes = require('prop-types');
const Layout = require('../Layout');
const Landing = require('./Landing');

module.exports = async (req) => {
  return req.context.render({
    title: 'Home | essenceofargan.com',
    element: (
      <Layout req={req}>
        <Landing />
      </Layout>
    ),
  });
};
