import React, { Component } from 'react';
import './css/App.css';
import './css/materialize.min.css';
import './css/signin.css';
import './css/index.css';

class signin extends Component {

  render() {
    return (
        <div class="grey lighten-4">
            <div class="container">
            <span class="br-2"></span>
            <form class="white" onSubmit={(event)=>{event.preventDefault();
                this.props.signin(this.refs.user.value,this.refs.psw.value,this.refs.name.value,this.refs.seller.checked.toString())}} >
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
                <div class="row">
                <div class="col s10 offset-s1">
                    <p>Scegli:</p>
                    <p>
                    <label>
                        <input type="radio" name="chi-sei" class="deep-orange"/>
                        <span class="black-text">Sono un compratore</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="radio" name="chi-sei" class="deep-orange" ref="seller"/>
                        <span class="black-text">Sono un venditore</span>
                    </label>
                    </p>
                </div>
                </div>
                <div class="row" id="punto-vendita">
                    <div class="input-field col s10 offset-s1">
                        <input placeholder="Punto vendita" type="text" class="validate" ref="name"/>
                    </div>
                </div>
                <span class="br-1"></span>
                <div class="center-align">
                <button class="btn deep-orange black-text" type="submit" name="action">Registrati</button>
                </div>
                <span class="br-2"></span>
            </form>
            </div>
        </div>
    );
  }
}

export default signin;
