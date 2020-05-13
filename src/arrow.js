import React, {Component} from 'react';

export let arrow_info = (startx, starty, endx, endy) => {
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
}

export class Arrow extends Component{

    render(){
        return <div className="arrow" style={{
            width: this.props.width + "px",
            position: "absolute",
            top: this.props.y + "px",
            left: this.props.x + "px",
            transform: "rotate(" + this.props.angle.toString() + "deg) translate(0, -100%)",
        }}>
            <div className="line"></div>
            <div className="center" style={{
                position: "absolute",
                top: "5px",
                left: "20px",
                margin: "auto",
                width: "10px",
                height: "10px",
                backgroundColor: "green"
            }}></div>
            <div className="pointer"></div>
        </div>
    }
}