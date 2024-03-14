import React from 'react';
import {Form, Input, Row, Col} from 'antd';
import './style.css'
import {Gutter} from "antd/es/grid/row";
import {PersonalDataI} from "../../../../api/characters/interfaceHero";

interface ChildProps {
    formData: PersonalDataI | undefined;
    setFormData: (newState: PersonalDataI) => void;
}

const PersonalCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {

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
            <Form onValuesChange={handleFormChange} initialValues={formData}>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Имя
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.name || ''} name="name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Фамилия
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.lastName || ''} name="lastName">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Отчество
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.middleName || ''} name="middleName">
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
                            initialValue={formData?.dob || ''}
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
                        <Form.Item initialValue={formData?.town || ''} name="town">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default PersonalCharacterData;
