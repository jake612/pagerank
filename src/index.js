import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Node_Info{
    constructor(name, val, x, y){
        this.name = name;
        this.val = val;
    }
}

class Node extends Component {

    constructor(props){
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y
        }
    }

    event_wrapper(e){
        this.props.on_select();
        if (e.button === 0) {
            this.drag_event();
        } else if (e.button === 2){
            
        }
    }

    // General outline at w3schools
    drag_event(){
        let move = (e) => {
            console.log(e)
            this.setState({
                x: e.pageX - 25,
                y: e.pageY - 105
            }); 
        }

        let end_drag = (e) => {
            document.onmouseup = null;
            document.onmousemove = null;
        }
                
        document.onmousemove = move;
        document.onmouseup = end_drag;
    }

    render(){

        let className = "node_info"
        if (this.props.selected){
            className += " node_selected"
        }

        return <div className={className} onMouseDown={(e)=>this.event_wrapper(e)} style={{
                position: "absolute",
                top: this.state.y + "px",
                left: this.state.x + "px",
                backgroundColor: "white",
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

class Navbar extends Component {
    render(){
        return <div className="navbar">
            <button className="nav_button" onClick={this.props.addNode}>Add</button>
            <button className="nav_button" onClick={this.props.deleteNode}>Delete</button>
        </div>
    }
}

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            node_num: 0,
            nodes: [],
            selected_node: null,
        }

    }

    select_node = (node) => {
        console.log(node);
        this.setState({selected_node: node})
    }

    delete_node = () => {
        let delete_index = this.state.nodes.indexOf(this.state.selected_node);
        console.log(delete_index)
        if (delete_index > -1){
            let new_arr = this.state.nodes
            new_arr.splice(delete_index, 1)
            console.log(new_arr)
            this.setState({
                select_node: null,
                nodes: new_arr
            })
        }
    }

    is_selected = (node) => node === this.state.selected_node;

    add_node = () =>{
        this.setState((state) => {
            return {
                node_num: state.node_num += 1,
                nodes: state.nodes.concat(new Node_Info(state.node_num, 1))};
          });
    }

    render(){
        return <div className="app">
            {this.state.nodes.map(node => <Node name={node.name} val={node.val} x={50} y={50} 
            selected={this.is_selected(node)} on_select={() => this.select_node(node)}/>)}
            <Navbar addNode={this.add_node} deleteNode={this.delete_node} />
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))

