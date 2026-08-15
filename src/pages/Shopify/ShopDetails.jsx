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
          <div className="flex items-center justify-between mb-5">

            <div>
              <h1 className="page-title">
                Shopify Store Information
              </h1>

              <p className="text-gray-500 text-sm">
                Connected Shopify Store Details
              </p>
            </div>

          </div>

          {shop && (
            <div className="grid md:grid-cols-3 gap-5 mt-5">

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
                  Domain
                </p>

                <h3 className="font-semibold">
                  {shop.myshopifyDomain}
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
                  {shop.plan?.displayName}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Store URL
                </p>

                <h3 className="font-semibold break-all">
                  {shop.primaryDomain?.url}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Country
                </p>

                <h3 className="font-semibold">
                  {shop.billingAddress?.country}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  City
                </p>

                <h3 className="font-semibold">
                  {shop.billingAddress?.city}
                </h3>
              </div>


              <div>
                <p className="text-gray-500 text-sm">
                  Phone
                </p>

                <h3 className="font-semibold">
                  {shop.billingAddress?.phone || "-"}
                </h3>
              </div>


              <div>
                <p className="text-gray-500 text-sm">
                  Store Created
                </p>

                <h3 className="font-semibold">
                  {new Date(
                    shop.createdAt
                  ).toLocaleDateString()}
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
                  <th className="table-th">Name</th>
                  <th className="table-th">Email</th>
                  <th className="table-th">Phone</th>
                  <th className="table-th">Orders</th>
                  <th className="table-th">Spent</th>
                  <th className="table-th">Created</th>
                </tr>
              </thead>

              <tbody>
                {customers?.length > 0 ? (
                  customers.map(({ node }) => (
                    <tr
                      key={node.id}
                      className="table-row"
                    >
                      <td className="table-td">
                        {node.firstName} {node.lastName}
                      </td>

                      <td className="table-td">
                        {node.email || "-"}
                      </td>

                      <td className="table-td">
                        {node.phone || "-"}
                      </td>

                      <td className="table-td">
                        {node.numberOfOrders}
                      </td>

                      <td className="table-td">
                        {node.amountSpent?.amount}{" "}
                        {
                          node.amountSpent
                            ?.currencyCode
                        }
                      </td>

                      <td className="table-td">
                        {new Date(
                          node.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8"
                    >
                      No Customers Found
                    </td>
                  </tr>
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
                  <th className="table-th">Product</th>
                  <th className="table-th">Handle</th>
                  <th className="table-th">Vendor</th>
                  <th className="table-th">Type</th>
                  <th className="table-th">Inventory</th>
                  <th className="table-th">Status</th>
                  <th className="table-th">Created</th>
                </tr>
              </thead>

              <tbody>
                {products?.length > 0 ? (
                  products.map(({ node }) => (
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
                        {node.vendor}
                      </td>

                      <td className="table-td">
                        {node.productType || "-"}
                      </td>

                      <td className="table-td">
                        {node.totalInventory}
                      </td>

                      <td className="table-td">
                        <span
                          className={
                            node.status ===
                              "ACTIVE"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {node.status}
                        </span>
                      </td>

                      <td className="table-td">
                        {new Date(
                          node.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-8"
                    >
                      No Products Found
                    </td>
                  </tr>
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