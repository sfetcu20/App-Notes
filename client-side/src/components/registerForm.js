import { Component } from "react/cjs/react.production.min";
import './registerForm.css'
import axios from "axios";
export default class LoginForm extends Component{


    handleSubmit = async (event) =>{
        event.preventDefault();
          const data={
            name:this.name,
            email : this.email,
            password :this.password
        }
        var myJSON=JSON.stringify(data);
       
       const res= await axios.post('http://localhost:8080/api/user/register',myJSON,{headers:{
            'Content-Type': 'application/json;charset=UTF-8',
             'Access-Control-Allow-Origin':'*'
        }})
    
        console.log(res.data);
        
    }
render(){
    return(
        <div class="regForm">
            <form onSubmit={this.handleSubmit}>
            <label for="name">Choose name:</label>
            <input type="text" id="name" name="Name" placeholder="Name" onChange={e=>this.name=e.target.value}/><br/>
            <label for="email">Enter Email:</label>
                <input type="email" id="email" name="Email" placeholder='Email@stud.ase.ro' onChange={e=>this.email=e.target.value}/>
                <br/>
                
                <label for="password">Enter Password:</label>
                <input type='password' id="password" name="Password" placeholder="Password" onChange={e=>this.password=e.target.value}/>
                <br/>
                <input class="butoane" type="submit" value="Register"/>
            </form>
        </div>
    );
}

}