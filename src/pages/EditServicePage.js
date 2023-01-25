import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import Loading from '../components/Loading';
import HamburgerMenu from '../components/HamburgerMenu';

const API_URL = process.env.REACT_APP_SERVER_URL;

function EditServicePage() {
  const { isLoading, wrapMenu, setWrapMenu } = useContext(AuthContext);
  const { procedureId } = useParams();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDuration, setEditDuration] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [procedureToEdit, setProcedureToEdit] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  const editTitleFunc = () => {
    setEditTitle(!editTitle);
    setEditDescription(false);
    setEditDuration(false);
    setEditPrice(false);
  };
  const editDescFunc = () => {
    setEditDescription(!editDescription);
    setEditTitle(false);
    setEditDuration(false);
    setEditPrice(false);
  };
  const editDurFunc = () => {
    setEditDuration(!editDuration);
    setEditTitle(false);
    setEditDescription(false);
    setEditPrice(false);
  };
  const editPriceFunc = () => {
    setEditPrice(!editPrice);
    setEditTitle(false);
    setEditDuration(false);
    setEditDescription(false);
  };

  const submitChange = (e) => {
    e.preventDefault();

    let requestBody;

    if (
      newTitle !== procedureToEdit.title &&
      newPrice === '' &&
      newDescription === '' &&
      newDuration === ''
    ) {
      requestBody = { newTitle };
    } else if (
      newDescription !== procedureToEdit.description &&
      newPrice === '' &&
      newTitle === '' &&
      newDuration === ''
    ) {
      requestBody = { newDescription };
    } else if (
      newDuration !== procedureToEdit.duration &&
      newPrice === '' &&
      newDescription === '' &&
      newTitle === ''
    ) {
      requestBody = { newDuration };
    } else if (
      newPrice !== procedureToEdit.price &&
      newTitle === '' &&
      newDescription === '' &&
      newDuration === ''
    ) {
      requestBody = { newPrice };
    }

    axios
      .put(`${API_URL}/edit-procedure/${procedureId}`, requestBody)
      .then((res) => navigate('/services'))
      .catch();
  };

  const deleteProcedure = () => {
    axios.delete(`${API_URL}/edit-procedure/${procedureId}`).then((res) => {
      setDeleteMessage(res.data.message);
    });
  };

  useEffect(() => {
    setWrapMenu(false);
    axios
      .get(`${API_URL}/edit-procedure/${procedureId}`)
      .then((procedureFromDb) => {
        console.log(procedureFromDb.data);
        setProcedureToEdit(procedureFromDb.data);
      });
  }, []);

  return (
    <Wrapper>
      {isLoading && <Loading />}

      <section className={wrapMenu ? 'wrap' : 'sign-form-section'}>
        {wrapMenu ? (
          <HamburgerMenu />
        ) : (
          <>
            <h1>Edit procedure</h1>
            <div className='sign-form-container'>
              {!deleteMessage && (
                <div className='sign-form-container cont'>
                  {!editTitle ? (
                    <div className='heading-line'>
                      <h3>Title: {procedureToEdit?.title}</h3>
                      <button className='edit-btn' onClick={editTitleFunc}>
                        <i className='fa-solid fa-pencil'></i>
                      </button>
                    </div>
                  ) : (
                    <form className='edit-form' onSubmit={submitChange}>
                      <div className='input-label-container'>
                        <label>Title:</label>
                        <input
                          type='text'
                          name='newTitle'
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                      </div>
                      <button className='submit-btn' type='submit'>
                        <i className='fa-solid fa-check'></i>
                      </button>
                    </form>
                  )}
                  {!editDescription ? (
                    <div className='description-div'>
                      <div className='heading-line'>
                        <h3>Description: </h3>
                        <button className='edit-btn' onClick={editDescFunc}>
                          <i className='fa-solid fa-pencil'></i>
                        </button>
                      </div>
                      <p>{procedureToEdit?.description}</p>
                    </div>
                  ) : (
                    <form className='desc-edit-form' onSubmit={submitChange}>
                      <div className='desc-label-container'>
                        <label>Description:</label>
                        <button className='submit-btn' type='submit'>
                          <i className='fa-solid fa-check'></i>
                        </button>
                      </div>
                      <textarea
                        type='text'
                        name='newDescription'
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                      />
                    </form>
                  )}
                  {!editDuration ? (
                    <div className='heading-line'>
                      <h3>Duration: {procedureToEdit?.duration}</h3>
                      <button className='edit-btn' onClick={editDurFunc}>
                        <i className='fa-solid fa-pencil'></i>
                      </button>
                    </div>
                  ) : (
                    <form className='edit-form' onSubmit={submitChange}>
                      <div className='input-label-container'>
                        <label>Duration:</label>
                        <input
                          type='text'
                          name='newDuration'
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                        />
                      </div>
                      <button className='submit-btn' type='submit'>
                        <i className='fa-solid fa-check'></i>
                      </button>
                    </form>
                  )}
                  {!editPrice ? (
                    <div className='heading-line'>
                      <h3>Price: ${procedureToEdit?.price}</h3>
                      <button className='edit-btn' onClick={editPriceFunc}>
                        <i className='fa-solid fa-pencil'></i>
                      </button>
                    </div>
                  ) : (
                    <form className='edit-form' onSubmit={submitChange}>
                      <div className='input-label-container'>
                        <label>Price: $ </label>
                        <input
                          type='text'
                          name='newPrice'
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </div>
                      <button className='submit-btn' type='submit'>
                        <i className='fa-solid fa-check'></i>
                      </button>
                    </form>
                  )}
                  <button className='btn delete-btn' onClick={deleteProcedure}>
                    Delete
                  </button>
                </div>
              )}

              {deleteMessage && (
                <div className='delete-msg-container'>
                  <p className='delete-message'>{deleteMessage}</p>
                  <button className='btn' onClick={() => navigate('/services')}>
                    Back to services
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .sign-form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 0 0;
  }
  .cont {
    width: 100%;
    height: 100%;
  }
  .heading-line {
    display: flex;
    justify-content: space-between;
    width: 200px;
    display: flex;
  }
  .edit-btn,
  .submit-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    color: var(--clr-bourdeaux);
    text-align: center;
    cursor: pointer;
  }
  .description-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 40%;
  }
  .description-div p {
    margin-top: 10px;
  }
  .delete-btn {
    background: var(--clr-bourdeaux);
    color: #fff;
    cursor: pointer;
  }

  /* FORMS */
  .edit-form {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit-form .input-label-container {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .edit-form .input-label-container input {
    margin-left: 8px;
    width: 70%;
    height: 100%;
  }
  .desc-edit-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 150px;
  }
  .desc-edit-form .desc-label-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
  }
  .desc-edit-form textarea {
    width: 100%;
    height: 60%;
    border: 2px dotted var(--clr-bourdeaux);
    border-radius: 10px;
  }

  /* DELETE MESSAGE */
  .delete-msg-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .delete-msg-container p {
    width: 80%;
    margin-bottom: 40px;
    color: var(--clr-bourdeaux);
    font-size: 25px;
  }
`;

export default EditServicePage;
