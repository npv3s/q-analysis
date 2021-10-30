import React, {useState} from "react";
import ReactDOM from "react-dom";
import {GraphConstructor} from "./graph-constructor";
import {IncidenceMatrix} from "./incidence-matrix";
import {QAnalysis} from "./q-analysis";

export type Node = string;

export type Edge = {
    from: Node
    to: Node
}

const App: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    return <>
        <GraphConstructor
            nodes={nodes} setNodes={setNodes}
            edges={edges} setEdges={setEdges}
        />
        <IncidenceMatrix nodes={nodes} edges={edges}/>
        <QAnalysis nodes={nodes} edges={edges}/>
    </>;
};

ReactDOM.render(<App/>, document.getElementById("app"));