import react from 'react'
import axios from 'axios'
import { Component } from 'react/cjs/react.production.min';
import './loginform.css';
export default class LoginForm extends Component{

    handleSubmit = async (event) =>{
        event.preventDefault();
          const data={
            email : this.email,
            password :this.password
        }
        var myJSON=JSON.stringify(data);
       try{
       const res= await axios.post('http://localhost:8080/api/user/login',myJSON,{headers:{
            'Content-Type': 'application/json;charset=UTF-8',
             'Access-Control-Allow-Origin':'*'
        }})
    
        if(res.headers['authtoken']) localStorage.setItem('token',res.data);
        console.log(res.headers['authtoken']);
        console.log(res);
        window.location.reload();
    }
    catch(err){
        
        console.log(err);
    }
    }

    render(){
        return(
            <div class='formdiv'>
            <form onSubmit={this.handleSubmit}>
                <label for="email">Enter Email:</label>
                <input type="text" id="email" name="Email" placeholder='Email@stud.ase.ro' onChange={e=>this.email=e.target.value}/>
                <br/>

                <label for="password">Enter Password:</label>
                <input type='password' id="password" name="Password" placeholder="Password" onChange={e=>this.password=e.target.value}/>
                <br/>
                <input class="butoane" type="submit" value="Login"/>
            </form>
            </div>
        );
    }    
}
