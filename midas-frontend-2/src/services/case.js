import React, { createContext, useState } from 'react';

const CaseContext = createContext();

const Case = (props) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseName, setCaseName] = useState(null);

  return (
    <CaseContext.Provider value={{
      selectedCase,
      caseName,
      setSelectedCase,
      setCaseName,
    }} {...props} />
  );
};

export { Case, CaseContext };
