'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');
const styles = require('./product.scss');

const placeholder = (
  <svg version="1.1" viewBox="0 0 100 100" className={styles.imageSpaceHolder}>
    <rect x="0" y="0" width="100" height="100" fill="transparent"/>
  </svg>
);

const Product = ({ annotation, product, children, className, hideDescMobile }) => {
  return (
    <div className={classNames(styles.product, className)}>
      {annotation && <i className={styles.annotation}>{annotation}</i>}
      <a
        href={`/product/${product.id}`}
        className={styles.imageWrapper}
      >
        {placeholder}
        <img
          className={styles.productImage}
          src={`/assets/images/products/${product.id}.png`}
          alt={product.name}
        />
      </a>
      <h4 className={styles.productName}>
        <a href={`/product/${product.id}`}>{product.name}</a>
      </h4>
      <p className={styles.productPrice}>${product.price}</p>
      <a
        href={`/product/${product.id}?subscribe=1`}
        className={styles.subscribeLink}
      >
        Subscribe and save up to 66%
      </a>
      {children || null}
      <p className={classNames(styles.desc, hideDescMobile && styles.hideModileDesc)}>{product.desc}</p>
      <div className={styles.actionWrapper}></div>
    </div>
  );
};
Product.propTypes = {
  annotation: PropTypes.node,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  hideDescMobile: PropTypes.bool,
};
module.exports = Product;
