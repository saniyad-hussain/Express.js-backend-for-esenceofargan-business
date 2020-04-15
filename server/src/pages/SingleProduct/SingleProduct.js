'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const R = require('ramda');

const styles = require('./single-product.scss');

const SingleProduct = ({ product, meta }) => (
  <>
    <div className={styles.breadcrumb}>
      Home / Shop / {meta.category}
    </div>
    <div
      className={styles.productMain}
      data-script="single-product"
      data-js-id="singleProductRoot"
      data-data={JSON.stringify(
        Object.assign(
          R.pick(['id', 'name', 'price', 'subscriptionPrice'], product),
          {
            imageClassName: styles.productImage,
            images: product.images.map(name => `/assets/images/products/${name}.png`),
          }
        ))}
    >
      <div
        className={styles.productImageContainer}
        data-js-id="productImageContainer"
      >
        <img
          src={`/assets/images/products/${product.images[0]}.png`}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productPurchaseContainer}>
        <h1 className={styles.productName}>
          {product.name}
        </h1>
        <p>{product.desc}</p>
        <div
          className={styles.productPurchaseOptions}
          data-js-id="productPurchaseOptions"
        />
      </div>
    </div>
    <div className={styles.generalAbout}>
      {meta.generalAbout.map(({ header, body }, index) => (
        <React.Fragment key={`use-benefit-${index}`}>
          {index > 0 && <hr />}
          <h3>{header}</h3>
          <p>{body}</p>
        </React.Fragment>
      ))}
    </div>
    <div className={styles.suggestions}>
      <h3>You may also like...</h3>
      <div className={styles.suggestionsList}>
        {meta.suggestions.map(({ id, name, image }, index) => {
          return (
            <a
              key={`suggestion-${index}`}
              className={styles.suggestion}
              href={`/product/${id}`}
            >
              <img
                className={styles.productImage}
                src={`/assets/images/products/${image}.png`}
                alt={name}
              />
              <h4>{name}</h4>
            </a>
          );
        })}
      </div>
    </div>
    <div className={styles.reviews}>
      <h3>Reviews</h3>
    </div>
    <div className={styles.readMoreContainer}>
      <a href="/our-story">
        Read More
      </a>
    </div>
  </>
);

SingleProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    category: PropTypes.string.isRequired,
    generalAbout: PropTypes.arrayOf(PropTypes.shape({
      header: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })).isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

module.exports = SingleProduct;
