import { Link } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


function Cart({cartItems,setCartItems}) {
    const [complete, setComplete] = useState(false);

    function removeItem(item){
        const updatedItems = cartItems.filter((i) => {
            if(i.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItems)

  



       

 }
 async function placeOrderHandler() {
    try {
        const response = await axios.post(
            `${BASE_URL}/order`,
            cartItems,
            { headers: { 'Content-Type': 'application/json' } }
        );
        
        // Assuming the response is successful, update the state
        setCartItems([]);
        setComplete(true);
    } catch (error) {
        console.error('Error placing order:', error);
        // Optionally, handle errors or show an error message to the user
    }
}
  return ( cartItems.length>0 ?
   <>
        <div className="container container-fluid ">
        <h2 className="mt-60 " style={{ color:"blue" ,fontSize:"large"}}>Your Cart: <b>{cartItems.length}</b></h2>
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {cartItems.map((item) =>
                (<>
                      <hr />
                     <div className="cart-item">
                    <div className="row">
                    <div className="col-4 col-lg-3">
                            <img src={item.product.image[0]} alt={item.product.name} height="500" width="500" />

                        </div> 

                        <div className="col-5 col-lg-3">
                        <Link to ={"/product/"+item.product._id}>{item.product.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.product.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <label>qty:</label>
                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

								
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i onClick={()=>{removeItem(item)}} id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                        </div>

                    </div>
                     </div>
                </>))
}
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h2>Order Summary</h2>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item)=> (acc + item.qty), 0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${Number(cartItems.reduce((acc,item)=> (acc + item.product.price * item.qty), 0)).toFixed(2)}</span></p>
    
                    <hr />
                    <button onClick={placeOrderHandler} id="checkout_btn" className="btn btn-primary py-0 p-4px  btn-block">Place Order</button>
                </div>
            </div>
        </div>
        </div>
  </> : (!complete ?<h1 className="mt-80" style={{textAlign:"center", fontSize:"xx-large"}}>your cart is empty</h1>
  : <div className="mt-60">
  <h1 className='mt-10' style={{textAlign:"center"}}>Order Completed!</h1>
  <p style={{color:"green", fontSize:"large", textAlign:"center"}}>Your order has been placed succesfully.</p>
</div>)
   
  )
}

export default Cart
