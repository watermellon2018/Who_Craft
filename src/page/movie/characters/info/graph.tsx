import React, {useState, useEffect, useRef, useMemo} from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Graph, { Network, Node, Edge } from 'react-graph-vis';
import './style.css'
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;
import TypeRelationshipModal from "./typeRelateionModel";

interface Node {
    id: string;
    name: string;
    src: string;
}
interface GraphEditorI {
    nodes: Node[]; //any;
}


interface NodeDataGraph {
    label: string;
    id: string | number;
    shape: string,
    image: string;
}

interface Edge {
    id: string;
    from: string;
    to: string;
    label: string;
}
const GraphEditor: React.FC<GraphEditorI> = ({nodes}) => {

    const [nodeData, setNodeData] = useState<NodeDataGraph[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentEdge, setCurrentEdge] = useState<any>([]);

    useEffect(() => {

        const nodeData = nodes.map(node => ({
            id: node.id,
            label: node.name,
            shape: "image",
            image: node.src
        }));
        setNodeData(nodeData);

        setEdges([]);
    }, [nodes]);


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
            multiselect: true,
            keyboard: {
                enabled: false,
                speed: {x: 10, y: 10, zoom: 0.01},
            },
        },
        // locale: 'ru',


    };


    const   handleConnectNodes = (newEdge: Edge) => {
        console.log('handleConnectNodes:', newEdge);
        // setEdges([...edges, newEdge]);
        const newEdgeWithId = {
            ...newEdge,
            // id: uuidv4()
        };

        setEdges(prevEdges => [...prevEdges, newEdgeWithId]);
    };

    const events = {
        selectEdge: (event: any) => {
            const { edges: selectedEdges } = event;
            if (selectedEdges.length > 0) {
                const selectedEdge = edges.find(edge => edge.from === selectedEdges[0].from && edge.to === selectedEdges[0].to);
                if (selectedEdge) {
                    console.log("Selected Edge:", selectedEdge);
                }
            }
        },
        doubleClick: (event: any) => {
            const { pointer: { canvas } } = event;
            const newNodeId = (nodes.length + 1).toString();
            // setNodeData([...nodes, { id: newNodeId, label: `Node ${newNodeId}` }]);
            setEdges([...edges, { from: newNodeId, id: uuidv4(), to: canvas.toString(), label: 'test' }]);
        }
    };

    useEffect(() => {
        console.log("Edges:", edges);
    }, [edges]);
    return (

        <div className='graph-character'>
            {/*Тип взаимоотношений? Враги и тд*/}
            <TypeRelationshipModal
                setModelVisible={setIsVisible}
                isModalVisible={isVisible}
                handleConnectNodes={handleConnectNodes}
                handleCancel={() => {
                    setIsVisible(false);
                }}
                fromNode={currentEdge[0]}
                toNode={currentEdge[1]}

            />

            <Graph
                // key={JSON.stringify(nodeData)}
                key={`${nodeData.map(node => node.id).join(',')}__${edges.map(edge => edge.id).join(',')}`}
                graph={{ 'nodes': nodeData, 'edges': edges }}
                // manipulation={manipulation}
                options={options}
                // events={events}
                getNetwork={(network: any) => {
                    // Нажать ctrl, чтобы соединить
                    network.on("selectNode", (params: any) => {
                        const selectedNodeId = params.nodes[0];
                        if (network.getSelectedNodes().length === 2) {
                            const fromNode = network.getSelectedNodes()[1];
                            const toNode = selectedNodeId;
                            setIsVisible(true);
                            setCurrentEdge([fromNode, toNode])

                            // handleConnectNodes({
                            //     label: 'test',
                            //     id: uuidv4(),
                            //     from: fromNode,
                            //     to: toNode
                            // });


                            network.unselectAll();
                        }
                    });

                }}
                style={{ height: '400px' }}
            />

            {/*<TypeRelationshipModal*/}
            {/*    setModelVisible={setIsVisible}*/}
            {/*    isModalVisible={isVisible}*/}
            {/*    handleConnectNodes={handleConnectNodes}*/}
            {/*    handleCancel={() => {*/}
            {/*        setIsVisible(false);*/}
            {/*    }}*/}
            {/*    fromNode={currentEdge[0]}*/}
            {/*    toNode={currentEdge[1]}*/}

            {/*/>*/}
            <Button>test</Button>
        </div>
    );
};

export default GraphEditor;