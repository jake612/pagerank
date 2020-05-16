import {Edge_Info} from "./index.js";

export let pagerank_calc = (nodes, edges) => {
    let mapping = new Map();

    let out_degree = new Map();
    let incoming_edges = new Map();
    // I'm processing them this way to prevent nodes with no in or out edges from being left out
    nodes.forEach(node => {
        mapping.set(node.name, node);
        out_degree.set(node.name, 0);
        incoming_edges.set(node.name, new Set());
    });

    // Populating the maps
    edges.forEach(edge => {
        console.log(edge);
        let target_node = edge.target_node.name;
        let dest_node = edge.dest_node.name;
        out_degree.set(target_node, out_degree.get(target_node) + 1);
        incoming_edges.set(dest_node, incoming_edges.get(dest_node).add(target_node)); //
    });

    let return_nodes = new Set();
    let name_to_new_node = new Map();
    incoming_edges.forEach((incoming_nodes, node) => {
        let new_val = 0;
        incoming_nodes.forEach(inc_node => {
            let val = mapping.get(inc_node).val;
            new_val += val / out_degree.get(inc_node);
        });
        let new_node = Object.assign({}, mapping.get(node));
        new_node.val = new_val.toFixed(4);
        name_to_new_node.set(node, new_node);
        return_nodes.add(new_node);
    });

    let return_edges = new Set();
    edges.forEach(edge =>{
        let target = name_to_new_node.get(edge.target_node.name);
        let dest = name_to_new_node.get(edge.dest_node.name);
        return_edges.add(new Edge_Info(target, dest));
    });

    return [return_nodes, return_edges];
}