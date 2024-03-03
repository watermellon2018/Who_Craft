import React, {useState} from 'react';
import {Form, Input, Row, Col} from 'antd';
import './style.css'
import {Gutter} from "antd/es/grid/row";


const PersonalCharacterData = () => {
    const [formData, setFormData] = useState<any>({});


    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData({ ...formData, ...allValues });
    };

    const gutter: [Gutter, Gutter] = [16, 16];
    const labelSpan = 10
    const fieldSpan = 24 - labelSpan;

    const validateDate = (_: any, value: string) => {
        if (!value || !/^\d{2}.\d{2}.\d{4}$/.test(value)) {
            return Promise.reject('Enter a date (DD-MM-YYYY)');
        }
        return Promise.resolve();
    };

    return (
        <>
            <Form onValuesChange={handleFormChange}>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Имя
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Фамилия
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="lastName">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Отчество
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="middleName">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Дата рождения
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a date',
                                },
                                {
                                    validator: validateDate,
                                },
                            ]}
                            name="dob">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Откуда герой
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="town">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default PersonalCharacterData;
