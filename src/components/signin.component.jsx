import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";

const axios = require('axios').default;
var cors = require('cors')



export default function SignIn({setUser,setToken}) {
    const history = useHistory();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
  

    return (
        <div>

        <Form onSubmit={LoginUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter User Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Username" onChange={(e)=>{setUsername(e.target.value)}}/>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
        </div>
    )

    function LoginUser(e){
      
      const data={
        'username':username,
        'password':password,
    }
        e.preventDefault();
        axios.post('http://127.0.0.1:3333/login',data)
            .then((response)=>{
            console.log(response)
            sessionStorage.setItem('token',response.data.token)
            sessionStorage.setItem('user',username)
            setUser(username)
            setToken(response.data.token)
            history.push(`/dashboard/${username}`)
            })  
            .catch((e)=>{
              console.log(e)
              alert("invalid Credentials")
            }
            )  
          }

}

