import Productsitems from "../components/Productsitems"
import { useState,useEffect } from "react";
import axios from 'axios';
import { useSearchParams} from "react-router-dom";
import Front from "../components/Front";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {

    const [product, setProduct] = useState([]);
    const [searchParams,setSearchParams]= useSearchParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/product/getpro?`+searchParams);
                setProduct(res.data.products);
                setLoading(false);  
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);  
            }
        };
    
        fetchProducts();
    }, [searchParams]);
    

  return (
    <>
    <Front/>
    <h1 id="products_heading" className="" style={{textAlign:"center"}}>Explore Our Products</h1>
    
    <section id="products" className="container mt-5" >
    {loading ? (  
    <h2 className="text-pink-700 italic text-center text-3xl border-2 border-gray-900 p-5" style={{ textAlign: "center" }}>Loading...</h2>  
  ) : (  
      <div className="row" >
     {product.map((product, index) => (
  <Productsitems key={index} product={product} />
    ))}
   </div>
  )}
    </section>
    <div className="bg-gray-500 rounded-2xl m-2"id="aboutus"  >
      <h1 className="text-center p-2" >About Us</h1>
       <h4 className="px-5 text-white tracking-wide italic text-xl">Welcome to <b className="text-pink-500">LOTUS TRENDS</b>, your one-stop destination for high-quality products and a seamless online shopping experience.We started with a simple goal — to provide our customers with the best products at affordable prices, delivered right to their doorstep. From trendy fashion and accessories to daily essentials, we carefully curate our collections to meet your needs and keep up with the latest styles.</h4><br/>
       
       <h3 className=" text-pink-700 text-center text-xl ">Why choose us?</h3>
       <div className="flex flex-col m-2">
       <h4 className="  text-center text-justify p-2 font-mono "><b className="text-black">Quality Products : </b>We believe in offering only the best.</h4>
       <h4 className="  text-center p-2 font-mono " ><b className="text-black">Customer Satisfaction : </b>Your happiness is our priority.</h4>
       <h4 className="  text-center p-2 font-mono"><b className="text-black">Secure Shopping : </b>Shop with confidence through our safe and trusted platform.</h4>
       <h4 className=" text-center p-2 font-mono"><b className="text-black" >Fast Delivery : </b>Get your orders quickly and on time.</h4><br/>
       </div>
       <h4 className=" px-5 text-white tracking-wide italic text-xl">Thank you for choosing <b className="text-pink-500">LOTUS TRENDS</b>. We’re excited to be a part of your shopping journey and look forward to serving you! <br/>For any questions, feel free to contact us. We're always here to help.</h4>
    </div>
    <div className="bg-gray-500 rounded-2xl m-2  " id="contactus">
      <h1 className="text-center p-2" >Contact Us</h1>
      <h4 className="px-5 text-white tracking-wide italic text-xl">We’re always happy to help! If you have any questions, suggestions, or need support with your order, feel free to reach out. Our team will get back to you as soon as possible.</h4>
      <h2 className="font-mono text-3xl text-center text-black">Contact Details:</h2>
      <div className=" m-2 text-center py-3">
        <h3 className="font-mono text-2xl"><i className="fa-solid fa-envelope-circle-check"></i>  Email : </h3><h4 className="text-blue-500 font-mono text-base">lotustrends@gmail.com</h4>
        <h3 className="font-mono text-2xl"><i className="fa-solid fa-phone"></i>  Phone : </h3> <h4 className="text-blue-500 font-mono text-base" > +91 6787978890</h4>
        <h3 className="font-mono text-2xl"><i className="fa-solid fa-location-dot"></i> Address : </h3><h4 className="text-white font-mono text-base">lotus Trends
   5678 Commerce Avenue, <br/>Suite 102
   Brooklyn Heights, NY 11201
   United States</h4>
      </div>
    </div>

    <footer className="py-1 bg-gray-900">
      <p className="text-center text-white mt-1 "> &copy; ecommerce
      </p>
    </footer>
    </>
  )
}

export default Home
