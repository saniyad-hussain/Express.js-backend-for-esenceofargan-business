'use strict';
const React = require('react');
const Layout = require('../Layout');
const Contact = require('./Contact');

// Just a GET route
module.exports = async (req) => {
  return req.context.render({
    title: 'Contact Us | essenceofargan.com',
    element: (
      <Layout req={req}>
        <Contact />
      </Layout>
    ),
  });
};
