import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
        <div>
        {
          this.props.restaurants.map((a,b)=>
            <div>
            <p>{a}</p>
            {
              this.props.menus[this.props.restaurants[b]].map((a,b)=>
                <p>{a[0]} : {a[1]}</p>
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
