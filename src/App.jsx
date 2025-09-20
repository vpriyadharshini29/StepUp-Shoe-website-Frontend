import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Homepage";
import CategoryPage from "./pages/category page";
import ProductPage from "./pages/Description page";
import CartPage from "./pages/cartpage";
import CheckoutPage from "./pages/checkoutpage";
import MyOrdersPage from "./pages/Myorderspage";
import AuthTabs from "./components/AuthTabs";
import AboutSection from "./pages/Aboutpage";
import ContactSection from "./pages/Contactpage";



export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
      <Header/>
      <div className="py-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/login" element={<AuthTabs />} />


      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}
