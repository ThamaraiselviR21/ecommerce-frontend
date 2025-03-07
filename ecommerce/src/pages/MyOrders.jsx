import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;  // This is fine if set correctly in .env

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      console.log('🟢 Sending Token:', token);

      try {
        const response = await axios.get(`http://localhost:9589/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("📦 Orders Response:", response.data);  // Debugging the response
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('❌ API Error:', error.response?.data?.message || error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length > 0 ? (
    orders.map(order => (
        <div key={order._id}>
            <p>Order Amount: {order.amount}</p>
            <p>Status: {order.status}</p>
            <p>Products:</p>
            <ul>
                {order.cart.map((item, index) => (
                    <li key={index}>
                        <p>Product Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    ))
) : (
    <p>No Orders Found.</p>
)}

    </div>
  );
}
