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
        this.type = "node";
    }
}

class Edge_Info{
    constructor(target_node, dest_node){
        this.target_node = target_node;
        this.dest_node = dest_node;
        this.type = "edge";
    }
}


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            node_num: 0,
            nodes: new Set(),
            edges: new Set(),
            selected_elem: null,
        }

    }

    array_event = (e) => {
        if (e.button !== 2 || this.state.selected_elem === null) {
            return
        }

        let target_node = this.state.selected_elem;

        let end_drag = (event) => {
            let target_elem = event.target;
            if (target_elem.className === "node_name" || target_elem.className === "node_val") target_elem = target_elem.closest("div");
            try{
                let id = target_elem.id
                let dest_node = Array.from(this.state.nodes).filter((node)=>node.name===id);
                let edge = new Edge_Info(target_node, dest_node[0]);
                let new_set = this.state.edges.add(edge);
                if (dest_node.length !==0){
                    this.setState({edges: new_set});
                }

            }catch(err){
                console.log(err);
            }

            document.onmouseup = null;
        }

        document.onmouseup = end_drag;
    }

    add_edge = (target_node, dest_node) => this.setState((state)=>{edges: state.edges.add(new Edge_Info(target_node, dest_node))});

    delete_edge = (edge) =>{
        let new_edges = this.state.edges.delete(edge);
        this.setState({edges: new_edges});
    }

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

    select_elem = (elem) => {
        this.setState({selected_elem: elem});
    }

    delete_node = () => {
        let new_nodes = this.state.nodes;
        new_nodes.delete(this.state.selected_elem);
        let new_edges = this.state.edges;
        new_edges.forEach(edge => {
            if (edge.target_node === this.state.selected_elem || edge.dest_node === this.state.selected_elem){
                new_edges.delete(edge);
            }
        });
        this.setState({
            selected_elem: null,
            nodes: new_nodes,
            edges: new_edges
        });
    }

    delete_elem = () => {
        if (this.state.selected_elem.type === "node"){
            this.delete_node();
        }else{
            this.delete_edge(this.state.selected_elem);
        }
    }

    is_selected = (elem) => elem === this.state.selected_elem;

    add_node = () =>{
        this.setState((state) => {
            return {
                node_num: state.node_num += 1,
                nodes: state.nodes.add(new Node_Info(state.node_num.toString(), 1, 50, 50))};
          });
    }

    handle_keypress = (e) => {
        console.log("hello");
        if (this.state.selected_elem !== null && this.state.selected_elem.type === "node"){
            console.log(e.key);
        }
    }

    render(){

        return <div className="app" onMouseDown={this.array_event} onKeyDown={this.handle_keypress}>

            {Array.from(this.state.nodes).map(node =>{
                return <Node id={node.name} name={node.name} val={node.val} x={node.x} y={node.y} selected={this.is_selected(node)} on_select={() => this.select_elem(node)} drag_event={()=>this.drag_event(node)}/>
            })}
            <svg width={window.innerWidth} height={window.innerHeight - 80}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" />
                    </marker>
                </defs>
            {Array.from(this.state.edges).map(edge=>{
                //let info = arrow_info(edge.target_node.x, edge.target_node.y, edge.dest_node.x, edge.dest_node.y);
                return <Arrow selected={this.is_selected(edge)} on_select={() => this.select_elem(edge)} target_node={edge.target_node} dest_node={edge.dest_node}/>})}
            </svg>

            
            <Navbar addNode={this.add_node} deleteNode={this.delete_elem} />
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))
