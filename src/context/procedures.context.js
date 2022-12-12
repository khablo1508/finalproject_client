import React, { useState } from 'react';

const ProceduresContext = React.createContext();

function ProceduresProviderWrapper({ children }) {
  const [proceduresList, setProceduresList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [chosenProcedure, setChosenProcedure] = useState({});

  return (
    <ProceduresContext.Provider
      value={{
        proceduresList,
        setProceduresList,
        chosenProcedure,
        setChosenProcedure,
        appointmentsList,
        setAppointmentsList,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}

export { ProceduresProviderWrapper, ProceduresContext };
