import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Navbar} from './navbar.js';
import {Node} from './node.js';
import {Arrow} from './arrow.js';

class Node_Info{
    constructor(name, val, x, y){
        this.name = name;
        this.val = val;
        this.x = x;
        this.y = y;
        this.degree = 0;
    }
}

class Edge_Info{
    constructor(target_node, dest_node){
        this.target_node = target_node;
        this.dest_node = dest_node;
    }
}


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            node_num: 0,
            nodes: [],
            edges: Set(),
            selected_node: null,
        }

    }

    add_edge = (target_node, dest_node) => this.setState((state)=>{edges: state.edges.add(new Edge_Info(target_node, dest_node))})

    delete_edge = (edge) => this.setState((state)=>{edges: state.edges.delete(edge)})

    // General outline at w3schools
    drag_event(node){
        let index = this.state.nodes.indexOf(node);
        let move = (e) => {
            node.x = e.pageX - 25;
            node.y = e.pageY - 105;
            let updated_arr = this.state.nodes;
            updated_arr[index] = node;
            this.setState({
                nodes: updated_arr
            }); 
        }

        let end_drag = (e) => {
            document.onmouseup = null;
            document.onmousemove = null;
        }
                
        document.onmousemove = move;
        document.onmouseup = end_drag;
    }

    select_node = (node) => {
        this.setState({selected_node: node})
    }

    delete_node = () => {
        let delete_index = this.state.nodes.indexOf(this.state.selected_node);
        if (delete_index > -1){
            let new_arr = this.state.nodes
            new_arr.splice(delete_index, 1)
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
                nodes: state.nodes.concat(new Node_Info(state.node_num, 1, 50, 50))};
          });
    }

    render(){
        return <div className="app" onMouseDown={()=>this.arrow_event()}>
            {this.state.nodes.map(node => <Node name={node.name} val={node.val} x={node.x} y={node.y}
            //{this.state.edges.values.map(edge => <Arrow f)}
            selected={this.is_selected(node)} on_select={() => this.select_node(node)} drag_event={()=>this.drag_event(node)}/>)}
            <Navbar addNode={this.add_node} deleteNode={this.delete_node} />
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))

// <Arrow x={50} y={50} width={200} angle={0} />