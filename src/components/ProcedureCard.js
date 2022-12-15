import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function ProcedureCard({ id, title, code, description, duration, price }) {
  const { user, isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  const addAppointment = () => {
    const requestBody = { id, user };

    axios.post(`${API_URL}/services`, requestBody).then((response) => {
      console.log(response.data._id);
      navigate(`/create-appointment/${response.data._id}`);
    });
  };

  const editService = () => {
    axios.delete(`${API_URL}/services`);
  };

  return (
    <Wrapper>
      <Card className='card'>
        <Card.Img
          variant='top'
          src={require(`../assets/${code}.jpg`)}
          alt='card image'
          className='card-img'
        />
        <Card.Body className='card-body'>
          <Card.Title className='title'>{title}</Card.Title>
          <Card.Text className='description'>{description}</Card.Text>
          <Card.Subtitle className='duration'>
            <span>Duration: </span>
            {duration}
          </Card.Subtitle>
          <Card.Subtitle className='price'>
            <span>Price: </span>$ {price}
          </Card.Subtitle>
          {!isAdmin ? (
            <Button className='book-btn btn' onClick={addAppointment}>
              Book an appointment
            </Button>
          ) : (
            <Link to={`/edit-procedure/${id}`} className='btn delete-btn'>
              Edit
            </Link>
          )}
        </Card.Body>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .card {
    border-radius: 10px;
    background: #fff;
    height: 450px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card-img {
    border-radius: 0 0 30% 50%;
    width: 100%;
    height: 50%;
    margin-bottom: 15px;
  }
  .card-body {
    margin-bottom: 10px;

    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .card-body span {
    color: var(--clr-bourdeaux);
  }
  .card-body .title {
    text-align: center;
    color: var(--clr-bourdeaux);
    width: 85%;
    height: 20%;
    font-size: 20px;
  }
  .card-body .description {
    width: 90%;
    height: 40%;
    text-align: justify;
    font-size: 18px;
  }
  .card-body .btn {
    background: var(--clr-bourdeaux);
    color: var(--clr-ivory);
  }
`;

export default ProcedureCard;
