import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home" 
import Help from '../components/pages/Help';
import AllSneakers from '../components/pages/AllSneakers';
import ProductDetail from '../components/pages/ProductDetail';
import Page404 from '../components/pages/404';
import Confirmation from '../components/pages/Confirmation';
import Cart from '../components/pages/Cart';

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Page404/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/help" element={<Help/>} />
                    <Route path="/sneakers" element={<AllSneakers/>} />
                    <Route path="/sneakers/confirmation" element={<Confirmation/>} />
                    <Route path="/sneaker/:id" element={<ProductDetail/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
