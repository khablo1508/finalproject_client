import React, { useState } from 'react';

const ProceduresContext = React.createContext();

function ProceduresProviderWrapper({ children }) {
  const [proceduresList, setProceduresList] = useState([]);
  const [chosenProcedure, setChosenProcedure] = useState({});

  return (
    <ProceduresContext.Provider
      value={{
        proceduresList,
        setProceduresList,
        chosenProcedure,
        setChosenProcedure,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}

export { ProceduresProviderWrapper, ProceduresContext };
