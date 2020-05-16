
export let pagerank_calc = (nodes, edges) => {

    let out_degree = new Map();
    let incoming_edges = new Map();
    // I'm processing them this way to prevent nodes with no in or out edges from being left out
    nodes.forEach(node => {
        out_degree.set(node, 0);
        incoming_edges.set(node, new Set());
    });

    // Populating the maps
    edges.forEach(edge => {
        let target_node = edge.target_node;
        let dest_node = edge.dest_node;
        out_degree.set(target_node, out_degree.get(target_node) + 1);
        incoming_edges.set(dest_node, "hi"); //incoming_edges.get(dest_node).add(target_node)
    });

    console.log(incoming_edges);

    let return_set = new Set();
    incoming_edges.forEach((incoming_nodes, node) => {
        console.log(incoming_nodes);
        console.log(node);
        let new_val = 0;
        incoming_nodes.forEach(inc_node => {
            console.log(inc_node.val);
            new_val += inc_node.val / out_degree.get(inc_node);
        });
        let new_node = node;
        new_node.val = new_val.toFixed(4);
        return_set.add(new_node);
    });

    return return_set;
}