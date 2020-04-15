'use strict';
const React = require('react');
const Layout = require('./Layout');

const NotFound = () => {
  return (
    <div>
      <p>
        Sorry, the requested page doesn&apos;t seem to exist. :(
      </p>
    </div>
  );
};

module.exports = async (req) => {
  return req.context.render({
    title: 'Not Found | essenceofargan.com',
    element: (
      <Layout req={req}>
        <NotFound />
      </Layout>
    ),
  });
};
