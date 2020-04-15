'use strict';
const React = require('react');
const PropTypes = require('prop-types');

const Layout = require('../Layout');
const Shop = require('./Shop');
const Product = require('./Product');

const { culinaryProducts } = require('../../../config/productConfig');

const [bannerImg1, bannerImg2, bannerImg3] = Shop.createBannerElements([
  [
    { img: '/assets/images/shop/culinary/banner1_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/culinary/banner1_480.jpg', size: 800, small: true },
    { img: '/assets/images/shop/culinary/banner1_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/culinary/banner2_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/culinary/banner2_480.jpg', size: 480, small: true },
    { img: '/assets/images/shop/culinary/banner2_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/culinary/banner3_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/culinary/banner3_480.jpg', size: 800, small: true },
    { img: '/assets/images/shop/culinary/banner3_960.jpg', size: 960 },
  ],
]);

const Culinary = ({ products }) => {
  return (
    <Shop
      pageName={'Culinary'}
      bannerImg1={bannerImg1}
      heading={
        <>
          <h2>
            Cuisine, Enhanced
          </h2>
          <p>
            With an abundance of flavor and a host of health benefits, culinary Argan Oil enhances foods with a toasted, nutty flavor.
          </p>
        </>
      }
      products={products.map(product =>  <Product product={product} />)}
      bannerImg2={bannerImg2}
      additionalInfo={
        <>
          <h3>
            How To Use
          </h3>
          <p>
            This nutrient-rich oil complements sweet and savory foods alike. Blend with honey or chocolate, drizzle over vegetables, salads, sauces and more.
          </p>
          <hr />
          <h3>The Benefits</h3>
          <p>
            Used for thousands of years in the kitchen, Argan Oil possesses a rich flavor and dense nutrients, which may play a part in preventing cancer, heart disease and obesity.
          </p>
        </>
      }
      bannerImg3={bannerImg3}
      bannerImg3Corner="bottomright"
    />
  );
};

Culinary.propTypes = {
  products: PropTypes.object.isRequired,
};

module.exports = async (req) => req.context.render({
  title: 'Culinary | essenceofargan.com',
  element: (
    <Layout req={req}>
      <Culinary products={culinaryProducts} />
    </Layout>
  ),
});
