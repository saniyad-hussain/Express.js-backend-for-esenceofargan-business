'use strict';

const appSchema = {
  title: 'Essence of Argan',
  subTitle: null,
  rootPath: '/',
  pages: [
    {
      path: '/',
      label: 'Landing',
      route: require('./Landing'),
    },
    {
      primary: true,
      path: '/our-story',
      label: 'Our Story',
      route: require('./OurStory'),
    },
    {
      primary: true,
      path: '/contact',
      label: 'Contact',
      route: require('./Contact'),
    },
    {
      shopLink: true,
      path: '/skin-care',
      label: 'Skin Care',
      route: require('./Shop/SkinCare'),
    },
    {
      shopLink: true,
      path: '/hair-care',
      label: 'Hair Care',
      route: require('./Shop/HairCare'),
    },
    {
      shopLink: true,
      path: '/cosmetics',
      label: 'Cosmetics',
      route: require('./Shop/Cosmetics'),
    },
    {
      shopLink: true,
      path: '/culinary',
      label: 'Culinary',
      route: require('./Shop/Culinary'),
    },
    {
      shopLink: true,
      path: '/all-products',
      label: 'View All',
      route: require('./Shop/AllProducts'),
    },
    {
      path: '/product/:productId',
      route: require('./SingleProduct'),
    },
    {
      footerLink: true,
      path: '/contact-us',
      label: 'Contact Us',
    },
    {
      footerLink: true,
      path: '/delivery-information',
      label: 'Delivery Information',
    },
    {
      footerLink: true,
      path: '/privacy-policy',
      label: 'Privacy Policy',
    },
    {
      footerLink: true,
      path: '/terms-and-conditions',
      label: 'Terms and Conditions',
    },
    {
      footerLink: true,
      path: 'https://arganbeautybox.com',
      label: 'Beauty Box',
    },
    // Uncomment this to test the 404 page.
    // {
    //   primary: true,
    //   label: '404',
    //   path: '/not-found',
    // },
  ],
  notFoundPage: {
    route: require('./404'),
  },
};

// Uncomment this to render the example page.
// if (process.env.NODE_ENV === 'development') {
//   appSchema.pages = [{
//     primary: true,
//     path: '/example-page',
//     label: 'Example Page',
//     route: require('./Home.example.js'),
//   }, ...appSchema.pages];
// }

module.exports = appSchema;
