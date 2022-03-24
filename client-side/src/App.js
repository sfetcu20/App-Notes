import React from "react";
import "./app.css";
import LoginForm from './components/loginform'
import RegisterForm from './components/registerForm'
import axios from "axios";
import App_notes from "./app_notes";
class App extends React.Component {
   constructor(props){
     super(props)
     this.state={
       
     }
   }
     
   async componentDidMount(){
     const config={
        headers: {
          authtoken: localStorage.getItem('token')
        }
     }
     const res= await axios.get('http://localhost:8080/api/posts/hasToken',config);
     if(res.status==200) this.setState({
            LoggedIn:true
     });
     if (res.status==200) console.log(res.status);
    
   }
    render(){
   if (this.state.LoggedIn) return (
     <div>
       <App_notes />
     </div>
  );
  else return(
    <div class="logbody">
      <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
        overflow:hidden;
      }
    `}</style>
      <div class='nav'><h1 class="NA">Notes Application</h1></div>
        <LoginForm/>
        <RegisterForm/>
    </div>
  );
  }
}

export default App;
