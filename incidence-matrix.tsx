import React from "react";
import {Edge, Node} from "./app";

export const IncidenceMatrix: React.FC<{
    nodes: Node[],
    edges: Edge[]
}> = ({nodes, edges}) => {
    if (nodes.length === 0 || edges.length === 0) return null;

    return (<>
        <h2 className="title is-2">Матрица инцидентности</h2>
        <div className="table-container">
            <table className="table is-bordered">
                <tbody>
                <tr>
                    <td/>
                    {nodes.map(e => <td>{e}</td>)}
                </tr>
                {nodes.map(n => <tr>
                    <td>{n}</td>
                    {nodes.map(e => <td>{edges.find(o => o.from === n && o.to === e) == null ? 0 : 1}</td>)}
                </tr>)}
                </tbody>
            </table>
        </div>
    </>);
};