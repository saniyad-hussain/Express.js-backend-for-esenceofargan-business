'use strict';
const React = require('react');
const Layout = require('./Layout');

const Example = ({ someData }) => {
  return (
    <>
      <h2>Example Page</h2>
      <p>We use someData: {JSON.stringify(someData)}</p>
    </>
  );
};

// Just a GET route
module.exports = async (req) => {
  // const someData = await req.context.services.exampleService();
  const someData = { data: 'example data' };
  return req.context.render({
    title: 'Example | essenceofargan.com',
    element: (
      <Layout req={req}>
        <Example someData={someData} />
      </Layout>
    ),
  });
};
