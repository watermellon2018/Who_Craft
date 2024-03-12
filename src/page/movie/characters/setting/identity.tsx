import React from 'react';
import {Form, Input, Row, Col} from 'antd';
import './style.css'
import TextArea from "antd/es/input/TextArea";
import {IdentifyI} from "../../../../api/characters/interfaceHero";

interface ChildProps {
    formData: IdentifyI | undefined;
    setFormData: (newState: IdentifyI) => void;
}
const IdentifyCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {


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
                        Внешние особенности
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.appearance || ''} name="appearance">
                            <TextArea rows={5} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={labelSpan}>
                        Индивидуальный стиль
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.style || ''} name="style">
                            <TextArea rows={5} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={labelSpan}>
                        Комплексы
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.complexs || ''} name="complexs">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={labelSpan}>
                        Особенности речи
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.speech || ''} name="speech">
                            <Input className='long-input' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default IdentifyCharacterData;
