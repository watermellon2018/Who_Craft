import React, { useState } from 'react';
import {Form, Input, Select, Button, Switch, InputNumber} from 'antd';


const { Option } = Select;

interface CharacterParamsProps {
    onFinish: (values: any) => void;
}

interface UndefinedCharacterFormProps {
    onFinish: (values: any) => void;
}



const CharacterParams: React.FC<CharacterParamsProps> = ({ onFinish }) => {

    return (
        <Form style={{backgroundColor: 'rgb(250, 176, 5)'}} onFinish={onFinish} layout="vertical">
            <Form.Item label="Пол" name="gender" >
                <Select>
                    <Option value="female">Женский</Option>
                    <Option value="male">Мужской</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Возрастной диапазон" style={{ marginBottom: 0 }}>
                <Form.Item name="min" style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}>
                    <InputNumber
                        placeholder="min"
                        min={1}
                        max={150}
                    />
                </Form.Item>
                <Form.Item name="max" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <InputNumber
                        placeholder="max"
                        min={1}
                        max={150}
                    />
                </Form.Item>
            </Form.Item>

            <Form.Item label="Глаза" name="eyes">
                <Input />
            </Form.Item>

            <Form.Item label="Волосы" name="hair">
                <Input />
            </Form.Item>

            <Form.Item label="Телосложение" name="body">
                <Input />
            </Form.Item>

            <Form.Item label="Внешние особенности" name="appearance">
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Характер" name="character">
                <Input.TextArea />
            </Form.Item>

            <Form.Item>
                <Button style={{borderColor: "black"}} type="primary" htmlType="submit">
                    Генерировать
                </Button>
            </Form.Item>
        </Form>
    );
};

const UndefinedCreationForm: React.FC<UndefinedCharacterFormProps> = ({onFinish}) => {

    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item label="Описание" name="description">
                <Input.TextArea />
            </Form.Item>


            <Form.Item label="Характер" name="character">
                <Input.TextArea />
            </Form.Item>

            <Form.Item>
                <Button style={{borderColor: "black"}} type="primary" htmlType="submit">
                    Генерировать
                </Button>
            </Form.Item>
        </Form>
    );
};

interface CharacterSetting {
    onFinish: (values: any) => void;
}
const CharacterSetting: React.FC<CharacterSetting> = ({onFinish}) => {
    const [isCharacterForm, setIsCharacterForm] = useState(true);

    const handleSwitchChange = (checked: boolean) => {
        setIsCharacterForm(checked);
    };

    const FormSwitcher: React.FC<{ onChange: (checked: boolean) => void }> = ({ onChange }) => {
        return (
            <div style={{ marginBottom: 16, borderBottom: 'solid 1px', borderRadius: 10, borderColor: 'rgb(250, 176, 5)' }}>
                <Switch onChange={onChange}
                        value={isCharacterForm}
                        checkedChildren='Человек'
                        unCheckedChildren='Другое'
                />
            </div>
        );
    };

    return (
        <div>
            <FormSwitcher onChange={handleSwitchChange} />
            {isCharacterForm ?
                <CharacterParams onFinish={onFinish} />
                :
                <UndefinedCreationForm onFinish={onFinish}/>}
        </div>
    );
};

export default CharacterSetting;
