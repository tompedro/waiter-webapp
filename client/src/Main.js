import React, { Component } from 'react';
import './css/App.css';
import './css/materialize.min.css'

class Main extends Component {

  render() {
    return (
        <div>
        <h3>Hi {this.props.username}</h3>
          <h5>Here there are the dishes you can buy : </h5>
        {
          this.props.restaurants.map((rest_name,rest_index)=>
            <div>
            <p>{rest_name}</p>
            {
              this.props.menus[this.props.restaurants[rest_index]].map((dish_info,dish_index)=>
                <div>
                  <p>{dish_info[0]} : {dish_info[1]}</p>
                  <button onClick={(event) => this.props.order(rest_name,dish_info[0])}>ORDER!</button>
                </div>
              )
            }
            </div>
          )
        }
        </div>
    );
  }
}

export default Main;
