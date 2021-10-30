import React, {useEffect} from "react";
import {Edge, Node} from "./app";

export const QAnalysis: React.FC<{
    nodes: Node[],
    edges: Edge[]
}> = ({nodes, edges}) => {
    if (nodes.length === 0 || edges.length === 0) return null;

    const sets = new Map<Node, Set<Node>>();

    for (const node of nodes) {
        sets[node] = new Set(edges.filter((e => e.from === node)).map(e => e.to));
    }

    const q = new Map<Node, number>();
    const _q = new Map<Node, number>();

    for (const node of nodes) {
        q[node] = nodes.filter(e => e !== node).map(e =>
            [...sets[e]].filter(i => sets[node].has(i)).length
        ).reduce((p, c) => c > p ? c : p) - 1;
        _q[node] = sets[node].size - 1;
    }

    const e = new Map<Node, number>();

    for (const node of nodes) {
        e[node] = (_q[node] - q[node]) / (q[node] + 1);
        if (isNaN(e[node]))
            e[node] = Infinity;
    }

    // eslint-disable-next-line
    // @ts-ignore
    useEffect(() => MathJax.typeset(), [edges, nodes]); // eslint-disable-line

    return (<>
        <h2 className="title is-2">Расчёты</h2>
        <p style={{fontSize: "2rem"}}>
            {"\\( \\varepsilon ( \\sigma ) = \\frac{\\hat{q} - \\tilde{q}}{\\tilde{q} + 1} \\)"}
        </p>
        {nodes.map(n => {
            const eq = q[n];
            const e_q = _q[n] !== Infinity ? _q[n] : "\\infty";
            const e_a = e[n] !== Infinity ? e[n] : "\\infty";

            return <p style={{fontSize: "2rem"}}>
                {"\\( \\varepsilon_{" + n + "} = \\frac{" + e_q + ((eq > 0) ? " - " : " + ") + Math.abs(eq) + "}{" + eq + " + 1} = " + e_a + " \\)"}
            </p>;
        })}
    </>);
};