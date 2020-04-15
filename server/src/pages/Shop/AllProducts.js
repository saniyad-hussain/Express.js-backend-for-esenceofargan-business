'use strict';
const React = require('react');
const PropTypes = require('prop-types');

const Layout = require('../Layout');
const Product = require('./Product');

const { allProducts } = require('../../../config/productConfig');

const styles = require('./all-products.scss');

const AllProducts = ({ products }) => {
  return (
    <>
      <div className={styles.breadcrumb}>
        Home / Shop / All
      </div>
      <div className={styles.heading}>
        <h2>
          Liquid Gold
        </h2>
        <p>
          The essence of youth, health and beauty. With naturally occurring vitamins and essential acids, Argan Oil offers an effective, holistic approach to wellness.
        </p>
      </div>
      <div className={styles.products}>
        {products.map(product => <Product product={product} className={styles.product} hideDescMobile />)}
      </div>
    </>
  );
};

AllProducts.propTypes = {
  products: PropTypes.object.isRequired,
};

module.exports = async (req) => req.context.render({
  title: 'Shop All | essenceofargan.com',
  element: (
    <Layout req={req}>
      <AllProducts products={allProducts} />
    </Layout>
  ),
});
