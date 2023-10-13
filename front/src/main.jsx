import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Cart} from '../components/Cart.jsx';
import {Products} from '../components/Products.jsx';
import {Home} from '../components/Home.jsx';
import {Product} from '../components/Product.jsx';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route index element={<Products/>}/>
            <Route path='*' element={<Products/>}/>
            <Route path='products' element={<Products/>}/>
            <Route path='product/:id' element={<Product/>}/>
            <Route path='cart' element={<Cart/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
