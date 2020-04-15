'use strict';
const React = require('react');
// const PropTypes = require('prop-types');
const styles = require('./our-story.scss');
const FloatedCallout = require('../components/FloatedCallout');

const callouts = [
  {
    title: 'The Oil',
    body: 'Essence of Argan is the world’s largest provider of certified organic Argan Oil, an ancient, all-natural health and beauty product. Derived from the nuts of the Argan Tree, we source the highest quality oil, offering a holistic approach to skincare, haircare, beauty and cuisine.',
    path: '/skin-care',
    linkLabel: 'Shop Now',
    image: '/assets/images/our-story/oil.jpg',
  },
  {
    title: 'The Benefits',
    body: 'Commonly referred to as “Liquid Gold,” Argan Oil is rich in omegas 3, 6 and 9, plus Vitamins A and E. It is a powerfully hydrating, anti-inflammatory and antioxidant treatment for skin, hair and digestion.',
    image: '/assets/images/our-story/the-benefits_860.jpg',
  },
  {
    title: 'Ethically Minded',
    body: 'When you purchase Essence of Argan, you are helping to support a women\'s cooperative in Morocco that works to keep the Argan trees thriving on protected land. Over three million people in Southern Morocco receive a fair wage through the cultivation and sales of Argan Oil.',
    image: '/assets/images/our-story/ethically-minded_860.jpg',
  },
];

const usages = [
  'Wrinkles',
  'Aging',
  'Acne',
  'Dry Skin',
  'Hair Treatment',
  'Dry Scalp',
  'Hair Growth',
  'Hand and Nails',
  'Stretch Marks',
  'Diaper Rash',
  'Cracked Feet',
  'Eczema',
  'Psoriasis',
  'Baths',
];

const OurStory = () => {
  return (
    <div className={styles.ourStory}>
      <h1 className={styles.pageTitle}>Our Story</h1>
      <div className={styles.callouts}>
        {callouts.map(callout => <FloatedCallout reverse {...callout} />)}
      </div>
      <div className={styles.jumboImage} />
      <div className={styles.visionContainer}>
        <h2>Our Vision</h2>
        <p>
          Essence of Argan was founded in 2011 with five liters of Argan Oil. Today, we are the largest provider of eco-certified Argan Oil in the world. Using only the highest quality oil, we have evolved step-by-step with the support of our customers. From day one, it has been our mission to share the ancient health and beauty benefits of natural Argan Oil. Essence of Argan is 100% pure, organic, ethically-sourced Moroccan Argan Oil, extracted from the kernels of fruits from the Argan Tree, indigenous to southern Morocco.
        </p>
      </div>
      <div className={styles.callout}>
        Ancient ritual. Pure beauty. Organic health.
      </div>
      <div className={styles.usages}>
        <div className={styles.imageWrap}>
          <img src="/assets/images/our-story/usages.jpg" alt=""/>
        </div>
        <div>
          <h3>Essence Of Argan can be used for:</h3>
          <ul>
            {usages.map(usage => <li>{usage}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
OurStory.propTypes = {};
module.exports = OurStory;
