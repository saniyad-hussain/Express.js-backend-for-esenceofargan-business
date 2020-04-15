'use strict';
const React = require('react');
const PropTypes = require('prop-types');

const Layout = require('../Layout');
const Shop = require('./Shop');
const Product = require('./Product');

const { hairCareProducts } = require('../../../config/productConfig');

const [bannerImg1, bannerImg2, bannerImg3] = Shop.createBannerElements([
  [
    { img: '/assets/images/shop/hair-care/banner1_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/hair-care/banner1_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/hair-care/banner2_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/hair-care/banner2_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/hair-care/banner3_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/hair-care/banner3_480.jpg', size: 400, small: true },
    { img: '/assets/images/shop/hair-care/banner3_960.jpg', size: 960 },
  ],
]);

const HairCare = ({ products }) => {
  return (
    <Shop
      pageName={'Hair Care'}
      bannerImg1={bannerImg1}
      heading={
        <>
          <h2>
            Haircare, Elevated
          </h2>
          <p>
            Our collection of Argan-infused treatments will refine and replenish hair with a natural richness.
          </p>
        </>
      }
      products={products.map(product => <Product product={product} />)}
      bannerImg2={bannerImg2}
      additionalInfo={
        <>
          <h3>How To Use</h3>
          <p>
            Gently massage desired amount into hair and scalp one to three times weekly.
          </p>
          <hr />
          <h3>The Benefits</h3>
          <p>
            Argan Oil’s essential Omega 3 and Omega 9 fatty acids penetrate hair, correcting damaged follicles and increasing overall luster. This non-greasy formula tames frizz, aides dry scalp and strengthens weak strands.
          </p>
        </>
      }
      bannerImg3={bannerImg3}
      bannerImg3Corner="topleft"
    />
  );
};

HairCare.propTypes = {
  products: PropTypes.object.isRequired,
};

module.exports = async (req) => req.context.render({
  title: 'Hair Care | essenceofargan.com',
  element: (
    <Layout req={req}>
      <HairCare products={hairCareProducts} />
    </Layout>
  ),
});
