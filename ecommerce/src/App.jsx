import './App.css';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from 'react';

// import Home from './pages/Home';
// import Prodetails from './pages/Prodetails';
// import Header from './components/Header';
// import Cart from './pages/Cart';
// import VerifyOTP from './pages/Verifyotp';
// import Register from './pages/Register';
// import Login from './pages/Login';

// function App() {
//   const [token, setToken] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const renderBaseComponent = () => {
//     if (!isRegistered) {
//       return (
//         <Register
//           onOtpSent={(token) => {
//             setToken(token);
//             setIsRegistered(true);
//           }}
//         />
//       );
//     }
//     if (isRegistered && !isVerified) {
//       return (
//         <VerifyOTP
//           token={token}
//           onVerified={() => setIsVerified(true)}
//         />
//       );
//     }
//     if (isVerified && !isLoggedIn) {
//       return (
//         <Login
//           onLogin={(token) => {  // ✅ Fix: Corrected prop name
//             setToken(token);
//             setIsLoggedIn(true);
//           }}
//         />
//       );
//     }
//     return <Navigate to="/home" />;
//   };

//   return (
//     <BrowserRouter>
//       <div>
//         {/* Render Header only if the user is logged in */}
//         {isLoggedIn && <Header cartItems={cartItems} />}

//         <Routes>
//           {/* Base Route */}
//           <Route path="/" element={renderBaseComponent()} />

//           {/* Protected Routes */}
//           {isLoggedIn && (
//             <>
//               <Route path="/home" element={<Home />} />
//               <Route path="/search" element={<Home />} />
//               <Route
//                 path="/product/:id"
//                 element={<Prodetails cartItems={cartItems} setCartItems={setCartItems} />}
//               />
//               <Route
//                 path="/cart"
//                 element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
//               />
//             </>
//           )}

//           {/* Redirect Unauthenticated Users */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { useState } from 'react';

import Home from './pages/Home';
import Prodetails from './pages/Prodetails';
import Header from './components/Header';
import Cart from './pages/Cart';
import VerifyOTP from './pages/VerifyOTP';
import Register from './pages/Register';
import Login from './pages/Login';
import Fr from './components/Front';
import Productsitems from './components/Productsitems';
import MyOrders from './pages/MyOrders';

function App() {
  const [token, setToken] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <div>
        {/* Render Header only if the user is logged in */}
        {isLoggedIn && <Header cartItems={cartItems} />}

        <Routes>
          {/* Set Login as the default page */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={(token) => { setToken(token); setIsLoggedIn(true); }} />} />
          <Route path="/register" element={<Register onOtpSent={(token) => { setToken(token); setIsRegistered(true); }} />} />
          <Route path="/verify-otp" element={isRegistered ? <VerifyOTP token={token} onVerified={() => setIsVerified(true)} /> : <Navigate to="/register" />} />

          {/* Protected Routes */}
          {isLoggedIn && (
            <>
            
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Home />} />
              <Route path="/product/:id" element={<Prodetails cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              {/*<Route path='/my-orders' element={<MyOrders/>}/>*/}
            </>
          )}

          {/* Redirect Unauthenticated Users */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

