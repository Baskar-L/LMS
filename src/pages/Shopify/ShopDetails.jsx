import { useEffect, useState } from "react";

import AppLayout from "../../components/Layout/AppLayout";



import {
  getShopDetails,
  getCustomers,
  getProducts,
} from "../../api/shopifyApi";

const ShopDetails = () => {


  const [shop, setShop] =
    useState(null);

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        shopRes,
        customerRes,
        productRes,
      ] = await Promise.all([
        getShopDetails(),
        getCustomers(),
        getProducts(),
      ]);

      setShop(
        shopRes.data.data.shop
      );

      setCustomers(
        customerRes.data.data
          ?.customers?.edges || []
      );

      setProducts(
        productRes.data.data
          ?.products?.edges || []
      );
    } catch (error) {
      console.error(error);
    } 
  };



  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Shop Information */}

        <div className="page-container">
          <h1 className="page-title">
            Shopify Store Information
          </h1>

          {shop && (
            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Store Name
                </p>

                <h3 className="font-semibold text-lg">
                  {shop.name}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Store Email
                </p>

                <h3 className="font-semibold">
                  {shop.email}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Currency
                </p>

                <h3 className="font-semibold">
                  {shop.currencyCode}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Plan
                </p>

                <h3 className="font-semibold">
                  {
                    shop.plan
                      ?.displayName
                  }
                </h3>
              </div>

            </div>
          )}
        </div>

        {/* Customers */}

        <div className="page-container">
          <h2 className="text-xl font-semibold mb-4">
            Customers
          </h2>

          <div className="table-wrapper">
            <table className="common-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">
                    Name
                  </th>

                  <th className="table-th">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.map(
                  ({ node }) => (
                    <tr
                      key={node.id}
                      className="table-row"
                    >
                      <td className="table-td">
                        {node.firstName}{" "}
                        {
                          node.lastName
                        }
                      </td>

                      <td className="table-td">
                        {node.email}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products */}

        <div className="page-container">
          <h2 className="text-xl font-semibold mb-4">
            Products
          </h2>

          <div className="table-wrapper">
            <table className="common-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">
                    Product
                  </th>

                  <th className="table-th">
                    Handle
                  </th>

                  <th className="table-th">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  ({ node }) => (
                    <tr
                      key={node.id}
                      className="table-row"
                    >
                      <td className="table-td">
                        {node.title}
                      </td>

                      <td className="table-td">
                        {node.handle}
                      </td>

                      <td className="table-td">
                        {node.status}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default ShopDetails;