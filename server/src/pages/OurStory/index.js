'use strict';
const React = require('react');
const Layout = require('../Layout');
const OurStory = require('./OurStory');

module.exports = async (req) => {
  return req.context.render({
    title: 'Our Story | essenceofargan.com',
    element: (
      <Layout req={req}>
        <OurStory />
      </Layout>
    ),
  });
};
