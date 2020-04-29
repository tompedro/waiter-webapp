import React , { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/materialize.min.css';
import Main from './Main';
import Seller from './Seller';
import Login from './login';
import Signin from './signin';
import Home from './Home';

class App extends Component {
    constructor(props) {  
      super(props);
      this.state = { restaurants:[],menus:{},done:false, init:true, login:false,signin:false,
                    username : "", isSeller : false, messages : []};
      this.getMenus = this.getMenus.bind(this);
      this.getRestaurants = this.getRestaurants.bind(this);
      this.logIn = this.logIn.bind(this);
      this.signIn = this.signIn.bind(this);
      this.getMessages = this.getMessages.bind(this);
      this.order = this.order.bind(this);
      this.switchL = this.switchL.bind(this);
      this.switchS = this.switchS.bind(this);
      this.postDish = this.postDish.bind(this);
    }

    order(rest_name,dish_name){
      fetch("http://localhost:3000/api/order",{
        method: 'post',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : "dish="+dish_name.toString() + "&rest="+rest_name.toString() + "&user=" + this.state.username
      }).then(res => res.text())
        .then(res => alert(res))
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

    logIn(logNAME,logPSW){
      if(this.state.username === ""){
        fetch("http://localhost:3000/api/login",{
          method: 'post',
          headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
          body : "name=" + logNAME +
                  "&password=" + logPSW
        })
        .then(res => res.text())
        .then((res) => {
          if(res != "error"){
            let n = res[res.length-1];
            alert(res.substr(0,res.length-1));
            this.setState({username:res.substr(0,res.length-1)});

            if(n == "1"){
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
    
    signIn(user,psw,name,isSeller){
      console.log(user, psw , name ,isSeller);
      if(this.state.username === ""){
        fetch("http://localhost:3000/api/signin",{
          method: 'post',
          headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
          body : "name=" + user +
                 "&isSeller=" + isSeller+
                 "&password=" + psw+
                 "&restname=" + name
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
    
    switchL(){
        this.setState({login:!this.state.login});
    }

    switchS(){
      this.setState({signIn:!this.state.signin});
    }

    postDish(name,price){
      fetch("http://localhost:3000/api/postDish",{
        method: 'post',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : "username=" + this.state.username + "&name=" + name + "&price=" + price
      })
          .then(res => res.text())
          .then(res => alert(res))
    }
    
    componentWillMount(){
      this.getRestaurants();
    }

    render(){
      let form;
      let page;

      if(this.state.login){
        form = (<Login login = {this.logIn}/>);
      }else if(this.state.signin){
        form = (<Signin signin = {this.signIn}/>);
      }else{
        form = (<Home Login = {()=> {this.setState({login:true})}} Signin = {()=> {this.setState({signin:true})}}/>);
      }

      if(this.state.isSeller){
        page = (<Seller username = {this.state.username} postDish = {this.postDish} messages = {this.state.messages} />);
      }
      else{
        page = (<Main username = {this.state.username} restaurants = {this.state.restaurants} order = {this.order} menus = {this.state.menus}/>);
      }

      if(!this.state.done){
        page = (<p>In CARICAMENTO...</p>);
      }

      return (
        <div className="App">
          {
            this.state.init ?
            form
            :
            page
          }
        </div>
            
      );
    }
}

export default App;
