'use strict';
const React = require('react');
const PropTypes = require('prop-types');

const Layout = require('../Layout');
const Shop = require('./Shop');
const Product = require('./Product');

const { cosmeticsProducts } = require('../../../config/productConfig');

const [bannerImg1, bannerImg2, bannerImg3] = Shop.createBannerElements([
  [
    { img: '/assets/images/shop/cosmetics/banner1_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/cosmetics/banner1_480.jpg', size: 800, small: true },
    { img: '/assets/images/shop/cosmetics/banner1_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/cosmetics/banner2_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/cosmetics/banner2_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/cosmetics/banner3_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/cosmetics/banner3_480.jpg', size: 416, small: true },
    { img: '/assets/images/shop/cosmetics/banner3_960.jpg', size: 960 },
  ],
]);

const Cosmetics = ({ products }) => {
  return (
    <Shop
      pageName={'Cosmetics'}
      bannerImg1={bannerImg1}
      heading={
        <>
          <h2>
            Beauty, Redefined
          </h2>
          <p>
            From lip color to mascara, our cosmetics are formulated with hydrating and nourishing ingredients.
          </p>
        </>
      }
      products={products.map(product => <Product product={product} />)}
      bannerImg2={bannerImg2}
      additionalInfo={
        <>
          <h3>The Benefits</h3>
          <p>
            Our organically sourced Argan Oil provides luxurious, transformative benefits to daily cosmetics, including unique strengthening and hydration.
          </p>
        </>
      }
      bannerImg3={bannerImg3}
      bannerImg3Corner="topright"
    />
  );
};

Cosmetics.propTypes = {
  products: PropTypes.object.isRequired,
};

module.exports = async (req) => req.context.render({
  title: 'Cosmetics | essenceofargan.com',
  element: (
    <Layout req={req}>
      <Cosmetics products={cosmeticsProducts} />
    </Layout>
  ),
});
