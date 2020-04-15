'use strict';
const React = require('react');
// const PropTypes = require('prop-types');
const styles = require('./contact.scss');
const siteData = require('../../../../data/publicSiteData.json');

const Contact = () => {
  return (
    <div className={styles.contact}>
      <h1 className={styles.pageTitle}>Contact Us</h1>
      <div>
        <h2>Customer Care</h2>
        <p>
          If you have questions, please email us at <a href={`mailto:customerservice@${siteData.emailBase}`}>customerservice@{siteData.emailBase}</a> or
          call us toll-free at <a href={`tel:${siteData.phone.canada}`}>{siteData.phone.canada}</a> (USA and Canada). Essence of Argan customer
          service is open 24 hours a day, seven days a week, Monday through Saturday.
        </p>
      </div>
      <div>
        <h2>Contact Numbers</h2>
        <dl className={styles.phoneList}>
          <dt>USA:</dt>
          <dd>{siteData.phone.usa}</dd>
          <dt>Canada:</dt>
          <dd>{siteData.phone.canada}</dd>
          <dt>United Kingdom:</dt>
          <dd>{siteData.phone.uk}</dd>
          <dt>Ireland:</dt>
          <dd>{siteData.phone.ireland}</dd>
          <dt>Belgium:</dt>
          <dd>{siteData.phone.belgium}</dd>
          <dt>Australia:</dt>
          <dd>{siteData.phone.australia}</dd>
          <dt>New Zealand:</dt>
          <dd>{siteData.phone.nz}</dd>
        </dl>
      </div>
      <div>
        <h2>Return Addresses</h2>
        <div className={styles.returnAddresses}>
          {siteData.addresses.map(({ name, address }) => {
            return (
              <div className={styles.returnAddress}>
                <h3>{name}</h3>
                <p>{address}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>Wholesale</h2>
        <p>For wholesale inquiries, please contact us at <a href={`retail@${siteData.emailBase}`}>retail@{siteData.emailBase}</a></p>
        <div className={styles.badges}>
          <img src="/assets/images/contact/footer_img_bottom.png" alt="100% Satifaction Guaranteed Badge"/>
          <img src="/assets/images/contact/guaranteed_img.png" alt="100% Customer Satifaction Guaranteed Badge"/>
          <img src="/assets/images/contact/ssl_footer.png" alt="Secure SSL Transaction Badge"/>
        </div>
      </div>
    </div>
  );
};
Contact.propTypes = {};
module.exports = Contact;
