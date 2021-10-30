import React, {useRef, useState} from "react";
import {Edge, Node} from "./app";

const NodeElement: React.FC<{
    node: Node,
    nodes: Node[],
    del: () => void,
    edges: Edge[],
    addEdge: (to: Node) => void,
    delEdge: (to: Node) => void
}> = ({node, nodes, del, edges, addEdge, delEdge}) => {
    const newEdgeSelect = useRef(null);

    const availableNodes = nodes.filter(n => n !== node && edges.map(e => e.to).indexOf(n) === -1);

    return (
        <div className="columns is-mobile mb-0">
            <div className="column is-flex is-flex-direction-row is-flex-wrap-wrap">
                <div className="box m-2" key="-1">
                    <span className="tag is-info is-large mr-2">{node}</span>
                    <button className="button tag is-danger is-light is-large"
                            style={{width: "2em", height: "2em"}} onClick={del}>
                        <span className="material-icons">
                            close
                        </span>
                    </button>
                </div>
                {edges.map(e => (
                    <div className="box m-2" key={e.from + " " + e.to}>
                        <span className="tag is-info is-light is-large mr-2">{e.to}</span>
                        <button className="button tag is-danger is-light is-large"
                                style={{width: "2em", height: "2em"}}
                                onClick={() => delEdge(e.to)}>
                        <span className="material-icons">
                            close
                        </span>
                        </button>
                    </div>
                ))}
                {(availableNodes.length !== 0) && <div className="box m-2">
                    <div className="select mr-2">
                        <select ref={newEdgeSelect}>
                            {availableNodes.map(e => <option value={e}>{e}</option>)}
                        </select>
                    </div>
                    <button className="button tag is-success is-light is-large"
                            style={{width: "2em", height: "2em"}}
                            onClick={() => {
                                if (newEdgeSelect.current == null) return;
                                const newEdge = (newEdgeSelect.current as HTMLSelectElement).value;
                                addEdge(newEdge);
                            }}>
                            <span className="material-icons">
                                add
                            </span>
                    </button>
                </div>}
            </div>
        </div>
    );
};

const NewNodeButton: React.FC<{
    nodes: Node[],
    addNode: (node: Node) => void
}> = ({nodes, addNode}) => {
    const newNodeName = useRef(null);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="columns is-mobile">
            <div className="column is-narrow">
                <div className="box">
                    <div className="is-flex is-flex-direction-row">
                        <input className={"input mr-2 " + (error !== null ? "is-danger" : "")}
                               type="text" ref={newNodeName}
                               placeholder="Название вершины"
                               onClick={() => setError(null)}/>
                        <button className="button tag is-success is-light is-medium"
                                style={{width: "2.5em", height: "2.5em"}}
                                onClick={() => {
                                    if (newNodeName.current == null) return;
                                    const newNode = (newNodeName.current as HTMLInputElement).value.trim();
                                    if (nodes.indexOf(newNode) === -1) {
                                        if (newNode.length === 0) {
                                            setError("Введите не пустое имя!");
                                        } else
                                            addNode(newNode);
                                    } else {
                                        setError("Название должно быть уникальным!");
                                    }
                                }}>
                                <span className="material-icons">
                                    add
                                </span>
                        </button>
                    </div>
                    {(error !== null) && <p className="help is-danger">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export const GraphConstructor: React.FC<{
    nodes: Node[], setNodes: (nodes: Node[]) => void,
    edges: Edge[], setEdges: (edges: Edge[]) => void
}> = ({nodes, setNodes, edges, setEdges}) => {
    return (
        <>
            <h2 className="title is-2">Конструктор графа</h2>
            <div className="tags are-large">
                <span className="tag is-info">Вершины</span>
                <span className="tag is-info is-light">Ребра</span>
            </div>
            {nodes.map(node => <NodeElement
                key={node}
                node={node} nodes={nodes}
                del={() => {
                    setNodes([...nodes.filter(e => e !== node)]);
                    setEdges([...edges.filter(e => e.from !== node && e.to !== node)]);
                }}
                edges={edges.filter(e => e.from === node)}
                addEdge={(to: Node) => setEdges([...edges, {from: node, to: to}])}
                delEdge={(to: Node) => setEdges([...edges.filter(e => e.from !== node && e.to !== to)])}
            />)}
            <NewNodeButton nodes={nodes} addNode={node => setNodes([...nodes, node])}/>
        </>
    );
};