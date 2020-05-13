import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Navbar} from './navbar.js';
import {Node} from './node.js';
import {Arrow, arrow_info} from './arrow.js';

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
            nodes: new Set(),
            edges: new Set(),
            selected_node: null,
        }

    }

    array_event = (e) => {
        if (e.button != 2 || this.state.selected_node === null) {
            return
        }

        let target_node = this.state.selected_node;

        let end_drag = (event) => {
            let target_elem = event.target;
            if (target_elem.className === "node_name" || target_elem.className === "node_val") target_elem = target_elem.closest("div");
            try{
                let id = target_elem.id
                let dest_node = Array.from(this.state.nodes).filter((node)=>node.name===id);
                if (dest_node.length !==0){
                    let edge = new Edge_Info(target_node, dest_node[0]);
                    console.log(edge);
                    this.setState(state=>{edges: state.edges.add(edge)});
                }

            }catch(err){
                console.log(err);
            }

            document.onmouseup = null;
        }

        document.onmouseup = end_drag;
    }

    add_edge = (target_node, dest_node) => this.setState((state)=>{edges: state.edges.add(new Edge_Info(target_node, dest_node))})

    delete_edge = (edge) => this.setState((state)=>{edges: state.edges.delete(edge)})

    // General outline at w3schools
    drag_event(node){
        let move = (e) => {
            let new_set = this.state.nodes;
            new_set.delete(node);
            node.x = e.pageX - 25;
            node.y = e.pageY - 105;
            new_set.add(node);
            this.setState({
                nodes: new_set
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
        let new_set = this.state.nodes;
        new_set.delete(this.state.selected_node);
        this.setState({
            selected_node: null,
            nodes: new_set
        })
    }

    is_selected = (node) => node === this.state.selected_node;

    add_node = () =>{
        this.setState((state) => {
            return {
                node_num: state.node_num += 1,
                nodes: state.nodes.add(new Node_Info(state.node_num.toString(), 1, 50, 50))};
          });
    }

    render(){

        return <div className="app" onMouseDown={this.array_event}>
            {Array.from(this.state.nodes).map(node =>{
                return <Node id={node.name} name={node.name} val={node.val} x={node.x} y={node.y} selected={this.is_selected(node)} on_select={() => this.select_node(node)} drag_event={()=>this.drag_event(node)}/>
            })}

            {Array.from(this.state.edges).map(edge=>{
                //let info = arrow_info(edge.target_node.x, edge.target_node.y, edge.dest_node.x, edge.dest_node.y);
                return <Arrow target_node={edge.target_node} dest_node={edge.dest_node}/>})}
            
            <Navbar addNode={this.add_node} deleteNode={this.delete_node} />
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))
