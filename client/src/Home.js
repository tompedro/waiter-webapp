import React, { Component } from 'react';
import './css/App.css';
import './css/index.css';
import './css/materialize.min.css'

class Home extends Component {

  render() {
    return (
        <div class="cyan lighten-4">
            <div class="card-panel cyan row">
            <h2 class="col s9" style={{marginLeft: 0}}>Benvenuto su <b>Waiter</b>!</h2>
            <button onClick = {(event)=>{event.preventDefault(); this.props.Signin();}} class="col s1 btn deep-orange black-text" type="submit" name="action" style={{marginTop : 50}}>Sign In</button>
            <button onClick = {(event)=>{event.preventDefault(); this.props.Login();}} class="col s1 btn deep-orange black-text" type="submit" name="action" style={{marginLeft: 30},{marginTop: 50}}>Login</button>
            </div>

            <div class="container">
            <h4>Cosa è <b>Waiter</b>?</h4>
            <p>É un semplice sito costruito con HTML, Materialize e altro di cui sa il mio socio, che permette a ristoratori e a tutte le persone confinate in casa a causa del COVID-19 di mettersi in contatto.</p>
            <span class="br-medium"></span>

            <h4>Chi siamo?</h4>
            <p>Siamo due studenti del Liceo Ariosto Spallanzani di Reggio Emilia che frequentano il corso informatico.</p>
            <span class="br-medium"></span>

            <h4>Cosa facciamo?</h4>
            <p>Essendo studenti in un corso informatico stiamo imparando le basi dei siti Web.</p> 
            <span class="br-medium"></span>

            <h4>Sono un ristoratore, cosa devo fare?</h4>
            <p>Se sei un ristoratore ti basterà registrarti schicciando il pulsante Sign In in alto a destra.</p>
            <span class="br-medium"></span>

            <h4>Vorrei comprare la cena, come faccio?</h4>
            <p>Per aquistare la cena ti basterà registrarti come acquirente e contattare il ristorante.</p>
            <span class="br-medium"></span>
            </div>

        </div>
    );
  }
}

export default Home;
