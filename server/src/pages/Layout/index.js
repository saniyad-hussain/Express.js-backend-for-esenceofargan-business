'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./layout.scss');
const { Provider } = require('../util/appContext');
const Header = require('./Header');
const Footer = require('./Footer');

const Layout = ({ children, req }) => {
  return (
    <Provider value={req}>
      <Header req={req} />
      <div className={styles.content}>
        {children}
      </div>
      <Footer req={req} />
    </Provider>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  req: PropTypes.object.isRequired,
};
module.exports = Layout;
