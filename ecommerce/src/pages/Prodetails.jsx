import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


function Prodetails({cartItems,setCartItems}) {
    const[product,setProduct]=useState(null);
    const[qty,setqty]=useState(1)
    const {id}=useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/product/`+id);
                setProduct(res.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    },[]);
    function addtoCart(){
        const itemExist=cartItems.find((item)=>item.product._id == product._id);
        if(!itemExist){
        const newItems={product,qty};
        setCartItems((state)=>[...state,newItems]);
        toast.success("Cart Item added succesfully!")

        }
    }


    function increaseQty() {
        if (product.stock == qty) {
            return;
        }
        setqty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setqty((state) => state - 1);
        }
    }
   

    return ( product && <div className="container container-fluid" >
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    {product.image && product.image.length > 0 && (
                        <img src={product.image[0]} alt={product.name} height="500" width="500" />
                    )}
                    </div>
                  

                    <div className="col-12 col-lg-5 mt-5">
                        <h2>{product.name}</h2>
                        <p id="product_id">{product._id}</p>

                        <hr/>

                            <div className="rating-outer">
                                <div className="rating-inner"></div>
                            </div>


                            <hr/>

                                <p id="product_price">{product.price}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus py-0 "  onClick={decreaseQty}>-</span>

                                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                                    <span className="btn btn-primary plus py-0"  onClick={increaseQty}>+</span>
                                </div>
                                <button type="button" onClick={addtoCart} disabled={product.stock=0} id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                                <hr/>

                                {/* <p>Status: <span id="stock_status" className={product.stock > 0 ?'text-success':'text-danger'}>{product.stock > 0  ?'In Stock' : 'Out of Stock'}</span></p> */}

                                    <hr/>

                                        <h4 className="mt-2">Description:</h4>
                                        <p>{product.description}</p>
                                        <hr/>
                                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                            <div className="rating w-50"></div>

                    </div>

                 </div>

            </div>


       
    )
}

                            export default Prodetails
