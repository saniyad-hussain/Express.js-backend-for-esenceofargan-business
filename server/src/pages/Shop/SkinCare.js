'use strict';
const React = require('react');
const PropTypes = require('prop-types');

const Layout = require('../Layout');
const Shop = require('./Shop');
const Product = require('./Product');

const { skinCareProducts } = require('../../../config/productConfig');

const [bannerImg1, bannerImg2, bannerImg3] = Shop.createBannerElements([
  [
    { img: '/assets/images/shop/skin-care/banner1_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/skin-care/banner1_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/skin-care/banner2_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/skin-care/banner2_960.jpg', size: 960 },
  ],
  [
    { img: '/assets/images/shop/skin-care/banner3_1920.jpg', size: 1920 },
    { img: '/assets/images/shop/skin-care/banner3_960.jpg', size: 960 },
  ],
]);

const SkinCare = ({ products }) => {
  return (
    <Shop
      pageName={'Skin Care'}
      bannerImg1={bannerImg1}
      heading={
        <>
          <h2>Skincare, Simplified</h2>
          <p>Argan Oil’s unique properties and essential vitamins fortify skin against dryness, acne and eczema.</p>
        </>
      }
      products={products.map(product => <Product product={product} />)}
      bannerImg2={bannerImg2}
      additionalInfo={
        <>
          <h3>How To Use</h3>
          <p>
            For best results, gently massage a generous amount into freshly cleansed skin up to three times daily.
          </p>
          <hr />
          <h3>The Benefits</h3>
          <p>
            Essence Of Argan’s nutrient-rich formulas ensure essential moisture and nourishment. Our meticulously crafted skincare products can be used to revitalize ailments including acne, fine lines, dryness, eczema, psoriasis, scars, stretch marks and rashes.
          </p>
        </>
      }
      bannerImg3={bannerImg3}
      bannerImg3Corner="topright"
    />
  );
};

SkinCare.propTypes = {
  products: PropTypes.object.isRequired,
};

module.exports = async (req) => req.context.render({
  title: 'Skin Care | essenceofargan.com',
  element: (
    <Layout req={req}>
      <SkinCare products={skinCareProducts} />
    </Layout>
  ),
});
