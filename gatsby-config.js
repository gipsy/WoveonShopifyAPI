module.exports = {
  siteMetadata: {
    title: `Woveon Shopify API Test`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-shopify`,
      options: {
        storeName: 'woveon',
        accessToken: 'cae1b1cc7183b5101ceb4a0ea6cd23eb'
      }
    }
  ]
};
