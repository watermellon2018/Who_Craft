import React from 'react';
import {Form, Row, Col} from 'antd';
import './style.css'
import TextArea from "antd/es/input/TextArea";

interface ChildProps {
    formData: any;
    setFormData: (newState: string) => void;
}

const PsychologyCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {

    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData({ ...formData, ...allValues });
    };

    const labelSpan = 7
    const fieldSpan = 24 - labelSpan;

    return (
        <>
            <Form onValuesChange={handleFormChange} initialValues={formData}>
                <Row>
                    <Col span={labelSpan}>
                        Характер
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="character">
                            <TextArea rows={7} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={labelSpan}>
                        Внутренние конфликты
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="inside-conflict">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default PsychologyCharacterData;
