'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./shop.scss');

const banner3styles = {
  topleft: styles['bannerImg3TopLeft'],
  topright: styles['bannerImg3TopRight'],
  bottomleft: styles['bannerImg3BottomLeft'],
  bottomright: styles['bannerImg3BottomRight'],
};

const createBannerElements = banners => banners.map(banner => {
  return banner.map(({ img, size, small }, index) => {
    if (banner.length - index <= 1) {
      return <img alt="" src={img} />;
    }
    return (
      <source
        media={`(${small ? 'max' : 'min'}-width: ${size}px)`}
        srcSet={img}
      />
    );
  });
});

const Shop = ({
  pageName,
  bannerImg1,
  heading,
  products,
  bannerImg2,
  additionalInfo,
  bannerImg3,
  bannerImg3Corner,
}) => {
  return (
    <div className={styles.shop}>
      <div className={styles.breadcrumb}>
        Home / Shop / {pageName}
      </div>
      <picture className={styles.bannerImg1}>
        {bannerImg1}
      </picture>
      <div className={styles.heading}>
        {heading}
      </div>
      <div className={styles.products}>
        {products}
      </div>
      <picture className={styles.bannerImg2}>
        {bannerImg2}
      </picture>
      <div className={styles.additionalInfo}>
        {additionalInfo}
      </div>
      <picture className={`${styles.bannerImg3} ${banner3styles[bannerImg3Corner]}`}>
        {bannerImg3}
      </picture>
      <div className={styles.lastStatement}>
        Ancient ritual. Pure beauty. Organic health.
      </div>
    </div>
  );
};
Shop.propTypes = {
  pageName: PropTypes.string.isRequired,
  bannerImg1: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
  products: PropTypes.node.isRequired,
  bannerImg2: PropTypes.node.isRequired,
  additionalInfo: PropTypes.node.isRequired,
  bannerImg3: PropTypes.node.isRequired,
  bannerImg3Corner: PropTypes.oneOf([
    'topleft',
    'topright',
    'bottomleft',
    'bottomright',
  ]).isRequired,
};
Shop.createBannerElements = createBannerElements;
module.exports = Shop;
