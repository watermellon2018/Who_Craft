import React, { useState, useEffect } from 'react';
import HeaderComponent from "../../main/header";
import { useNavigate } from 'react-router-dom';

import {Input, Button, Select, Upload, message, notification} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Option } = Select;
const { Dragger } = Upload;

interface Genre {
    key: string;
    name: string;
    value: string;
}


import {get_all_genres} from "../../../api/projects/properties/genres";
import AudienceSelect from "./selectAudience";
import {create_new_project} from "../../../api/projects/properties/project";
import withAuth from "../../../utils/auth/check_auth";
import PathConstants from "../../../routes/pathConstant";

// TODO:: its for testing
const BOTTOM_LEN_ANNOT = 0 // 300 # TODO: заглушка
const UP_LEN_ANNOT = 800
const BOTTOM_LEN_DESC = 0 //700
const UP_LEN_DESC = 2000

export const ProjectCreatePage = () => {
    const navigate = useNavigate();

    const [genresList, setGenresList] = useState<Genre[]>([]);

    const [imageUrl, setImageUrl] = useState<string>();
    const [title, setTitle] = useState<string>('');
    const [genre, setGenre] = useState<string[] | undefined>(undefined);
    const [format, setFormat] = useState<string>('full-movie');
    const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
    const [annotation, setAnnotation] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [errorTitle, setErrorTitle] = useState<boolean>(false);
    const [errorDesc, setErrorDesc] = useState<boolean>(false);
    const [errorAnnot, setErrorAnnot] = useState<boolean>(false);


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await get_all_genres();
                setGenresList(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка жанров:', error);
            }
        };

        fetchGenres();
    }, []);

    const openNotificationWithIcon = (desc: React.ReactNode,
                                      mes: React.ReactNode = "Ошибка в заполнении",
                                      type: 'success' | 'info' | 'error' | 'warning' ='error') => {
        notification[type]({
            message: mes,
            description: desc,
        });
    };

    const createHandle = async (event: any) => {

        event.preventDefault();
        if (!title) {
            setErrorTitle(true);
            openNotificationWithIcon('Поле "Название" обязательно для заполнения');
            return;
        }

        if (!genre) {
            openNotificationWithIcon('Выберите жанры');
            return;
        }

        if (!annotation || annotation.length < BOTTOM_LEN_ANNOT) {
            setErrorAnnot(true);
            openNotificationWithIcon('Поле "Аннотации" должно содержать не менее' + BOTTOM_LEN_ANNOT+' символов');
            return;
        }
        if (!annotation || annotation.length > UP_LEN_ANNOT) {
            setErrorAnnot(true);
            openNotificationWithIcon('Поле "Аннотации" должно содержать не более'+ UP_LEN_ANNOT +' символов');
            return;
        }
        if (!description || description.length < BOTTOM_LEN_DESC) {
            setErrorDesc(true);
            openNotificationWithIcon('Поле "Синопсис" должно содержать не менее' + BOTTOM_LEN_DESC +' символов');
            return;
        }
        if (!description || description.length > UP_LEN_ANNOT) {
            setErrorDesc(true);
            openNotificationWithIcon('Поле "Синопсис" должно содержать не более' + UP_LEN_DESC + ' символов');
            return;
        }
        if (selectedAudience.length == 0) {
            openNotificationWithIcon('Выберите целевую аудиторию');
            return;
        }

        const data = {
            'genre': genre,
            'format': format,
            'title': title,
            'desc': description,
            'annot': annotation,
            'audience': selectedAudience,
            'image': imageUrl,
        };

        try {
            const response = await create_new_project(data);
            if(response.status == 200){
                openNotificationWithIcon('Проект успешно создался!',
                                        'Ура!',
                                        'success');
                localStorage.setItem('curProject', JSON.stringify(data));
                navigate(PathConstants.PROJECTS);
            }
        } catch (error) {
            console.error('Ошибка при получении списка жанров:', error);
        }
    };

    const handleAnnotationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnnotation(e.target.value);
        const len = e.target.value.length;
        if (len >= BOTTOM_LEN_ANNOT && len <= UP_LEN_ANNOT) {
            setErrorAnnot(false);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        const len = e.target.value.length;
        if (len >= BOTTOM_LEN_DESC && len <= UP_LEN_DESC) {
            setErrorDesc(false);
        }
    };

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setErrorTitle(false);
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };



    const getBase64 = (img: any, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        getBase64(info.file, (url) => {
            setImageUrl(url);
        });
    }

    return (
        <>
            <HeaderComponent />
        <div className="p-4 bg-gray-800 min-h-screen text-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <Dragger
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType='picture-card'
                            showUploadList={false}
                            onChange={handleChange}
                            accept=".jpg,.png"
                            beforeUpload={(file) => {
                                beforeUpload(file);
                                return false;
                            }}
                            className="w-full h-auto mb-4"
                        >
                            {imageUrl ?
                                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                :
                                <>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Нажмите или перетащите файл сюда для загрузки постера
                            </p>
                                    </>
                            }
                        </Dragger>

                    </div>
                    <div className="col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl mb-4">Настройки проекта</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-xl mb-2">Название</h3>
                                    <Input
                                        className="mb-10 max-w-300"
                                        placeholder="Введите название"
                                        value={title}
                                        onChange={handleTitle}
                                        style={{ borderColor: errorTitle ? 'red' : ''  }}
                                    />
                                    <h3 className="text-xl mb-2">Формат</h3>
                                    <Select
                                        placeholder="Выберите формат"
                                        defaultValue="full-movie"
                                        onChange={(value) => setFormat(value)}
                                        className="mb-10 max-w-300"
                                        style={{ width: '-webkit-fill-available' }}
                                    >
                                        <Option value="full-movie">Полнометражный фильм</Option>
                                        <Option value="short-movie">Короткометражка</Option>
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
                                        onChange={setGenre}
                                        className="mb-10 max-w-300"
                                        style={{ width: '-webkit-fill-available' }}
                                    >
                                        {genresList.map(genre => (
                                            <Option key={genre.key} value={genre.value}>{genre.name}</Option>
                                        ))}

                                    </Select>
                                </div>
                                <div>
                                    <h3 className="text-xl mb-2">Целевая аудитория</h3>
                                    <AudienceSelect selectedAudience={selectedAudience}
                                                    setSelectedAudience={setSelectedAudience} />
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
                                        value={annotation}
                                        onChange={handleAnnotationsChange}
                                        className="mb-10"
                                        style={{ borderColor: errorAnnot ? 'red' : '' }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl mb-2">Синопсис</h3>
                                    <Input.TextArea
                                        rows={4}
                                        minLength={700}
                                        maxLength={2000}
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        className="mb-10"
                                        style={{ borderColor: errorDesc ? 'red' : '' }}
                                    />
                                </div>
                                <div></div>
                                <Button
                                    type="primary"
                                    onClick={createHandle}
                                    className="mt-10"
                                >
                                    Создать
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

export default withAuth(ProjectCreatePage);

