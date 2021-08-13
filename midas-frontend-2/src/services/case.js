import React, { createContext, useState } from 'react';

const CaseContext = createContext();

const Case = (props) => {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <CaseContext.Provider value={{
      selectedCase,
      setSelectedCase
    }} {...props} />
  );
};

export { Case, CaseContext };
