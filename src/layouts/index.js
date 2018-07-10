import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Typography from 'typography';
import Client from 'shopify-buy';
require('typeface-eczar');
require('typeface-work-sans');

const shopifyClient = Client.buildClient({
  domain: 'woveon.myshopify.com',
  storefrontAccessToken: 'cae1b1cc7183b5101ceb4a0ea6cd23eb'
});

const typography = new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.666,
  headerFontFamily: ['eczar'],
  bodyFontFamily: ['work sans']
});

typography.injectStyles();

import './reset.css';
import styles from './index.module.css';

const Header = () => (
  <div className={styles.header}>
    <h1 className={styles.logo}>
      <Link to="/">Woveon Test Shop</Link>
    </h1>

    <ul className={styles.headerLinks}>
      <Link to="/products">Products</Link>
    </ul>
  </div>
);

const Footer = () => (
  <footer className={styles.footer}><a href="https://github.com/gipsy/WoveonShopifyAPI">View project on Github</a></footer>
);

const TemplateWrapper = ({children, data, ...props}) => (
  <div>
    <Helmet
      title="Woveon Test Store"
      meta={[
        {name: 'description', content: 'Sample'},
        {name: 'keywords', content: 'sample, something'}
      ]}
    />
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        {React.cloneElement(children({...props, shopifyClient}))}
      </div>
      <Footer />
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
