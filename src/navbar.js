import React, {Component} from 'react';

export class Navbar extends Component {
    render(){
        return <div className="navbar">
            <div className="nav_section">
                <div className="button_wrapper"><button className="nav_button" onClick={this.props.addNode}>Add</button></div>
                <div className="button_wrapper"><button className="nav_button" onClick={this.props.deleteNode}>Delete</button></div>
            </div>
            <div className="divider" />
            <div className="nav_section">
                <div className="button_wrapper"><button className="nav_button" onClick={this.props.nextRank}>Next</button></div>
            </div>
        </div>
    }
}