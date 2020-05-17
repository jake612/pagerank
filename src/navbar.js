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
                <div className="button_wrapper">
                    <form className="damp_form">
                        <label for="damp">Dampening Value:</label>
                        <input type="number" id="damp" name="damp" min="0.0" max="1.0" step="0.1" value={this.props.damp_val} style={{width: "100%"}} onClick={this.props.textClick} onChange={this.props.textChange}/>
                    </form>
                </div>
            </div>
        </div>
    }
}