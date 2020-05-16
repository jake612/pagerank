import React, {Component} from 'react';

export class Navbar extends Component {
    render(){
        return <div className="navbar">
            <button className="nav_button" onClick={this.props.addNode}>Add</button>
            <button className="nav_button" onClick={this.props.deleteNode}>Delete</button>
            <button className="nav_button" onClick={this.props.nextRank}>Next</button>
        </div>
    }
}