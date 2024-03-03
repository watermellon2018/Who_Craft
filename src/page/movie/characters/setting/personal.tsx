import React, {useState} from 'react';
import {Form, Row, Col} from 'antd';
import './style.css'
import {Gutter} from "antd/es/grid/row";
import TextArea from "antd/es/input/TextArea";


const InsideCharacterData = () => {
    const [formData, setFormData] = useState<any>({});


    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData({ ...formData, ...allValues });
    };

    const gutter: [Gutter, Gutter] = [16, 16];
    const labelSpan = 9
    const fieldSpan = 24 - labelSpan;


    return (
        <>
            <Form onValuesChange={handleFormChange}>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Личные черты
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="for-what">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Характер
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="goal">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={labelSpan}>
                        Силы и слабости
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item name="philosophy">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default InsideCharacterData;
