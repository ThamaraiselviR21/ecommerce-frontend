import Productsitems from "../components/Productsitems"
import { useState,useEffect } from "react";
import axios from 'axios';
import { useSearchParams} from "react-router-dom";
import Front from "../components/Front";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {

    const [product, setProduct] = useState([]);
    const [searchParams,setSearchParams]= useSearchParams()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/product/getpro?`+searchParams);
                setProduct(res.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, [searchParams]);
    

  return (
    <>
    <Front/>
    <h1 id="products_heading" style={{textAlign:"center"}}>Explore Our Products</h1>
    
    <section id="products" className="container mt-5" >
      <div className="row" >
     {product.map((product, index) => (
  <Productsitems key={index} product={product} />
    ))}

   </div>
    </section>

    <footer className="py-1 bg-gray-900">
      <p className="text-center text-white mt-1 "> &copy; ecommerce
      </p>
    </footer>
    </>
  )
}

export default Home
