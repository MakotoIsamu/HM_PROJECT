import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const result = await login(formData.email, formData.password); // Login via context
      if (result.success) {
        onClose();  // Close the modal on successful login
      } else {
        setError(result.message);  // Display error if login fails
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-black">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="font-medium text-indigo-600 hover:text-indigo-500">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
