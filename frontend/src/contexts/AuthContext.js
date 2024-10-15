import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null); // Add state to store user data

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('https://hm-rho-drab.vercel.app/api/auth/check-auth', { 
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user); // Assuming the response contains user data
        } else {
          throw new Error('Authentication check failed');
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null); // Clear user data on error
      }
    };
    
    const checkAdmin = async () => {
      try {
        const response = await fetch('https://hm-rho-drab.vercel.app/api/auth/check-admin', { 
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          throw new Error('Admin check failed');
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAuthentication();
    checkAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user }}> {/* Provide user data */}
        {children}
    </AuthContext.Provider>
  );
}
