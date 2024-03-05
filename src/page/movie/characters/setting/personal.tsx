import React from 'react';
import {Form, Row, Col} from 'antd';
import './style.css'
import {Gutter} from "antd/es/grid/row";
import TextArea from "antd/es/input/TextArea";

interface ChildProps {
    formData: any;
    setFormData: (newState: string) => void;
}
const InsideCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {


    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData({ ...formData, ...allValues });
    };

    const gutter: [Gutter, Gutter] = [16, 16];
    const labelSpan = 9
    const fieldSpan = 24 - labelSpan;


    return (
        <>
            <Form onValuesChange={handleFormChange} initialValues={formData}>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Личные черты
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="personal-traits">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Характер
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="character">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Силы и слабости
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="strengths-weaknesses">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default InsideCharacterData;
