'use strict';
const staticProducts = require('../../data/products.json');

const [
    hairCareProducts,
    skinCareProducts,
    cosmeticsProducts,
    culinaryProducts,
] = [
    'Hair Care',
    'Skin Care',
    'Cosmetics',
    'Culinary',
].map(category => staticProducts.find(p => p.category === category).products);

const allProducts = staticProducts
    .reduce((result, { products }) => result.concat(products), []);

const getSingleProduct = (productId) => {
    const {
        category,
        generalAbout,
        suggestions,
        products,
    } = staticProducts
        .find(({ products }) => products.map(({ id }) => id).includes(productId));

    const { name, price, desc } = products.find(({ id }) => id === productId);

    const product = {
        id: productId,
        name,
        price,
        subscriptionPrice: (price * 0.66).toFixed(2),
        desc,
        images: [
        productId,
        productId,
        productId,
        ],
    };
    const meta = { category, generalAbout, suggestions };

    return { product, meta };
};

module.exports = {
    hairCareProducts,
    skinCareProducts,
    cosmeticsProducts,
    culinaryProducts,
    allProducts,
    getSingleProduct,
};