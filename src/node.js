import React, {Component} from 'react';

export class Node extends Component {

    event_wrapper(e){
        if (e.button === 0){
            this.props.on_select();
            this.props.drag_event();
        } 
    }


    render(){
        let className = "node_info"
        if (this.props.selected){
            className += " node_selected"
        }

        return <div id={this.props.id} className={className} onMouseDown={(e)=>this.event_wrapper(e)} style={{
                position: "absolute",
                top: this.props.y + "px",
                left: this.props.x + "px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column"
            }}>
                <p className="node_name">{this.props.name}</p>
                <p className="node_val">{this.props.val}</p>
            </div>
        
    }
}