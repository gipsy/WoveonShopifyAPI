module.exports = `
    {
        shop {
            name
            products(first: 250) {
                edges {
                    node {
                        id
                        title
                        description
                        createdAt
                        handle
                        onlineStoreUrl
                        productType
                        publishedAt
                        updatedAt
                        vendor
                        images(first: 10) {
                            edges {
                              node {
                                src
                                altText
                              }
                            }
                        }
                        variants(first: 10) {
                            edges {
                              node {
                                id
                                price
                              }
                            }
                        }
                    }
                }
            }
        }
    }
`;
