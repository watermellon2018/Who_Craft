import React from 'react';
import {Form, Row, Col} from 'antd';
import './style.css'
import TextArea from "antd/es/input/TextArea";
import {PsyhoI} from "../../../../api/characters/interfaceHero";

interface ChildProps {
    formData: PsyhoI | undefined;
    setFormData: (newState: PsyhoI) => void;
}

const PsychologyCharacterData: React.FC<ChildProps> = ({ formData, setFormData }) => {

    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData({ ...formData, ...allValues });
    };

    const labelSpan = 7
    const fieldSpan = 24 - labelSpan;

    return (
        <>
            <Form onValuesChange={handleFormChange}>
                <Row>
                    <Col span={labelSpan}>
                        Характер
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.character || ''} name="character">
                            <TextArea rows={7} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={labelSpan}>
                        Внутренние конфликты
                    </Col>
                    <Col span={fieldSpan}>
                        <Form.Item initialValue={formData?.insideConflict || ''} name="insideConflict">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default PsychologyCharacterData;
