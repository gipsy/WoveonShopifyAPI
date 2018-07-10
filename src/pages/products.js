import React from "react";
import Link from "gatsby-link";

const ProductIndex = ({ data }) => {
  console.log(data)
  return (<ul style={{ margin: 0 }}>
    {data.allProducts.edges.map(({ node }, i) => (
      <li key={i}>
        {node.title} <Link to={`/products/${node.handle}`}>View</Link>
      </li>
    ))}
  </ul>)
};

export const query = graphql`
  query productIndex {
    allProducts {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export default ProductIndex;
