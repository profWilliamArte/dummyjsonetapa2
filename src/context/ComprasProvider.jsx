import React, { createContext, useState } from 'react';
export const ComprasContext = createContext();

export const ComprasProvider = ({ children }) => {
  const [cartItems, setCartItems]=useState({});
  const [compras, setCompras] = useState([]);
  const [total, setTotal] = useState(0)

  return (
    <ComprasContext.Provider value={{ cartItems, setCartItems,compras, setCompras, total, setTotal }}>
      {children}
    </ComprasContext.Provider>
  );
};