import React, { Component } from 'react';
//import './css/App.css';
import './css/materialize.min.css';
import './css/login.css';
//import './css/index.css';

class login extends Component {

  render() {
    return (
        <div class="grey lighten-4" >
            <span class="br-2"></span>
            <div class="container">
            <form class="white" style={{border: '1px solid light grey'}}
                onSubmit={(event)=>{event.preventDefault(); this.props.login(this.refs.user.value,this.refs.psw.value)}}>
                <h2 class="center"><b>Waiter</b></h2>
                <div class="row">
                <div class="input-field col s10 offset-s1">
                    <input placeholder="Username" id="username" type="text" class="validate" ref="user"/>
                </div>
                </div>
                <div class="row">
                <div class="input-field col s10 offset-s1">
                    <input placeholder="Password" id="password" type="password" class="validate" ref="psw"/>
                </div>
                </div>
                <span class="br-1"></span>
                <div class="center-align">
                <button class="btn deep-orange black-text" type="submit" name="action">Accedi</button>
                </div>
                <span class="br-2"></span>
            </form>
            </div>
        </div>
    );
  }
}

export default login;
