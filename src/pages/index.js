import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import styles from './index.module.css';

const IndexPage = ({data}) => (
  <div className="index-page">
    <div className={styles.hero}>
      <Img
        resolutions={data.heroImage.resolutions}
        className={styles.heroImage}
        alt="Gatsby Store"
      />
      <div className={styles.heroOverlay}>
        <p>The best electronic sells in 2018</p>
      </div>
    </div>

    <div className={styles.topSellers}>
      <h2>Top Sellers</h2>
      <ul>
        {data.allProducts.edges.map(({node}) => {
          const imageForProduct = getProductImage(
            node.handle,
            data.productImages
          );

          return (
            <li key={node.id}>
              <Img
                resolutions={imageForProduct.node.resolutions}
                className={styles.productImage}
              />
              <span className={styles.productName}>{node.title}</span>
              <Link
                className={styles.viewProduct}
                to={`/products/${node.handle}`}
              >
                View
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

function getProductImage(handle, images) {
  return images.edges.find(img => {
    return img.node.id.includes(handle);
  });
}

function createHandleForTitle(title) {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export const query = graphql`
  query allProducts {
    productImages: allImageSharp {
      edges {
        node {
          id
          resolutions(width: 300, height: 300) {
            ...GatsbyImageSharpResolutions_tracedSVG
          }
        }
      }
    }
    heroImage: imageSharp(id: {regex: "/bg/"}) {
      resolutions(width: 999, height: 450) {
        ...GatsbyImageSharpResolutions_tracedSVG
      }
    }
    allProducts {
      edges {
        node {
          id
          title
          handle
          images {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
