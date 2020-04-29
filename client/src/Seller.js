import React, { Component } from 'react';
import './css/App.css';
import './css/materialize.min.css'

class Main extends Component {

  render() {
    return (
        <div>
        <h3>Hi {this.props.username}</h3>
        <form onSubmit={(event)=>{
          event.preventDefault()
          this.props.postDish(this.refs.name.value,this.refs.cost.value)
        }}>
            <label for="uname"><b>Dish name</b></label>
            <input style = {{width : "133%"}}className = "form-control" type="text" placeholder="Enter Name" ref="name"/>

            <label for="psw"><b>Dish price</b></label>
            <input style = {{width : "133%"}}className = "form-control" type="text" placeholder="Enter Price" ref="cost"/>

            <button type="submit" className="btn btn-primary" >Post</button>
        </form>
        {
          this.props.messages.map((a,b)=>
            <div>
            <p>{a}</p>
            <p>{a[0]} {a[1]} {a[2]} {a[3]}</p>
            </div>
          )
        }
        </div>
    );
  }
}

export default Main;
