import React, {useState, useEffect, useRef, useMemo} from 'react';

import {Button, Modal, Select} from "antd";
import {v4 as uuidv4} from "uuid";

import {
    add_edge_graph,
    delete_edge_graph_api,
    get_all_type_relationship,
    update_edge_graph_api
} from "../../../../api/characters/graph";
import {get_all_heros_project} from "../../../../api/characters/basic";
import {all} from "axios";
import {useLocation} from "react-router-dom";


interface TypeRelationshipModalI {
    isModalVisible: boolean;
    handleConnectNodes: (newEdge: any) => void;
    handleCancel: () => void;
    fromNode: any;
    toNode: any;
    setModelVisible: (visib: boolean) => void;
    handleDeleteEdge: () => void;
    isExist: boolean;
    handleUpdateEdge: (lbl: string) => void;
}

interface TypeRelation {
    key: string;
    name: string;
    value: string;
}

const TypeRelationshipModal: React.FC<TypeRelationshipModalI> = ({  isModalVisible,
                                                                     setModelVisible,
                                                                     handleConnectNodes,
                                                                     handleCancel,
                                                                     fromNode,
                                                                     toNode,
                                                                     handleDeleteEdge,
                                                                     isExist,
                                                                     handleUpdateEdge
}) => {

    const [allTypes, setAllTypes] = useState<TypeRelation[]>([])

    /**
     * Преобразует значение типа связи (typeShipCur) в текстовое описание.
     *
     * @param typeShipCur Значение типа связи.
     * @returns Текстовое описание типа связи или "Не найдено отношение", если значение не найдено в массиве allTypes.
     */
    const translitValueSelect = (typeShipCur: string) => {
        const foundType = allTypes.find(type => type.value === typeShipCur);
        return foundType ? foundType.name : 'Не найдено отношение';
    };

    useEffect(() => {
        const getAllRelationships = async () => {
            try {
                const response: any = await get_all_type_relationship();
                setAllTypes(response.data);

            } catch (error) {
                console.error('Ошибка при получении списка типов взаимоотношений между героями:', error);
                setAllTypes([]);
            }
        };
        getAllRelationships();
    }, []);


    const [typeShipCur, setTypeShipCur] = useState('Partnerstvo')

    const {Option} = Select;
    const location = useLocation();
    const { project_id } = location.state || {};

    /**
     * Обрабатывает подтверждение создания или обновления связи между узлами.
     * Получает текстовое описание типа связи, создает объект ребра,
     * добавляет его в график, закрывает модальное окно и сохраняет
     * ребро в базу данных.
     */
    const handleOk = () => {
        const nameCur = translitValueSelect(typeShipCur);
        const edge = {
            label: nameCur,
            id: uuidv4(),
            from: fromNode,
            to: toNode
        };
        handleConnectNodes(edge);
        setModelVisible(false);

        const edgeToSaveObj = {
            label: typeShipCur,
            from: fromNode,
            to: toNode
        };

        // сохранить в базу данных
        add_edge_graph(edgeToSaveObj, project_id);

    }
    
    /**
     * Обрабатывает обновление связи между узлами.
     * Обновляет данные ребра на сервере и в графике.
     */
    const handleUpdate = () => {
        const updatedObj = {
            label: typeShipCur,
            from: fromNode,
            to: toNode
        };
        const nameCur = translitValueSelect(typeShipCur);

        // обновляем фронт
        update_edge_graph_api(updatedObj, project_id).then(x => handleUpdateEdge(nameCur));
        handleCancel(); // close modal
    };

        return (

        <Modal
            onCancel={handleCancel}
            className='type-relationship-modal'
            open={isModalVisible}
            title="Выберите тип отношений между персонажами"
            footer={[
                !isExist ? null :
                    <Button key='remove' danger className='remove-but-in-modal' onClick={() => {
                    // Удаляем ребро на бэке
                    const e = {
                        from: fromNode,
                        to: toNode,
                        label: typeShipCur,
                    }
                    delete_edge_graph_api(e, project_id);

                    // Удаляем ребро на фронте
                    handleDeleteEdge();

                    handleCancel(); // Close the modal
                }}>
                    Удалить
                </Button>,
                <Button className='back-modal' key="back" onClick={handleCancel}>
                    Назад
                </Button>,
                <Button key="submit" type="primary" onClick={isExist ? handleUpdate : handleOk}>
                    {isExist ? "Обновить" : "ОК"}
                </Button>,
            ]}

        >
            <Select
                value={typeShipCur}
                onChange={setTypeShipCur}
                style={{ minWidth: '150px', width: '250px' }}
            >
                {allTypes.map(t => (
                    <Option key={t.key} value={t.value}>{t.name}</Option>
                ))}

            </Select>
        </Modal>
    )
};

export default TypeRelationshipModal;