'use strict';
const React = require('react');
const styles = require('./landing.scss');
const siteData = require('../../../../data/publicSiteData.json');
const FloatedCallout = require('../components/FloatedCallout');

const typedCtas = [
  {
    title: 'Skincare, Simplified',
    body: 'All of our products are designed to revitalize and regenerate the skin’s surface for an immediate boost and lasting results.',
    path: '/skin-care',
    linkLabel: 'Shop Skin',
    image: '/assets/images/landing/iStock-hands.jpg',
  },
  {
    title: 'Haircare, Elevated',
    body: 'Our collection of Argan Oil-infused treatments will refine and replenish hair with a natural richness.',
    path: '/hair-care',
    linkLabel: 'Shop Hair',
    image: '/assets/images/landing/iStock-hair.jpg',
  },
  {
    title: 'Beauty, Redefined',
    body: 'From lip color to mascara, our cosmetics are formulated with hydrating and nourishing ingredients.',
    path: '/cosmetics',
    linkLabel: 'Shop Beauty',
    image: '/assets/images/landing/iStock-color.jpg',
  },
  {
    title: 'Cuisine, Enhanced',
    body: 'With an abundance of flavor and a host of health benefits, culinary Argan Oil enhances foods with a toasted, nutty flavor.',
    path: '/culinary',
    linkLabel: 'Shop Culinary',
    image: '/assets/images/landing/iStock-plate.jpg',
  },
];

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.jumbo}/>
      <div className={styles.mainCtaBox}>
        <h1>Essence of Argan</h1>
        <h2>Ancient ritual. Pure beauty. Organic health.</h2>
        <p>The essence of youth, health and beauty. With naturally occurring vitamins and essential acids, Argan Oil offers an effective, holistic approach to wellness.</p>
        <a
          href="/skin-care"
          className={styles.ctaLinkButton}
        >
          <span
            className={styles.fullSizeOnly}
          >
            Shop Argan Oil
          </span>
          <span
            className={styles.mobileOnly}
          >
            Shop Now
          </span>
        </a>
      </div>
      {typedCtas.map(typedCta => <FloatedCallout {...typedCta} />)}
      <p
        className={styles.callout}
      >
        The foremost cultivator of organic ethically sourced Argan Oil in the United States.
      </p>
      <div
        className={styles.bannerImage}
      >
        <img src="/assets/images/landing/ECO_LOGO.png" alt="Eco Cert"/>
      </div>
      <div
        className={styles.contactCtas}
      >
        <div className={styles.socialLinks}>
          <h3>Follow Us</h3>
          <a
            className={styles.instagramAtLink}
            href={siteData.instagram}
          >
            @essenceofarganoil
          </a>
          <div>
            <a
              href={siteData.instagram}
            >
              <span className="sr-only">Instagram</span>
              <img className={styles.instagram} src="/assets/images/ig.png" alt=""/>
            </a>
            <a
              href={siteData.facebook}
            >
              <span className="sr-only">Facebook</span>
              <img className={styles.facebook} src="/assets/images/fb.png" alt=""/>
            </a>
          </div>
        </div>
        <div
          className={styles.emailSubscribe}
        >
          <h3>Stay in touch</h3>
          <form action="/subscribe" method="POST">
            <label htmlFor="subscribe_field_email" >Sign up to recieve updates and exclusive offers</label>
            <input type="email" name="email" id="subscribe_field_email" />
          </form>
        </div>
      </div>
    </div>
  );
};
Landing.propTypes = {};
module.exports = Landing;
