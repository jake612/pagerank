import React, {Component} from 'react';

export let arrow_info = (startx, starty, endx, endy) =>{
    let info = new Map();
    info.set("width", endx-startx);
    info.set("height", endy-starty);
}

/*export let arrow_info = (startx, starty, endx, endy) => {
    let info = new Map(); // Map for the info to be returned
    let angle = Math.atan2(endy-starty, endx-startx) * 180 / Math.PI;
    let width = Math.floor(Math.sqrt(Math.pow(endx - startx, 2) + Math.pow(endy - starty, 2)));

    let offset = width * angle;

    if (startx <= endx){
        info.set("x", startx + 25);
    }else{
        info.set("x", endx +25);
    }

    if (starty <= endy){
        info.set("y", starty + 25);
    }else{
        info.set("y", endy + 25);
    }

    info.set("width", width);
    info.set("angle", angle);
    return info;
}*/

export class Arrow extends Component{
    render(){
        let y;
        let mirrory = 1;
        let mirrorx = 1;
        let x;

        if (this.props.target_node.x < this.props.dest_node.x){
            x = this.props.target_node.x;
        }else{
            x = this.props.dest_node.x;
            mirrorx = -1;
        } 

        if (this.props.target_node.y < this.props.dest_node.y){
            y = this.props.target_node.y;
        }else{
            y = this.props.dest_node.y;
            mirrory = -1;
        } 

        let pointer;
        if (mirrory === 1){
            if (mirrorx === 1){
                pointer = <div className="pointer" style={{bottom: "0px", right: "0px"}}></div>
            } else {
                pointer = <div className="pointer" style={{top: "0px", left: "0px", transform: "rotate(180deg)"}}></div>
            }
        } else{
            if (mirrorx === 1){
                pointer = <div className="pointer" style={{top: "0px", left: "0px", transform: "rotate(180deg)"}}></div>
            } else {
                pointer = <div className="pointer" style={{bottom: "0px", right: "0px"}}></div>
            }
        }

        console.log("mirrorx: " + mirrorx);
        console.log("mirrory: " + mirrory)
        
        return <div className="arrow" style={{
            width: Math.abs(this.props.target_node.x - this.props.dest_node.x) + "px",
            position: "absolute",
            top: y + 25 + "px",
            left: x + 25 + "px",
            height: Math.abs(this.props.target_node.y - this.props.dest_node.y) + "px",
            transform: "scale( " + mirrory + "," + mirrorx + ")"
        }}>
            <div className="line" style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "50%",
                    height: "5px",
                    backgroundColor: "black"}}></div>
                <div className="line" style={{
                    position: "absolute",
                    top: "0px",
                    left: "50%",
                    width: "5px",
                    height: "100%",
                    backgroundColor: "black"}}></div>
                <div className="line" style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "50%",
                    height: "5px",
                    backgroundColor: "black"}}></div>
                {pointer}
        </div>
    }
}