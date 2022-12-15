import React, { useState } from 'react';

const ProceduresContext = React.createContext();

function ProceduresProviderWrapper({ children }) {
  const [proceduresList, setProceduresList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [requestsList, setRequestsList] = useState([]);
  const [chosenProcedure, setChosenProcedure] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <ProceduresContext.Provider
      value={{
        isDisabled,
        setIsDisabled,
        proceduresList,
        setProceduresList,
        chosenProcedure,
        setChosenProcedure,
        appointmentsList,
        setAppointmentsList,
        requestsList,
        setRequestsList,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}

export { ProceduresProviderWrapper, ProceduresContext };
