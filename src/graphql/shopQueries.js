export const GET_SHOP_DETAILS = `
query {
  shop {
    id
    name
    email
    myshopifyDomain
    currencyCode

    billingAddress {
      city
      country
      phone
      zip
    }

    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }

    primaryDomain {
      host
      url
    }

    createdAt
  }
}
`;

export const GET_CUSTOMERS = `
query {
  customers(first: 20) {
    nodes {
      id
      firstName
      lastName
      email
    }
  }
}
`;

export const GET_PRODUCTS = `
query {
  products(first: 20) {
    nodes {
      id
      title
      handle
      status
    }
  }
}
`;