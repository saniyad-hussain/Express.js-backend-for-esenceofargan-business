'use strict';
const React = require('react');
const styles = require('./footer.scss');
const conditionalMap = require('../util/conditionalMap');
const siteData = require('../../../../data/publicSiteData.json');

const thisYear = new Date().getFullYear();

const socials = [
  ['/assets/images/ig.png', 'Instagram', siteData.instagram, styles.instagram],
  ['/assets/images/fb.png', 'Facebook', siteData.facebook, styles.facebook],
  ['/assets/images/email.png', 'Email', `mailto:customerservice@${siteData.emailBase}`, styles.email],
];
const renderSocial = () => {
  return socials.map(([src, label, href, className], index) => (
    <a key={index} href={href}>
      <span className="sr-only">{label}</span>
      <img className={className} src={src} alt=""/>
    </a>
  ));
};

const Footer = ({ req }) => {
  const appSchema = req.context.appSchema;
  return (
    <div className={styles.footer}>
      <div className={styles.social}>
        {renderSocial()}
      </div>
      <nav className={styles.footerPrimaryNav}>
        {conditionalMap(appSchema.pages, (page, none, index) => {
          if (page.footerLink) {
            return (
              <a
                key={index}
                href={page.path}
              >
                {page.label || page.path}
              </a>
            );
          }
          return none;
        })}
      </nav>
      <div className={styles.copyright}>
        &copy; 2011-{thisYear} EssenceOfArgan.com &mdash; All Rights Reserved.
      </div>
    </div>
  );
};
module.exports = Footer;
