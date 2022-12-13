import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function RequestCard({
  reqId,
  title,
  decision,
  time,
  date,
  client,
  appStatus,
  appId,
}) {
  const [isDisabled, setIsDisabled] = useState(false);

  const approveRequest = () => {
    const requestBody = { appStatus, appId, decision: 'approved', reqId };
    setIsDisabled(true);
    axios.put(`${API_URL}/admin-profile`, requestBody).then((response) => {
      console.log(response.data);
    });
  };

  const declineRequest = () => {
    const requestBody = { appStatus, appId, decision: 'declined', reqId };
    setIsDisabled(true);
    axios.put(`${API_URL}/admin-profile`, requestBody).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <Wrapper>
      <section>
        <Card className='card'>
          <Card.Body className={`card-body ${decision}`}>
            <Card.Title className='title'>{title}</Card.Title>
            <Card.Subtitle className='price'>
              <span>Date: </span>
              {date}
            </Card.Subtitle>
            <Card.Subtitle className='price'>
              <span>Time: </span>
              {time}
            </Card.Subtitle>
            <Card.Subtitle className='date'>
              <span>Client: </span> {client}
            </Card.Subtitle>
            <Button
              className='approve-btn btn'
              onClick={approveRequest}
              disabled={isDisabled}
            >
              Approve
            </Button>
            <Button
              className='decline-btn btn'
              onClick={declineRequest}
              disabled={isDisabled}
            >
              Decline
            </Button>
          </Card.Body>
        </Card>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .card {
    height: 250px;
    width: 200px;
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
    height: 100%;
    width: 100%;
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
    width: 80%;
    cursor: pointer;
  }
  .card-body .approve-btn {
    background: var(--clr-pink);
    color: var(--clr-bourdeaux);
  }
`;

export default RequestCard;
