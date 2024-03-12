import React from 'react';
import {Form, Input, Row, Col} from 'antd';
import './style.css'
import {Gutter} from "antd/es/grid/row";
import TextArea from "antd/es/input/TextArea";
import {MotivateI} from "../../../../api/characters/interfaceHero";

interface ChildProps {
    formData: MotivateI | undefined;
    setFormData: (newState: MotivateI) => void;
}


const MotivationCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {

    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData({ ...formData, ...allValues });
    };

    const gutter: [Gutter, Gutter] = [16, 16];
    const labelSpan = 7
    const fieldSpan = 24 - labelSpan;


    return (
        <>
            <Form onValuesChange={handleFormChange} initialValues={formData}>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Зачем этот персонаж?
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.forWhat || ''} name="forWhat">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Цель
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.goal || ''} name="goal">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Философия жизни
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.philosophy || ''} name="philosophy">
                            <TextArea rows={5} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default MotivationCharacterData;
