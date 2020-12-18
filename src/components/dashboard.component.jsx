
import React,{useEffect,useState} from 'react';
import { Button,InputGroup,FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const axios = require('axios').default;


export default function Dashboard({user,token,setUser,setToken}) {
    const history = useHistory();
    const [todo,setTodo] = useState('');
    const [userDB,setUserDB] = useState([]);
    const [run,setRun]=useState(true);
    
    useEffect(()=>{
         if(sessionStorage.getItem('user')!==null){
            user=sessionStorage.getItem('user');
            token = sessionStorage.getItem('token');
            setUser(sessionStorage.getItem('user'));
            setToken(sessionStorage.getItem('token'))
         }
        axios.get(`http://127.0.0.1:3333/todoList/${user}`,
        {headers:{
            'Accept': 'application/json', 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':`Bearer ${token}`}}
        )
        .then((response)=>
            {
                setUserDB(response.data)
                // console.log('created')
            })
        .catch((e)=>console.log(e))
    },[run])


    return (
        <div>
            <h1>Hi {user}</h1>
            <h3>Add to List!</h3>
            {
            <a style={{position:'absolute',top:'5%',right:'5%',cursor:'pointer'}} onClick={LogOut}>Logout</a>
            // <button onClick={checkLogin}>Check Login1</button>
            }
            <InputGroup className="mb-3">
            <FormControl placeholder="Add to To Do" onSubmit={AddToDB} onChange={(e)=>{setTodo(e.target.value)}} value={todo}/>
            <InputGroup.Append>
              <Button variant="primary" type="submit" onClick={AddToDB}>Add</Button>
            </InputGroup.Append>
            </InputGroup>

            <h3>Your To Do List are:</h3>
            <div>      
            {   userDB.length!==0?
                userDB.map((el)=>(
                    <div  key={el.id} style={{display:'flex'}}>
                    <p style={{marginRight:'auto'}}>{el.list}</p>
                    <p style={{marginLeft:'auto'}} onClick={deleteItem}><a style={{cursor:'pointer'}} id={el.id}  >X</a></p>
                    
                    </div>
                    )):
                    <div>
                    <p>Empty!</p>
                    <p> Don't worry, Create New To Do's</p>
                    </div>
            }
            </div>    
            
        </div>
    )

    // CRUD Operations*******************************************

    function AddToDB(e){
        e.preventDefault();
        const data={
            username:user,
            todo:todo
        }
        if(todo!=''){
        e.target.value='';
        axios.post('http://127.0.0.1:3333/createtodo',{...data},
                {headers:{ 'Authorization':`Bearer ${token}`}})
            .then((response)=>{
                setRun(!run)
                setTodo('')
            })  
            .catch((e)=>
            console.log(e)
            )  
        }else{
            alert('No Empty todo allowed!')
        }
    }

    function deleteItem(e){
        e.preventDefault();
        axios.delete(`http://127.0.0.1:3333/deleteTodo/${e.target.id}`,
        {headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>
            {
                // console.log(response)
                setRun(!run)
            })
        
        .catch((e)=>console.log(e))
        
    }


    function LogOut(e){
        e.preventDefault();    
        axios.post('http://127.0.0.1:3333/logout',{headers:{'Authorization':`Bearer ${token}`}})
            .then((response)=>{
            console.log(response)
            setUser('');
            history.push('/');
            })  
            .catch((e)=>
            console.log(e)
            )
      }
}
