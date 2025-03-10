import { Link } from 'react-router-dom'
import Search from './Search'
import { useState,useRef,useEffect } from 'react';
import './header.css'
export default function Header({cartItems}) {
  const [isOpen, setIsOpen] = useState(false);
  const cartIconRef=useRef();
  const cartIcon=useRef();

  useEffect(()=>{
    if(cartItems.length>0){
      cartIconRef.current.classList.add('cart-glow');
      setTimeout(()=>{
        cartIconRef.current.classList.remove('cart-glow')
      },800)
    }
  },[cartItems.length])
  useEffect(()=>{
    if(cartItems.length>0){
      cartIcon.current.classList.add('cart-glowing');
      setTimeout(()=>{
        cartIcon.current.classList.remove('cart-glowing')
      },800)
    }
  },[cartItems.length])

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const scrolla = () => {
    document.getElementById('aboutus')?.scrollIntoView({ behavior: 'smooth' });
  }


 const scrollc = () => {
  document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' });
}
const scrollToProducts = () => {
  document.getElementById('products_heading')?.scrollIntoView({ behavior: 'smooth' });
}

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
    <>
    <div className="hidden sm:block bg-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50 ">

      <nav className="flex flex-col md:flex-row items-center  justify-between py-0 px-5 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img className="w-28" src="/images/l1 (2).png" alt="Logo" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 mt-4 md:mt-0">
          <Search className="w-full border-2 border-pink-400  rounded-lg outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
        </div> 
         {/* Cart Link */}
         <div className="mt-4 md:mt-0 hover:bg-gray-100 ">
         <Link to="/home" ref={cartIcon} className=" btn p-2 position-relative border-2 border-pink-500 bg-white ">
         <i className="fa-solid fa-home"></i>
          </Link>
        </div>
       
       {/* <div className='mt-4 md:mt-0'>
        <Link to="/my-orders" className="btn border-2 border-pink-500 bg-white p-2">
          <i className="fa-solid fa-box"></i> My Orders
         </Link>
         </div>*/}
        <div className="mt-4 md:mt-0 hover:bg-gray-100">
        <button onClick={scrollc} className="btn p-2 position-relative border-2 border-pink-500 bg-white ">
        <i className="fa-solid fa-phone-volume"></i>
          </button>
        </div>
        <div className="mt-4 md:mt-0 hover:bg-gray-100">
        <button onClick={scrolla} className="btn p-2 position-relative border-2 border-pink-500 bg-white ">
        <i className="fa-solid fa-users"></i>
          </button>
        </div>
        <div className="mt-4 md:mt-0 hover:bg-gray-100">
         <Link to="/cart" ref={cartIcon} className="btn p-2 position-relative border-2 border-pink-500 bg-white ">
         <i className="fa-solid fa-cart-shopping"></i>
            <span className=" text-white position-absolute top-0 start-100 translate-middle badge rounded bg-info">{cartItems.length}</span>
          </Link>
        </div>
        
        
      </nav>
    </div>
    <div className="fixed top-0 left-0 w-full z-50 sm:hidden bg-gray-900"> {/* Fixed at top */}
    <nav className=" shadow-md p-4">
      {/* Menu Button (Hamburger) */}
      <div className='flex justify-between'>
         <div className="menu-btn text-2xl cursor-pointer" onClick={toggleNavbar}>
         <i className="fa-solid fa-bars text-pink-500 " ></i>
         </div>
          <div className=" md:mt-0">
          <Link to="/cart" ref={cartIconRef} className="btn p-2 position-relative border-2 border-pink-500 bg-white ">
          <i className="fa-solid fa-cart-shopping"></i>
            <span className=" text-white position-absolute top-0 start-100  translate-middle badge rounded bg-info">{cartItems.length}</span>
          </Link>
        </div>
      </div>
      <div className="relative w-full md:w-1/3 mt-4 md:mt-0">
          <Search className="w-full border-2 border-pink-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
        </div>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-pink-300 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button */}
        <button className="absolute top-2 right-3 text-2xl" onClick={toggleNavbar}>×</button>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-4 mt-10 text-lg ">
          <div>
          <img className="w-28 ml-3.5" src="/images/l1 (2).png" alt="Logo" />
          </div>
          <Link to='/home'><a  className="block px-4 py-2 hover:bg-gray-100">Home</a></Link>
          <li onClick={scrolla}><a  className="block px-4 py-2 hover:bg-gray-100">About us</a></li>
          <li onClick={scrollc}><a  className="block px-4 py-2 hover:bg-gray-100">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
  </>
  
   
     
  )
}
