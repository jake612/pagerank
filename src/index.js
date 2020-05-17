import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Navbar} from './navbar.js';
import {Node} from './node.js';
import {Arrow} from './arrow.js';
import {pagerank_calc} from "./pagerank.js";

export class Node_Info{
    constructor(name, val, x, y){
        this.name = name;
        this.val = val;
        this.x = x;
        this.y = y;
        this.degree = 0;
        this.type = "node";
    }
}

export class Edge_Info{
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
            damp_val: 1,
            selected_elem: null,
            drag_arrow: null
        }
        this.node_chars = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        document.onkeydown = this.handle_keypress;

    }

    next_rank = () => {
        let return_info = pagerank_calc(this.state.nodes, this.state.edges, this.state.damp_val);

        this.setState({
            selected_elem: null,
            nodes: return_info[0],
            edges: return_info[1]
        });
    }

    array_event = (e) => {
        if (e.button !== 2 || this.state.selected_elem === null) {
            return;
        }

        let target_node = this.state.selected_elem;

        let end_drag = (event) => {
            let target_elem = event.target;
            if (target_elem.className === "node_name" || target_elem.className === "node_val") target_elem = target_elem.closest("div");
            try{
                let id = target_elem.id
                let dest_node = Array.from(this.state.nodes).filter((node)=>node.name===id);
                if (dest_node.length === 1){
                    let edge = new Edge_Info(target_node, dest_node[0]);
                    let new_set = this.state.edges.add(edge);
                    this.setState({edges: new_set});
                }
                console.log(this.state.edges);

            }catch(err){
                console.log(err);
            }
            document.onmouseup = null;
            document.onmousemove = null;
            this.setState({drag_arrow: null});
        }

        let arrow_drag = (event) => {
            let new_node =  new Node_Info("", "", event.pageX, event.pageY - 80);
            this.setState({drag_arrow: new_node});
        }

        document.onmousemove = arrow_drag;
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

    update_node = (original_node, updater) => {
        let new_nodes = this.state.nodes;
        new_nodes.delete(original_node);
        new_nodes.add(updater(original_node));
        this.setState({nodes: new_nodes});
    }

    delete_elem = () => {
        if (this.state.selected_elem === null) return;
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
                selected_elem: null,
                node_num: state.node_num += 1,
                nodes: state.nodes.add(new Node_Info(state.node_num.toString(), "0.5", 50, 50))};
          });
          console.log(this.state.nodes);
    }

    handle_keypress = (e) => {
        if (this.state.selected_elem !== null){
            let key = e.key;
            if (key === "Delete"){
                this.delete_elem();
                return;
            }

            if (this.state.selected_elem.type === "node"){
                let val_string = this.state.selected_elem.val.toString();
                if (val_string === "0") val_string = "0.";
                if (key === "Backspace"){
                    this.update_node(this.state.selected_elem, (node) => {
                        node.val = val_string.substring(0, val_string.length - 1);
                        return node;
                    });
                } else if (this.node_chars.has(key)){
                    this.update_node(this.state.selected_elem, (node) =>{
                        node.val = val_string + key;
                        return node;
                    });
                }
            }
        }
    }

    textChange = (e) => {
        let val = e.target.value;
        console.log(val);
        if (isNaN(parseFloat(val))) val = "0";
        this.setState({
            damp_val: val});
    }

    render(){
        let drag_arrow;
        if (this.state.drag_arrow !== null){
            drag_arrow = <Arrow selected={false} target_node={this.state.selected_elem} dest_node={this.state.drag_arrow} />;
        } else{
            drag_arrow = <div />
        }
        return <div className="app" onMouseDown={this.array_event}>

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
            {drag_arrow}
            {Array.from(this.state.edges).map(edge=>{
                //let info = arrow_info(edge.target_node.x, edge.target_node.y, edge.dest_node.x, edge.dest_node.y);
                return <Arrow selected={this.is_selected(edge)} on_select={() => this.select_elem(edge)} target_node={edge.target_node} dest_node={edge.dest_node}/>})}
            </svg>
            
            <Navbar addNode={this.add_node} deleteNode={this.delete_elem} nextRank={this.next_rank} damp_val={this.state.damp_val} textClick={()=>this.setState({selected_elem: null})} textChange={this.textChange}/>

        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))
