export const GET_SHOP_DETAILS = `
query {
  shop {
    name
    email
    myshopifyDomain
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