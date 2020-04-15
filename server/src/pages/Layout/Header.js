'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');
const styles = require('./header.scss');
const ShoppingBagIcon = require('../components/ShoppingBagIcon');
const conditionalMap = require('../util/conditionalMap');

const anchor = (req, path, label, id = undefined) => {
  return (
    <a
      id={id}
      href={path}
      className={path === req.originalUrl ? `${styles.navLink} ${styles.active}` : styles.navLink}
    >
      {label || path}
    </a>
  );
};

const Chevron = props => {
  return (
    <svg viewBox="0 0 20 12" width="20px" height="12px" {...props}>
      <path
        d="M 2 2 L 10 10 L 18 2"
        stroke="black"
        fill="transparent"
        strokeWidth="1"
      />
    </svg>
  );
};

const Hamburger = props => {
  return (
    <svg {...props} viewBox="0 0 20 20">
      <path
        d="M2 4 L 18 4 M 2 10 L 18 10 M 2 16 L 18 16"
        stroke="black"
        strokeWidth="1"
        fill="transparent"
      />
    </svg>
  );
};

const ShopDropdown = ({ req, appSchema, id }) => {
  let shopActive = false;
  const shopLinks = conditionalMap(appSchema.pages, (page, none, index) => {
    if (page.shopLink) {
      if (page.path === req.originalUrl) {
        shopActive = true;
      }
      return (
        <li key={index}>
          {anchor(req, page.path, page.label)}
        </li>
      );
    }
    return none;
  });
  return (
    <div
      className={styles.shopDropdownContainer}
      data-js-id="layout-header-dropdown-container"
    >
      <input
        data-js-id="layout-header-dropdown-checkbox"
        type="checkbox"
        className={'sr-only ' + styles.dropdownInput}
        id={id}
        autoComplete="false"
      />
      <label htmlFor={id} className={classNames(styles.dropdownInputLabel, shopActive && styles.active)}>
        <span className="sr-only">Open </span>Shop<span className="sr-only"> menu</span> <Chevron />
      </label>
      <ul className={styles.dropdownBody}>
        {shopLinks}
      </ul>
    </div>
  );
};

const Header = ({ req }) => {
  const appSchema = req.context.appSchema;
  return (
    <>
      <div className={styles.preHeader}>
        Up to 70% off store wide using our Subscribe and Save checkout - Plus Free Shipping on your first order!
      </div>
      <div className={styles.preHeaderMobile}>
        Up to 70% off! Plus Free Shipping on your first order.
      </div>
      <div className={styles.header + (req.originalUrl === '/' ? ` ${styles.landingHeader}` : '')}>
        <nav
          className={styles.mobileNav + ' ' + styles.mobileNavHidden}
          id="layout-header-mobile-nav"
          data-hidden-class={styles.mobileNavHidden}
        >
          <button
            id="layout-header-mobile-nav-button"
            type="button"
            className={styles.mobileNavMenuButton}
          >
            <span className="sr-only">Menu</span>
            <Hamburger className={styles.menuIcon} />
          </button>
        </nav>
        <nav className={styles.nav}>
          <ShopDropdown req={req} appSchema={appSchema} id="shop-menu" />
          {conditionalMap(appSchema.pages, (page, none, index) => {
            if (page.primary) {
              return (
                <a
                  key={index}
                  href={page.path}
                  className={page.path === req.originalUrl ? `${styles.navLink} ${styles.active}` : styles.navLink}
                >
                  {page.label || page.path}
                </a>
              );
            }
            return none;
          })}
        </nav>
        <h1
          className={styles.title}
        >
          <a href={appSchema.rootPath}>
            <span className="sr-only">{appSchema.title}</span>
          </a>
        </h1>
        <nav className={styles.nav}>
          {anchor(req, '/subscribe', 'Subscribe!')}
          <div id="header-nav-cart-container">
            {anchor(req, '/bag', 'My Bag (0)', 'header-nav-cart-link')}
          </div>
          <div className={styles.loginLinkContainer}>
            {anchor(req, '/login', 'Login')}
          </div>
        </nav>
        <nav className={styles.mobileNav}>
          {anchor(req, '/bag', (
            <>
              <span className="sr-only">My Bag (0)</span>
              <ShoppingBagIcon className={styles.bagIcon} />
            </>
          ))}
        </nav>
      </div>
      <div className={styles.mobileNavMenuContainer}>
        <div
          className={styles.mobileNavMenu}
          id="layout-header-mobile-nav-menu"
          style={{ display: 'none' }}
        >
          <ShopDropdown req={req} appSchema={appSchema} id="shop-menu-mobile" />
          {conditionalMap(appSchema.pages, (page, none, index) => {
            if (page.primary) {
              return (
                <a
                  key={index}
                  href={page.path}
                  className={page.path === req.originalUrl ? `${styles.navLink} ${styles.active}` : styles.navLink}
                >
                  {page.label || page.path}
                </a>
              );
            }
            return none;
          })}
          {anchor(req, '/subscribe', 'Subscribe!')}
          {anchor(req, '/login', 'Login')}
        </div>
      </div>
    </>
  );
};
Header.propTypes = {
  req: PropTypes.shape({
    originalUrl: PropTypes.string.isRequired,
  }).isRequired,
};
module.exports = Header;
