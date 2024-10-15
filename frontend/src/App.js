import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';
import CategoriePage from './pages/CategoriePage';
import SearchQueriesPage from './pages/SearchQueriesPage';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductsPage/>}/>
            <Route path='/product/:id' element={<ProductDetailsPage/>}/>
            <Route path='/categories/:category' element={<CategoriePage/>}/>
            <Route path='/search/:query' element={<SearchQueriesPage/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
          <Footer/>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
