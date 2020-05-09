import React, {Component} from 'react';

export let arrow_info = (edge) => {
    let info = new Map(); // Map for the info to be returned

    let target_node = edge.target_node;
    let dest_node = edge.dest_node;

    info.set("x", Math.floor((target_node.x + dest_node.y)/2))
    info.set("y", Math.floor((target_node.y + dest_node.y)/2))
    info.set("width", Math.floor(Math.sqrt(Math.pow(dest_node.x - target_node.x, 2) + Math.pow(dest_node.y - target_node.y, 2)))-50)

    return info;
}

export class Arrow extends Component{

    render(){
        return <div className="arrow" style={{
            display: "flex",
            width: this.props.width + "px",
            height: "20px",
            position: "absolute",
            top: this.props.y + "px",
            left: this.props.x + "px",
            transform: "rotate(" + this.props.angle.toString() + "deg)"
        }}>
            <div className="line"></div>
            <div className="pointer"></div>
        </div>
    }
}