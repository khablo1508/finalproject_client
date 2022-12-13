import React from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

function AppointmentCard({ title, duration, price, date, status }) {
  return (
    <Wrapper>
      <Card className='card'>
        <Card.Body className={`card-body ${status}`}>
          <Card.Title className='title'>{title}</Card.Title>
          <Card.Subtitle className='duration'>
            <span>Duration: </span>
            {duration}
          </Card.Subtitle>
          <Card.Subtitle className='price'>
            <span>Price: </span>$ {price}
          </Card.Subtitle>
          <Card.Subtitle className='date'>
            <span>Date: </span> {date}
          </Card.Subtitle>
          <Card.Subtitle className='status'>
            <span>Status: </span>{' '}
            {status === 'pending' && 'Waiting for approval'}
            {status === 'approved' && 'Approved'}
            {status === 'declined' && 'Declined'}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .card {
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pending {
    background: #fff;
    box-shadow: 5px 5px 10px #d6b1a4;
  }
  .approved {
    background: #d2e7d6;
    box-shadow: 5px 5px 10px #b8d8be;
  }
  .declined {
    background: #fdaaaa;
    box-shadow: 5px 5px 10px #f97c7c;
  }
  .card-img {
    width: 100%;
    height: 50%;
    margin-bottom: 15px;
  }
  .card-body {
    border-radius: 10px;
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
  .card-body .book-btn {
    background: var(--clr-bourdeaux);
    color: var(--clr-ivory);
  }
`;

export default AppointmentCard;
