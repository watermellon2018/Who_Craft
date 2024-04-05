import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import  Graph from 'react-graph-vis';

interface GraphEditorI {
    nodes: any;
}

interface GraphI {
    nodes: any;
    edges: any;
}
const GraphEditor: React.FC<GraphEditorI> = ({nodes}) => {
    const [graph, setGraph] = useState<GraphI>({nodes: [], edges: []});
    useEffect(() => {
        const nodeData = []
        for(let i = 0; i < nodes.length; i+=1) {
            const obj = {id: nodes[i].id, label: nodes[i].name, shape: "image", image: nodes[i].src}
            nodeData.push(obj);
        }
        const g = {
            nodes: nodeData,
            edges: [

            ],
        };
        setGraph(g)
    }, []);



    const options = {
        nodes: {
            // shape: 'circle',
            // borderWidth: 1,
            size: 30,
            font: {
                size: 15,
                color: "rgb(250, 176, 5)",
            },
            shapeProperties: {
                useBorderWithImage: false,
            },
        },
        edges: {
            width: 2,
            smooth: {
                type: 'curvedCW',
                roundness: 0.3,
            },
        },
        interaction: {
            zoomView: true,
            keyboard: {
                enabled: false,
                speed: {x: 10, y: 10, zoom: 0.02},
            },
        },
    };

    const handleNodeAdd = () => {
        // Логика добавления нового узла в граф
    };

    const handleEdgeAdd = () => {
        // Логика добавления нового ребра в граф
    };


    return (
        <div>
            {/*Тип взаимоотношений? Враги и тд*/}
            <button onClick={handleEdgeAdd}>Добавить связь</button>
            <button onClick={handleNodeAdd}>Удалить отношения Character</button>
            <Graph key={JSON.stringify(graph)} graph={graph} options={options} style={{ height: '400px' }} />
        </div>
    );
};

export default GraphEditor;

