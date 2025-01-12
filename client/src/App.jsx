import { useState } from 'react'

import Header from './layouts/Header'
import Footer from './layouts/footer'
import LayOut from './layouts/layout'
import Products from './components/products'

import { BrowserRouter as Router, Routes, 
  Route, Navigate } from 'react-router-dom'
import ProductDetail from './pages/productDetail.jsx'
import HomePage from './pages/home.jsx'
import Registration from './pages/onboarding/registration.jsx'
import Login from './pages/onboarding/login.jsx'
import CartPage from './pages/cartpage.jsx'
import Example from './pages/orderpage.jsx'
import OrderPage from './pages/order.jsx'
import OrderConfirmation from './pages/confirmOrder.jsx'
import OrderHistory from './pages/orderhistory.jsx'

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order-confirmation/:id' element={<OrderConfirmation />} />
        <Route path='/order-history/' element={<OrderHistory />} />

        <Route path='/order-payment' element={<Example />} />
        {/* <Route path='/order' element={<OrderPage />} /> */}
        {/* <Route path='/cartpage' element={<CartPage />} /> */}
        {/* <Route path='/cart' element={<CartPage />} /> */}
      </Routes>
    </Router>
    </>
   
  );
}

export default App
