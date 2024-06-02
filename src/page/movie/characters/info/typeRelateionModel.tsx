import React, {useState, useEffect, useRef, useMemo} from 'react';

import {Button, Modal, Select} from "antd";
import {v4 as uuidv4} from "uuid";

import styled from 'styled-components';
import {add_edge_graph, delete_edge_graph_api, get_all_type_relationship} from "../../../../api/characters/graph";
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
                                                                     handleDeleteEdge
}) => {

    const [allTypes, setAllTypes] = useState<TypeRelation[]>([])

    const translitValueSelect = (typeShipCur: string) => {
        for(let i = 0; i < allTypes.length; i+=1){
            if(allTypes[i].value == typeShipCur)
                return allTypes[i].name;
        }
        return 'Не найдено отношение'
    }

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

    // const handleDeleteEdge = (edgeId: string) => {
    //     console.log(typeShipCur);
    //     // Удаляем ребро на фронте
    //     setEdges(prevEdges => prevEdges.filter((edge: { from: string; to: string; }) =>
    //         edge.from !== fromNode && edge.to !== toNode ));
    // }

        return (

        <Modal
            className='type-relationship-modal'
            open={isModalVisible}
            title="Выберите тип отношений между персонажами"
            // onOk={handleOk}
            // onCancel={handleCancel}
            footer={[
                // TODO:: кнопка должна быть , если связь уже создана
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
                <Button key="submit" type="primary" onClick={handleOk}>
                    OK
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
            {/*<Select*/}
            {/*    defaultValue={typeShipCur}*/}
            {/*    style={{minWidth: '150px', width: '250px'}}*/}
            {/*>*/}
            {/*    <Option value="DruzheskieOtnosheniya">Дружеские отношения</Option>*/}
            {/*    <Option value="Partnerstvo">Партнерство</Option>*/}
            {/*    <Option value="SoyuzPoNeobhodimosti">Союз по необходимости</Option>*/}
            {/*    <Option value="Soperniky">Соперники</Option>*/}
            {/*    <Option value="Nepriateli">Неприятели</Option>*/}
            {/*    <Option value="SmertelnyeVragi">Смертельные враги</Option>*/}
            {/*    <Option value="NeytralnyeOtnosheniya">Нейтральные отношения</Option>*/}
            {/*    <Option value="SlozhnyeOtnosheniya">Сложные отношения</Option>*/}
            {/*    <Option value="Dvulichie">Двуличие</Option>*/}
            {/*    <Option value="LozhnyeDruzhYa">Ложные друзья</Option>*/}
            {/*    <Option value="RomanticheskieOtnosheniya">Романтические отношения</Option>*/}
            {/*    <Option value="SemeynyeOtnosheniya">Семейные отношения</Option>*/}
            {/*    <Option value="UchitelUchenik">Учитель-ученик</Option>*/}
            {/*    <Option value="RabochyeOtnosheniya">Рабочие отношения</Option>*/}
            {/*    <Option value="KonfliktPokoleniy">Конфликт поколений</Option>*/}
            {/*    <Option value="Sozavisimost">Созависимость</Option>*/}
            {/*    <Option value="Sochuvstvie">Сочувствие</Option>*/}
            {/*</Select>*/}
        </Modal>
    )
};

export default TypeRelationshipModal;