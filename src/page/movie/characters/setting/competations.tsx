import React from 'react';
import {Form, Input, Row, Col} from 'antd';
import './style.css'
import TextArea from "antd/es/input/TextArea";
import {CompetitionI} from "../../../../api/characters/interfaceHero";

interface ChildProps {
    formData: CompetitionI | undefined;
    setFormData: (newState: CompetitionI) => void;
}
const CompetionsCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {

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
                        Профессия
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.profession} name="profession">
                            <Input className='long-input' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={labelSpan}>
                        Увлечения
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.hobby} name="hobby">
                            <Input className='long-input' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={labelSpan}>
                        Таланты
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.talents} name="talents">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={labelSpan}>
                        Интеллектуальные способности
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.mindInfo} name="mindInfo">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>


                <Row>
                    <Col span={labelSpan}>
                        Физические особенности
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.sportInfo} name="sportInfo">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default CompetionsCharacterData;
