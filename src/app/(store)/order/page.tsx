"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Clerk hook for user data
import Link from "next/link";

interface Product {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderDate: string;
  customerName: string;
  orderNumber: string;
  email: string;
  status: string;
  products: Product[];
}

const OrdersPage = () => {
  const { user } = useUser(); // Fetch user information from Clerk
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.emailAddresses?.[0]?.emailAddress) {
        console.error("User email not available");
        setLoading(false);
        return;
      }

      const userEmail = user.emailAddresses[0].emailAddress;

      const query = `*[_type == "order" && email == "${userEmail}"] | order(orderDate desc) {
        _id,
        orderNumber,
        orderDate,
        customerName,
        email,
        status,
        products[] {
          quantity,
          product->{
            name,
            price
          }
        }
      }`;

      try {
        const data = await client.fetch<Order[]>(query);
        console.log("Fetched orders:", data); // Check the fetched data
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.emailAddresses?.[0]?.emailAddress]); // Ensure email is correctly fetched

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-6">Your Orders</h1>

        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No orders found.</div>
        ) : (
          <ul className="space-y-4 md:space-y-6">
            {orders.map((order) => (
              <li key={order._id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <div className="flex flex-col space-y-2 md:space-y-4">
                  <p className="text-lg md:text-xl font-semibold text-gray-700">
                    <strong>Order Number:</strong> {order.orderNumber}
                    {order.status === "paid" && (
                      <span className="ml-2 bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">Paid</span>
                    )}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-md md:text-lg text-gray-600">
                    <strong>Customer:</strong> {order.customerName}
                  </p>
                  <p className="text-md md:text-lg text-gray-600">
                    <strong>Email:</strong> {order.email}
                  </p>
                  <div>
                    <strong className="text-md md:text-lg text-gray-700">Products:</strong>
                    {order.products?.length > 0 ? (
                      <ul className="mt-2 md:mt-4 space-y-2">
                        {order.products.map((product, index) => (
                          <li
                            key={index}
                            className="flex flex-col space-y-1 md:space-y-2 bg-gray-50 p-3 md:p-4 rounded-lg shadow-sm"
                          >
                            <p className="text-md md:text-lg font-medium text-gray-800">
                              <strong>Product:</strong> {product.product?.name || "No name"}
                            </p>
                            <p className="text-gray-600">
                              <strong>Quantity:</strong> {product.quantity}
                            </p>
                            <p className="text-gray-600">
                              <strong>Price:</strong> {product.product?.price} PKR
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No products available</p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <Link
                      href="/genrate-tracking"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Generate Tracking Number!
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
