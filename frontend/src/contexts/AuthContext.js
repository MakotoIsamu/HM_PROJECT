import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('https://hm-rho-drab.vercel.app/api/auth/check-auth', { 
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          throw new Error('Authentication check failed');
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
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

  const login = async (email, password) => {
    try {
      const response = await fetch('https://hm-rho-drab.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = async () => {
    try {
      await fetch('https://hm-rho-drab.vercel.app/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
