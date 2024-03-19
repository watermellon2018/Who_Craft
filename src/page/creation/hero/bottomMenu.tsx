import React from "react";
import { Button, Form, Row, Select } from "antd";

const { Option } = Select;

const BottomGenMenu = () => {
    return (
        <Row gutter={[8, 8]} className='flex justify-between'>
            <div className='flex'>
                <p className="mb-1 text-gray-700 self-end mr-4 ml-2">Стиль:</p>
                <Form.Item name='styleGen' initialValue='real'>
                    <Select className='mt-2'>
                        <Option value="real">Реалистичный</Option>
                        <Option value="cartoon">Мультфильм</Option>
                        <Option value="anime">Аниме</Option>
                    </Select>
                </Form.Item>
            </div>

            <div>
                <Form.Item>
                    <Button className='mt-2 border border-black' type="primary" htmlType="submit">
                        Генерировать
                    </Button>
                </Form.Item>
            </div>
        </Row>
    );
};

export default BottomGenMenu;
