import React, { createContext, useContext, useState } from 'react';

const FunctionsContext = createContext();

export const useFunctions = () => {
  const context = useContext(FunctionsContext);
  if (!context) {
    throw new Error('useFunctions must be used within a FunctionsProvider');
  }
  return context;
};

export const FunctionsProvider = ({ children }) => {
  const [functions, setFunctions] = useState([]);

  const addFunction = (func) => {
    setFunctions(prev => [func, ...prev]);
  };

  const updateFunction = (id, updates) => {
    setFunctions(prev => 
      prev.map(func => func.id === id ? { ...func, ...updates } : func)
    );
  };

  return (
    <FunctionsContext.Provider value={{ functions, addFunction, updateFunction }}>
      {children}
    </FunctionsContext.Provider>
  );
};