import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { Search, User, Heart, ShoppingBag, AlignJustify, X } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Header = () => {
  const { isAdmin } = useContext(AuthContext);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [query, setQuery] = useState('');
  const { cart } = useContext(CartContext);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = (modalType) => {
    switch (modalType) {
      case 'search':
        setIsSearchModal((prev) => !prev);
        break;
      case 'sidebar':
        setIsSidebar((prev) => !prev);
        break;
      case 'login':
        setIsLoginModal((prev) => !prev);
        break;
      case 'register':
        setIsRegisterModal((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const closeAllModals = () => {
    setIsSearchModal(false);
    setIsSidebar(false);
    setIsLoginModal(false);
    setIsRegisterModal(false);
    setQuery(''); // Clear the query on close
  };

  const handleSearch = () => {
    if (query.trim()) { // Only navigate if query is not empty
      navigate(`/search/${query}`);
      closeAllModals(); // Close the modal after navigating
    }
  };

  return (
    <header>
      <nav className='w-full p-4 flex justify-between items-center fixed top-0 left-0 z-[1] bg-white'>
        <Link to="/">
          <img src="/assets/hm-logo.webp" alt="logo" className='h-6' />
        </Link>
        <ul className='list-none flex items-center gap-5'>
          <li className='cursor-pointer' onClick={() => toggleModal('search')}><Search /></li>
          <li className='cursor-pointer' onClick={() => toggleModal('login')}><User /></li>
          <li className='cursor-pointer'>
            <Link to="/cart"><ShoppingBag /></Link>
            {cart.length > 0 && (
              <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
                {cart.length}
              </span>
            )}
          </li>
          <li className='cursor-pointer' onClick={() => toggleModal('sidebar')}><AlignJustify /></li>
        </ul>
      </nav>

      {/* Categories */}
      <div className="w-full p-4 mt-20">
        <ul className="flex justify-center items-center gap-7">
          <li className="cursor-pointer text-gray-600 font-semibold hover:text-black transition-all duration-300">
            <Link to="/categories/women">WOMEN</Link>
          </li>
          <li className="cursor-pointer text-gray-600 font-semibold hover:text-black transition-all duration-300">
            <Link to="/categories/men">MEN</Link>
          </li>
          <li className="cursor-pointer text-gray-600 font-semibold hover:text-black transition-all duration-300">
            <Link to="/categories/kids">KIDS</Link>
          </li>
          <li className="cursor-pointer text-gray-600 font-semibold hover:text-black transition-all duration-300">
            <Link to="/categories/home">HOME</Link>
          </li>
          <li className="cursor-pointer text-gray-600 font-semibold hover:text-black transition-all duration-300">
            <Link to="/categories/beauty">BEAUTY</Link>
          </li>
          {isAdmin && (
            <li className="cursor-pointer text-gray-600 font-semibold hover:text-black transition-all duration-300">
              <Link to="/admin">ADMIN</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Search Modal */}
      {isSearchModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end w-full z-[3]'>
          <div className='h-screen w-1/2 bg-white'>
            <div className='flex justify-between items-center p-4'>
              <Search />
              <input 
                type="text" 
                placeholder='Search' 
                className='flex-1 px-4 outline-none' 
                name='query' 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} // Only set query here
              />
              <button onClick={handleSearch} className='px-2 py-1 bg-black text-white rounded'>
                Search
              </button>
              <X onClick={closeAllModals} className='cursor-pointer' />
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {isSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end w-full z-[3] transition-opacity duration-300">
          <div className="h-screen w-[300px] bg-white shadow-xl transform translate-x-0 transition-transform duration-300 ease-in-out">
            <div className="flex justify-end p-4">
              <X onClick={closeAllModals} className="cursor-pointer text-gray-600 hover:text-black transition duration-300" />
            </div>
            <ul className="list-none px-6 space-y-4">
              <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                <Link to="/products">VIEW ALL</Link>
              </li>
              <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                <Link to="/categories/women">WOMEN</Link>
              </li>
              <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                <Link to="/categories/men">MEN</Link>
              </li>
              <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                <Link to="/categories/kids">KIDS</Link>
              </li>
              <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                <Link to="/categories/home">HOME</Link>
              </li>
              <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                <Link to="/categories/sale">SALE</Link>
              </li>
              {isAdmin && (
                <li className="text-gray-800 font-semibold text-lg hover:text-black transition-all duration-300">
                  <Link to="/admin">ADMIN</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Login and Register Modals */}
      {isLoginModal && (
        <LoginModal onClose={() => setIsLoginModal(false)} onSwitchToRegister={() => {
          setIsLoginModal(false);
          setIsRegisterModal(true);
        }} />
      )}
      
      {isRegisterModal && (
        <RegisterModal onClose={() => setIsRegisterModal(false)} onSwitchToLogin={() => {
          setIsRegisterModal(false);
          setIsLoginModal(true);
        }} />
      )}
    </header>
  );
}

export default Header;
