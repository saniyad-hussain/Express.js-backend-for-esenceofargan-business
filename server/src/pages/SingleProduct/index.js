'use strict';
const React = require('react');

const Layout = require('../Layout');
const SingleProduct = require('./SingleProduct');
const { getSingleProduct } = require('../../../config/productConfig');

module.exports = async (req) => {
  const id= req.path.split('/').pop();
  const { product, meta } = getSingleProduct(id);

  return req.context.render({
    title: `${product.name} | essenceofargan.com`,
    element: (
      <Layout req={req}>
        <SingleProduct product={product} meta={meta} />
      </Layout>
    ),
  });
};
