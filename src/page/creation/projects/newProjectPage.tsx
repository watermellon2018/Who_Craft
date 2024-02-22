import React, { useState } from 'react';
import HeaderComponent from "../../main/header";

import { Input, Button, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Dragger } = Upload;
// import './main.css'


const audienceOptions = ['Дети', 'Подростки', 'Молодежь', 'Взрослые', 'Пожилые люди'];
const allAudienceOption = 'Все';
import { Tag } from 'antd';
const AudienceSelect: React.FC = () => {
    const [selectedAudience, setSelectedAudience] = useState<string[]>([]);

    const handleAudienceClick = (audience: string) => {
        if (audience === allAudienceOption) {
            setSelectedAudience(selectedAudience.length === audienceOptions.length ? [] : audienceOptions);
        } else {
            setSelectedAudience((prevSelectedAudience) => {
                if (prevSelectedAudience.includes(audience)) {
                    return prevSelectedAudience.filter((item) => item !== audience);
                } else {
                    return [...prevSelectedAudience, audience];
                }
            });
        }
    };

    return (
        <div>
            <Tag.CheckableTag
                checked={selectedAudience.length === audienceOptions.length}
                onChange={() => handleAudienceClick(allAudienceOption)}
            >
                {allAudienceOption}
            </Tag.CheckableTag>
            {audienceOptions.map((audience) => (
                <Tag.CheckableTag
                    key={audience}
                    checked={selectedAudience.includes(audience)}
                    onChange={() => handleAudienceClick(audience)}
                >
                    {audience}
                </Tag.CheckableTag>
            ))}
        </div>
    );
};

export const ProjectCreatePage = () => {

    const handleUpload = (file: File) => {
        // Логика обработки загруженного файла
        console.log('Загружен файл:', file);
        message.success('Постер успешно загружен');
    };

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [format, setFormat] = useState<string>('');
    const [audience, setAudience] = useState<string>('');

    const [genre, setGenre] = useState<string | undefined>(undefined);

    const handleChange = (value: string) => {
        setGenre(value);
    };

    return (
        <>
            <HeaderComponent />
        <div className="p-4 bg-gray-800 min-h-screen text-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <Dragger
                            accept=".jpg,.png"
                            beforeUpload={(file) => {
                                handleUpload(file);
                                return false;
                            }}
                            className="w-full h-auto mb-4"
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Нажмите или перетащите файл сюда для загрузки постера</p>
                        </Dragger>

                    </div>
                    <div className="col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl mb-4">Настройки проекта</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-xl mb-2">Название</h3>
                                    <Input
                                        placeholder="Введите название"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{ marginBottom: '10px', maxWidth: '300px' }}
                                    />
                                    <h3 className="text-xl mb-2">Формат</h3>
                                    <Select
                                        placeholder="Формат"
                                        value={format}
                                        onChange={(value) => setFormat(value)}
                                        style={{ marginBottom: '10px', maxWidth: '300px', width: '-webkit-fill-available' }}
                                    >
                                        <Option value="full">Полнометражный фильм</Option>
                                        <Option value="short">Короткометражный фильм</Option>
                                        <Option value="series">Сериал</Option>
                                        <Option value="marketing">Реклама</Option>
                                    </Select>
                                    <h3 className="text-xl mb-2">Жанр</h3>
                                    <Select
                                        mode="tags"
                                        placeholder="Выберите или введите жанр"
                                        tokenSeparators={[',']}
                                        allowClear
                                        value={genre}
                                        onChange={handleChange}
                                        style={{ marginBottom: '10px', maxWidth: '300px', width: '-webkit-fill-available' }}
                                    >
                                        <Option value="action">Боевик</Option>
                                        <Option value="comedy">Комедия</Option>
                                        <Option value="drama">Драма</Option>
                                        {/* Другие варианты жанров */}
                                    </Select>
                                </div>
                                <div>
                                    <h3 className="text-xl mb-2">Целевая аудитория</h3>
                                    <AudienceSelect />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl mb-4">Характеристики проекта</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-xl mb-2">Аннотация</h3>
                                    <Input.TextArea
                                        rows={4}
                                        maxLength={800}
                                        minLength={300}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{ marginBottom: '10px',  }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl mb-2">Синопсис</h3>
                                    <Input.TextArea
                                        rows={4}
                                        minLength={700}
                                        maxLength={2000}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{ marginBottom: '10px'}}
                                    />
                                </div>
                                <div></div>
                                <Button type="primary" style={{ marginTop: '10px' }}>
                                    Сохранить
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


        </div>
            </>
    );
}

export default ProjectCreatePage;

