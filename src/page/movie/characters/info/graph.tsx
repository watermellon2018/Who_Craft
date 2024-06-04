import React, {useEffect, useState} from 'react';
import {Button} from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Graph, {Edge, Network, Node} from 'react-graph-vis';
import './style.css'
import {Simulate} from "react-dom/test-utils";
import TypeRelationshipModal from "./typeRelateionModel";
import {select_edge_graph} from "../../../../api/characters/graph";
import {useLocation} from "react-router-dom";

/*** Больше примеров тут: https://visjs.github.io/vis-network/examples/
 * Для будущих модификаций
 * ***/

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
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const location = useLocation();
    const { project_id } = location.state;

    useEffect(() => {

        const nodeData = nodes.map(node => ({
            id: node.id,
            label: node.name,
            shape: "image",
            image: node.src
        }));
        setNodeData(nodeData);


        // выгрузить из БД ребра
        select_edge_graph(project_id).then(response => {
            if(response.status == 200){
                setEdges(response.data);
            }
        })
        // setEdges([]);
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

    const handleDeleteEdge = () => {
        // Удаляем ребро на фронте
        setEdges(prevEdges => prevEdges.filter((edge: { from: string; to: string; }) =>
            edge.from !== currentEdge[0] && edge.to !== currentEdge[1] ));
    }

    const handleUpdateEdge = (label: string) => {
        // Обновляем поле label у ребра
        setEdges(prevEdges => prevEdges.map((edge: { from: string; to: string; id: string; label: string }) => {
            if ((edge.from === currentEdge[0] && edge.to === currentEdge[1]) ||
                (edge.to === currentEdge[0] && edge.from === currentEdge[1])) {
                return { ...edge, label }; // Обновляем label
            }
            return edge; // Оставляем остальные ребра без изменений
        }));
    };

    const isExistEdge = (susspend_edge: any) => {
        return edges.filter((edge: { from: string; to: string; }) =>
            (edge.from == susspend_edge[0] || edge.from == susspend_edge[1]) &&
            (edge.to == susspend_edge[1] || edge.to == susspend_edge[0])).length > 0;
    }

    const handleConnectNodes = (newEdge: Edge) => {
        const newEdgeWithId = {
            ...newEdge,
        };

        setEdges(prevEdges => [...prevEdges, newEdgeWithId]);
    };

    return (

        <div className='graph-character'>
            <TypeRelationshipModal
                setModelVisible={setIsVisible}
                isModalVisible={isVisible}
                handleConnectNodes={handleConnectNodes}
                handleCancel={() => {
                    setIsVisible(false);
                }}
                fromNode={currentEdge[0]}
                toNode={currentEdge[1]}
                handleDeleteEdge={handleDeleteEdge}
                isExist={isCreate}
                handleUpdateEdge={handleUpdateEdge}

            />

            <Graph
                key={`${nodeData.map(node => node.id).join(',')}__${edges.map(edge => edge.id).join(',')}`}
                graph={{ 'nodes': nodeData, 'edges': edges }}
                options={options}
                getNetwork={(network: any) => {
                    // Нажать ctrl, чтобы соединить
                    network.on("selectNode", (params: any) => {
                        const selectedNodeId = params.nodes[0];
                        if (network.getSelectedNodes().length === 2) {
                            const fromNode = network.getSelectedNodes()[1];
                            const toNode = selectedNodeId;
                            const isExist = isExistEdge([fromNode, toNode])
                            setIsCreate(isExist);
                            setIsVisible(true);

                            setCurrentEdge([fromNode, toNode])

                            network.unselectAll();
                        }
                    });

                }}
                style={{ height: '400px' }}
            />


            <Button>test</Button>
        </div>
    );
};

export default GraphEditor;