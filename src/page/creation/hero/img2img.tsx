import React from 'react';
import {Form, Input, Select, Button} from 'antd';


interface Img2ImgProps {
    onFinish: (values: any) => void;
}


const Img2ImgForm: React.FC<Img2ImgProps> = ({ onFinish }) => {

    return (
        <Form onFinish={onFinish} layout="vertical">

            <Form.Item label="Url" required name="url">
                <Input />
            </Form.Item>

            <Form.Item label="Prompt" required name="prompt">
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Характер" name="character">
                <Input.TextArea />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Генерировать
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Img2ImgForm;
