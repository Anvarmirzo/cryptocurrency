import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CryptocurrenciesPage, CryptoDetailsPage, ExchangesPage, HomePage, NewsPage} from "./pages";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/exchanges' element={<ExchangesPage/>}/>
            <Route path='/cryptocurrencies' element={<CryptocurrenciesPage/>}/>
            <Route path='/crypto/:coinId' element={<CryptoDetailsPage/>}/>
            <Route path='/news' element={<NewsPage/>}/>
        </Routes>
    );
};