import React, { useState } from 'react';

const ProceduresContext = React.createContext();

function ProceduresProviderWrapper({ children }) {
  const [proceduresList, setProceduresList] = useState([]);

  return (
    <ProceduresContext.Provider value={{ proceduresList, setProceduresList }}>
      {children}
    </ProceduresContext.Provider>
  );
}

export { ProceduresProviderWrapper, ProceduresContext };
