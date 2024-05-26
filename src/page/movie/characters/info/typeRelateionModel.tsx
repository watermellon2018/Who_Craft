import React, {useState, useEffect, useRef, useMemo} from 'react';

import {Button, Modal, Select} from "antd";
import {v4 as uuidv4} from "uuid";

import styled from 'styled-components';


interface TypeRelationshipModalI {
    isModalVisible: boolean;
    handleConnectNodes: (newEdge: any) => void;
    handleCancel: () => void;
    fromNode: any;
    toNode: any;
    setModelVisible: (visib: boolean) => void;
}
const TypeRelationshipModal: React.FC<TypeRelationshipModalI> = ({  isModalVisible,
                                                                     setModelVisible,
                                                                     handleConnectNodes,
                                                                     handleCancel,
                                                                     fromNode,
                                                                     toNode
}) => {

    const {Option} = Select;

    const handleOk = () => {
        handleConnectNodes({
            label: 'test',
            id: uuidv4(),
            from: fromNode,
            to: toNode
        });
        setModelVisible(false);
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
                defaultValue='Partnerstvo'
                style={{minWidth: '150px', width: '250px'}}
            >
                <Option value="DruzheskieOtnosheniya">Дружеские отношения</Option>
                <Option value="Partnerstvo">Партнерство</Option>
                <Option value="SoyuzPoNeobhodimosti">Союз по необходимости</Option>
                <Option value="Soperniky">Соперники</Option>
                <Option value="Nepriateli">Неприятели</Option>
                <Option value="SmertelnyeVragi">Смертельные враги</Option>
                <Option value="NeytralnyeOtnosheniya">Нейтральные отношения</Option>
                <Option value="SlozhnyeOtnosheniya">Сложные отношения</Option>
                <Option value="Dvulichie">Двуличие</Option>
                <Option value="LozhnyeDruzhYa">Ложные друзья</Option>
                <Option value="RomanticheskieOtnosheniya">Романтические отношения</Option>
                <Option value="SemeynyeOtnosheniya">Семейные отношения</Option>
                <Option value="UchitelUchenik">Учитель-ученик</Option>
                <Option value="RabochyeOtnosheniya">Рабочие отношения</Option>
                <Option value="KonfliktPokoleniy">Конфликт поколений</Option>
                <Option value="Sozavisimost">Созависимость</Option>
                <Option value="Sochuvstvie">Сочувствие</Option>
            </Select>
        </Modal>
    )
};

export default TypeRelationshipModal;