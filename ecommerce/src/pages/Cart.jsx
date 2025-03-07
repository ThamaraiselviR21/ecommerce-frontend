import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { motion } from 'framer-motion';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        address: '',
        deliveryAddress: '',
        pincode: '',
        phone: ''
    });

    const [placedOrder, setPlacedOrder] = useState(null); // Store order details after placing order

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
        setCartItems(updatedItems);
    }

    const handleInputChange = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value
        });
    };

    async function submitOrderHandler() {
        for (const key in orderDetails) {
            if (orderDetails[key].trim() === "") {
                alert(`Please fill out the ${key} field.`);
                return;  // Stop form submission if validation fails
            }
        }
      
    
        try {
            const response = await axios.post(
                `${BASE_URL}/order`,
                cartItems,  // Directly sending cartItems array
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            setPlacedOrder({ items: cartItems, customerDetails: orderDetails });  // Keep customer details only for frontend display
            setCartItems([]);
            setComplete(true);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    }
    

    return (
        <div className="container container-fluid">
    
            {/* Show Order Confirmation if order is complete */}
            {complete && placedOrder ? (
                <div className=" mt-5 pt-10">
                    <div className="p-3 ">
                    <h1 className="text-center">Order Confirmation</h1>
                    <p className="text-success text-center">Your order has been placed successfully!</p>
    
                    <div className="order-details ">
                        <h3 className="font-mono text-2xl ">Customer Details</h3>
                        <p><strong>Name:</strong> {placedOrder.customerDetails.name}</p>
                        <p><strong>Billing Address:</strong> {placedOrder.customerDetails.address}</p>
                        <p><strong>Delivery Address:</strong> {placedOrder.customerDetails.deliveryAddress}</p>
                        <p><strong>Pincode:</strong> {placedOrder.customerDetails.pincode}</p>
                        <p><strong>Phone:</strong> {placedOrder.customerDetails.phone}</p>
    
                        <h3 className="font-mono text-2xl mt-2">Ordered Products</h3>
                        <table className="table table-bordered border-2 ">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placedOrder.items.map((item) => (
                                    <tr key={item.product._id}>
                                        <td>{item.product.name}</td>
                                        <td>{item.qty}</td>
                                        <td>${item.product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
    
                        <h4 className="font-mono text-center text-2xl text-info">
                            Total Amount: <strong>${Number(placedOrder.items.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2)}</strong>
                        </h4>
                    </div>
                    </div>
                </div>
            ) : showOrderForm ? (
                // Show Order Form
                <motion.div initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="flex justify-center items-center   " >
                    <div className="mt-40 pt-1">
                <div className="order-form  bg-gray-800 p-10 rounded-2xl shadow-xl w-full    max-w-md border-2 border-pink-500 transition-all hover:shadow-pink-400 ">
                    <h1>Order Details</h1>
                    <div className="form-group">
                        <label className="text-white italic ">Name:</label>
                        <input type="text" name="name" value={orderDetails.name} onChange={handleInputChange} className="form-control w-full  py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all" required />
                    </div>
    
                    <div className="form-group">
                        <label className="text-white italic ">Address (Billing):</label>
                        <input type="text" name="address" value={orderDetails.address} onChange={handleInputChange} className="form-control w-full  py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all" required />
                    </div>
                    <div className="form-group">
                        <label className="text-white italic ">Pincode:</label>
                        <input type="text" className="form-control w-full  py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all" name="pincode" value={orderDetails.pincode} onChange={handleInputChange}  required />
                    </div>
    
                    <div className="form-group">
                        <label className="text-white italic ">Phone No:</label>
                        <input type="text" className="form-control w-full  py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all"
  name="phone" value={orderDetails.phone} onChange={handleInputChange}  required />
                    </div>
                    <div className="form-group">
                        <label className="text-white italic ">Delivery Address:</label>
                        <textarea name="deliveryAddress" value={orderDetails.deliveryAddress} onChange={handleInputChange} className="form-control w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all" required />
                    </div>
                    <button onClick={submitOrderHandler} className="btn  mt-3 w-full py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-all disabled:bg-gray-600 ">Submit Order</button>
                </div>
                </div>
                </motion.div>
            ) : cartItems.length > 0 ? (
                // Show Cart
                <>
                    <h2 className="mt-60" style={{ color: "blue", fontSize: "large" }}>
                        Your Cart: <b>{cartItems.length}</b>
                    </h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map((item) => (
                                <div key={item.product._id}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.product.image[0]} alt={item.product.name} height="500" width="500" />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.product.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <label>Qty:</label>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i onClick={() => removeItem(item)} id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
    
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h2>Order Summary</h2>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2)}</span></p>
                                <hr />
                                <button onClick={() => setShowOrderForm(true)} id="checkout_btn" className="btn btn-primary py-0 p-4px btn-block">Place Order</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Cart is Empty
                <h1 className="mt-80" style={{ textAlign: "center", fontSize: "xx-large" }}>Your cart is empty</h1>
            )}
        </div>
    );
    
}

export default Cart;
