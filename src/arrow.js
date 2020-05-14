import React, {Component} from 'react';


export class Arrow extends Component{

    calc_line_end = (target, dest) =>{
        let angle = Math.atan2(dest.y - target.y, dest.x-target.x);
        let x1 = 35 * Math.cos(angle) + target.x + 25;
        let y1 = 35 * Math.sin(angle) + target.y + 25;
        return [x1, y1]
    }

    render(){
        let color = "black";
        if (this.props.selected){
            color = "red";
        }
        let target_coords = this.calc_line_end(this.props.target_node, this.props.dest_node);
        let dest_coords = this.calc_line_end(this.props.dest_node, this.props.target_node);
        return <line onClick={this.props.on_select} x1={target_coords[0]} y1={target_coords[1]} x2={dest_coords[0]} y2={dest_coords[1]} stroke={color} strokeWidth="1.5" marker-end="url(#arrowhead)"/>
    }
}