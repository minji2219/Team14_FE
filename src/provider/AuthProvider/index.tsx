import React, { createContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  isLoggedIn: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!Cookies.get('access_token'),
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
