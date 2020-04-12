import React , { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Seller from './Seller';

class App extends Component {
    constructor(props) {  
      super(props);
      this.state = { restaurants:[],menus:{},done:false, init:true, login:true,
                    username : "", isSeller : false, messages : []};
      this.getMenus = this.getMenus.bind(this);
      this.getRestaurants = this.getRestaurants.bind(this);
      this.logIn = this.logIn.bind(this);
      this.signIn = this.signIn.bind(this);
      this.getMessages = this.getMessages.bind(this);
    }

    getRestaurants() {
        fetch("http://localhost:3000/api/getRestaurants")
            .then(res => res.json())
            .then(res => res = Object.values(res))
            .then(res => this.setState({ restaurants: res })) 
            .then(res => this.getMenus())
    }

    getMenus() {
      fetch("http://localhost:3000/api/getMenus")
          .then(res => res.json())
          .then(res => this.setState({ menus: res }))
          .then(res => this.setState({done:true}))
    }

    getMessages() {
      fetch("http://localhost:3000/api/getMessages",{
        method: 'post',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : "username=" + this.state.username
      })
          .then(res => res.json())
          .then(res => res = Object.values(res))
          .then(res => this.setState({ messages: res, done:true})) 
    }

    logIn(){
      if(this.state.username === ""){
        fetch("http://localhost:3000/api/login",{
          method: 'post',
          headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
          body : "name=" + this.refs.logName.value +
                  "&password=" + this.refs.logPsw.value
        })
        .then(res => res.text())
        .then((res) => {
          if(res != "error"){
            this.setState({username:this.refs.logName.value});

            if(res == "1"){
              this.setState({isSeller:true});
              alert("sei un venditore");
              this.getMessages();
            }else{
              this.setState({isSeller:false});
              alert("sei un compratore");
              this.getRestaurants();
            }
            
          }else{
            //
            console.log("errore di login");
          }
        })
        .then(res => this.setState({init:false}))
      }
    }
    
    signIn(){
      if(this.state.username === ""){
        fetch("http://localhost:3000/api/signin",{
          method: 'post',
          headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
          body : "name=" + this.refs.uname.value +
                 "&isSeller=" + this.refs.cb.checked.toString()+
                 "&password=" + this.refs.psw.value
        })
        .then(res => res.text())
        .then(res => alert(res))
        .then(res => {
          if(res != "error"){
            this.setState({init:false});
          }else{
            console.log(res);
          }
        })
      }
    }
    
    componentWillMount(){
      this.getRestaurants();
    }

    render(){
      return (
        <div className="App">
          <header className="App-header">
            WELCOME TO WAITER APP
          </header>
          {
            this.state.init ?
            (this.state.login ?
            <div>
              <form onSubmit={(event) => {
                event.preventDefault()
                this.logIn()
                }}>
                  <label for="uname"><b>Username</b></label>
                  <input style = {{width : "133%"}}className = "form-control" type="text" placeholder="Enter Username" ref="logName"/>

                  <label for="psw"><b>Password</b></label>
                  <input style = {{width : "133%"}}className = "form-control" type="password" placeholder="Enter Password" ref="logPsw"/>

                  <button type="submit" className="btn btn-primary" >Log In</button>
              </form>
                    
            </div>
            :
            <div>
              <form onSubmit={(event) => {
                event.preventDefault()
                this.signIn()
                }}>
                  <label for="uname"><b>Username</b></label>
                  <input style = {{width : "133%"}}className = "form-control" type="text" placeholder="Enter Username" ref="uname"/>

                  <label for="psw"><b>Password</b></label>
                  <input style = {{width : "133%"}}className = "form-control" type="password" placeholder="Enter Password" ref="psw"/>

                  <label for="psw"><b>Are you a seller?</b></label>
                  <input style = {{width : "133%"}} className = "form-control" type="checkbox" ref="cb"/>

                  <button type="submit" className="btn btn-primary" >Sign In</button>
              </form>
                    
            </div>
            ):
            (!this.state.isSeller ? 
            <div>
            {
              this.state.done ?
              <Main restaurants = {this.state.restaurants} menus = {this.state.menus}/>
              :
              <p>IN CARICAMENTO...</p>
            }
            </div>
            :
            <div>
            {
              this.state.done ?
              <Seller messages = {this.state.messages}/>
              :
              <p>IN CARICAMENTO...</p>
            }
            </div>)
          }
          
        </div>
            
      );
    }
}

export default App;

