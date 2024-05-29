import React, {useState, useEffect, useRef, useMemo} from 'react';

import {Button, Modal, Select} from "antd";
import {v4 as uuidv4} from "uuid";

import styled from 'styled-components';
import {get_all_type_relationship} from "../../../../api/characters/graph";
import {get_all_heros_project} from "../../../../api/characters/basic";
import {all} from "axios";


interface TypeRelationshipModalI {
    isModalVisible: boolean;
    handleConnectNodes: (newEdge: any) => void;
    handleCancel: () => void;
    fromNode: any;
    toNode: any;
    setModelVisible: (visib: boolean) => void;
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
                                                                     toNode
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

    const handleOk = () => {
        const nameCur = translitValueSelect(typeShipCur);
        handleConnectNodes({
            label: nameCur,
            id: uuidv4(),
            from: fromNode,
            to: toNode
        });
        setModelVisible(false);

        // сохранить в базу данных

    }

    return (

        <Modal
            className='type-relationship-modal'
            open={isModalVisible}
            title="Выберите тип отношений между персонажами"
            // onOk={handleOk}
            // onCancel={handleCancel}
            footer={[
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