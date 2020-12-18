import React ,{useState} from 'react'
import { Form,Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";

const axios = require('axios').default;



export default function SigupPage() {
    const history=useHistory();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    return (
        <div>
        <Form onSubmit={RegisterUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter User Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Username" onChange={(e)=>{setUsername(e.target.value)}}/>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
        </div>
    )

    function RegisterUser(e){
      e.preventDefault();
      if(password===confirmPassword){
      axios.post('http://127.0.0.1:3333/register',
              {
                  'username':username,
                  'password':password,
                  'password_confirmation':confirmPassword
              })
          .then(()=>{
          alert('Successfully Created, Login using the credentials!')
          setTimeout(()=>history.push('signin'),10)
          })  
          .catch(()=>
          alert('Username already Taken!')
          )  
      }
      
      else{
          alert("passwords dont match!")
      }
      }

}
