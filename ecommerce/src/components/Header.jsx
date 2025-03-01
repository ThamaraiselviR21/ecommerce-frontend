import { Link } from 'react-router-dom'
import Search from './Search'
import './header.css'
export default function Header({cartItems}) {
  return (
    // <div>
    //       <nav className="navbar row">
    //   <div className="col-12 col-md-3">
    //     <div className="navbar-brand">
    //       <img width="100px" src="/images/l1 (2).png"/>
    //     </div>
    //   </div>

    //   <div className="col-12 col-md-6 mt-2 mt-md-0">
    //     <Search/>
       
    //   </div>

    //   <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
    //     <Link to={"/cart"}>
    //        <span id="cart" className="ml-3">Cart</span>
    //        <span className="ml-1" id="cart_count">{cartItems.length}</span>
    //     </Link> 
       
    //   </div>
    // </nav>
      
    // </div>
    <div className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50 ">
      <nav className="flex flex-col md:flex-row items-center justify-between  px-5 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img className="w-28" src="/images/l1 (2).png" alt="Logo" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/3 mt-4 md:mt-0">
          <Search className="w-full border-2 border-pink-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
        </div>

        {/* Cart Link */}
        <div className="mt-4 md:mt-0">
          <Link to="/cart" className="flex items-center space-x-2 text-pink-400 hover:text-pink-600 transition font-semibold">
            <span>Cart</span>
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </div>

   
     
  )
}
