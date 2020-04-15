'use strict';
const React = require('react');
// const PropTypes = require('prop-types');
const styles = require('./floated-callout.scss');

const FloatedCallout = ({ title, body, path, linkLabel, image, alt, reverse }) => {
  return (
    <div className={styles.floatedCallout + (reverse ? ` ${styles.reverse}` : '')}>
      <img src={image} alt={alt} />
      <div className={styles.floatedCalloutContent}>
        <h2>{title}</h2>
        <p>{body}</p>
        {path && linkLabel && (
          <a
            href={path}
            className={styles.floatedCalloutLink}
          >
            {linkLabel}
          </a>
        ) || null}
      </div>
    </div>
  );
};
// FloatedCallout.propTypes = {};
module.exports = FloatedCallout;
