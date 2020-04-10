import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
        <div>
        {
          this.props.messages.map((a,b)=>
            <div>
            <p>{a}</p>
            </div>
          )
        }
        </div>
    );
  }
}

export default Main;
