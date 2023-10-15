import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Cart} from '../components/Cart.jsx';
import {Products} from '../components/Products.jsx';
import {Home} from '../components/Home.jsx';
import {Product} from '../components/Product.jsx';
import { createContext, useState } from 'react';

export const Context = createContext(null);

export function App(){

    const client = new QueryClient();
    const [status, setStatus] = useState({cart: []});

    return (
     <Context.Provider value={[status, setStatus]}>
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
    </Context.Provider>
    );
}