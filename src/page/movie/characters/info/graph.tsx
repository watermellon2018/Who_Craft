import React, {useEffect, useState} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Graph from 'react-graph-vis';
import './style.css'
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
    }, [nodes]);


    const options = {
        nodes: {
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
    };

    /** Удаляем ребро на фронте **/
    const handleDeleteEdge = () => {
        setEdges(prevEdges => prevEdges.filter((edge: { from: string; to: string; }) =>
            edge.from !== currentEdge[0] && edge.to !== currentEdge[1] ));
    }

    /** Обновляет поле label у ребра, которое соединяет текущие узлы
     * Проверяем, соединяет ли ребро текущие узлы (независимо от порядка)
     * @param label название нового ребра
     **/
    const handleUpdateEdge = (label: string) => {
        setEdges(prevEdges => prevEdges.map((edge: { from: string; to: string; id: string; label: string }) => {
            if ((edge.from === currentEdge[0] && edge.to === currentEdge[1]) ||
                (edge.to === currentEdge[0] && edge.from === currentEdge[1])) {
                return { ...edge, label };
            }
            return edge; // Оставляем остальные ребра без изменений
        }));
    };

    /**
     * Проверяет, существует ли ребро между двумя узлами в массиве edges.
     * Использует `find` для более эффективного поиска.
     *
     * @param suspend_edge Массив из двух узлов (from, to), для которых нужно проверить существование ребра.
     * @returns True, если ребро существует, иначе False.
     */
    const isExistEdge = (suspend_edge: any) => {
        return !!edges.find((edge: { from: string; to: string; }) => {
            return (edge.from === suspend_edge[0] && edge.to === suspend_edge[1]) ||
                (edge.from === suspend_edge[1] && edge.to === suspend_edge[0]);
        });
    };

    /** добавляет новое ребро с уникальным идентификатором в массив edges
     * @param newEdge ребро, которое мы хотим добавить в граф
     * **/
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
        </div>
    );
};

export default GraphEditor;