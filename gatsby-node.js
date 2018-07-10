const _ = require(`lodash`);
const path = require('path');
const slash = require(`slash`);
const download = require('image-downloader');

exports.onCreateNode = ({node, boundActionCreators}) => {
  const {createNodeField} = boundActionCreators;

  if (node.internal.type === 'products') {
    download
      .image({
        url: node.images.edges[0].node.src,
        dest: `src/images/${node.handle}.jpg`
      })
      .then(({filename, image}) => {
        createNodeField({node, name: 'localImage', value: filename});
      })
      .catch(err => {
        throw err;
      });
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allProducts {
          edges {
            node {
              handle
            }
          }
        }
      }
    `).then(result => {

      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      };

      // Create product pages
      const pageTemplate = path.resolve(`./src/templates/product.js`);
      result.data.allProducts.edges.map(({node}) => {
        createPage({
          path: `products/${node.handle}`,
          component: slash(pageTemplate),
          context: {
            handle: node.handle,
            imageRegEx: `/${node.handle}/`
          }
        });
      });

      resolve();
    });
  });
};

// TODO: Create reusable helper (also defined in index.js)
function createHandleForTitle(title) {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
