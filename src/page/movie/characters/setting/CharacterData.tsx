import React, { useState } from 'react';
import {Form, Input, Select, Button, Switch, InputNumber} from 'antd';


const { Option } = Select;



const CharacterData: React.FC = () => {

    return (
        <Form style={{backgroundColor: 'rgb(250, 176, 5)'}} layout="vertical">
            <Form.Item label="Пол" name="gender" >
                <Select>
                    <Option value="female">Женский</Option>
                    <Option value="male">Мужской</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Возрастной диапазон" style={{ marginBottom: 0 }}>
                <Form.Item name="min" style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}>
                    <InputNumber
                        placeholder="min"
                        min={1}
                        max={150}
                    />
                </Form.Item>
                <Form.Item name="max" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <InputNumber
                        placeholder="max"
                        min={1}
                        max={150}
                    />
                </Form.Item>
            </Form.Item>

            <Form.Item label="Глаза" name="eyes">
                <Input />
            </Form.Item>

            <Form.Item label="Волосы" name="hair">
                <Input />
            </Form.Item>

            <Form.Item label="Телосложение" name="body">
                <Input />
            </Form.Item>

            <Form.Item label="Внешние особенности" name="appearance">
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Характер" name="character">
                <Input.TextArea />
            </Form.Item>

            <Form.Item>
                <Button style={{borderColor: "black"}} type="primary" htmlType="submit">
                    Генерировать
                </Button>
            </Form.Item>
        </Form>
    );
};




export default CharacterData;
