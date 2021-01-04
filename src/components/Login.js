import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

import { auth } from '../firebase';
//import './FaqItem.css';

function Login(params) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();    
    login();
  }

  const login = () => {    
    auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        params.setUser({ userInfo: authUser.user });
        history.push('/');
      })
      .catch((error) => {
        alert(error.code + ' - ' + error.message);
      });
  };  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}          
          />
      </Form.Group>      
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}          
          />
      </Form.Group>
      <Button variant="primary" type="submit">Let me in</Button>
    </Form>    
  );
}

export default Login;
