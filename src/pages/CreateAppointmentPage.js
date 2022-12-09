import styled from 'styled-components';
import { useContext } from 'react';
import { ProceduresContext } from '../context/procedures.context';

function CreateAppointmentPage() {
  const { chosenProcedure } = useContext(ProceduresContext);
  console.log(chosenProcedure);
  return (
    <section>
      <div className='sign-form-container'>
        <form className='sign-form'>
          <div className='input-label-container'>
            <label>Email:</label>
            <input type='email' name='email' />
          </div>
          <div className='input-label-container'>
            <label>Password:</label>
            <input type='password' name='password' />
          </div>

          <button className='btn sign-btn' type='submit'>
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateAppointmentPage;
