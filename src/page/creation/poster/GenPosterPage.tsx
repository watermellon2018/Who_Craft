import React, {useState} from 'react';
import HeaderComponent from "../../main/header";
import {Button, Empty, Input, Layout, Spin} from "antd";
import ImageCanvas from "../hero/canvas";
import {Content} from "antd/es/layout/layout";
import {useNavigate} from "react-router-dom";
import {
    editGenerateImage,
    generatePosterApi
} from "../../../api/characters";
import PathConstants from "../../../routes/pathConstant";
import EditGenComponent from "../edit_generation";
import {openNotificationWithIcon} from "../../../utils/global/notification";


const GenPosterPage = () => {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [imageGeneratedUrl, setImageGeneratedUrl] = useState<string>('');
    const [describe, setDescribe] = useState<string>('');

    const handleDescArea = (newVal: any) => {
        setDescribe(newVal.target.value);
    }

    const savePoster = () => {
        navigate(PathConstants.CREATE_PROJECT, {
            state: {
                posterUrl: imageGeneratedUrl,
            },
        });
    }

    const catchError = () => {
        setIsGenerating(false);
        setImageGeneratedUrl('');
        openNotificationWithIcon('Упс!',
            'Ошибка при генерации изображения. Что-то пошло не так',
            'error');
    }

    const displayGenImage = (response: any) => {
        const byteArray = response.data;
        const imageUrl = `data:image/png;base64,${byteArray}`;
        setImageGeneratedUrl(imageUrl);
        setIsGenerating(false);
    }

    const genHandle = async () => {
        try {
            setIsGenerating(true);
            const response = await generatePosterApi(describe);
            displayGenImage(response);
        } catch (error) {
            catchError();
        }
    }

    const editHandle = async (correctionText: string) => {
        try {
            setIsGenerating(true);
            const response = await editGenerateImage(correctionText, imageGeneratedUrl);
            displayGenImage(response);
        } catch (error) {
            catchError();
        }
    }

    return (
        <>

            <HeaderComponent />

            <Layout className="p-4 min-h-screen">
                <div className="p-4">


                    <Content className="flex m-0 16px">
                        <div className="flex-grow p-5 grid gap-y-6">
                            <div className='flex justify-end'>
                                <div className='flex'>
                                    {imageGeneratedUrl!='' ?
                                        <div>
                                            <Button onClick={savePoster} className='mr-5'>Сохранить</Button>
                                        </div> :
                                        <></>
                                    }
                                    <div>
                                        <Button onClick={() => navigate(-1)}>Назад</Button>
                                    </div>
                                </div>
                            </div>

                            <div className='flex' style={{minHeight: '400px'}}>
                                <div className="mr-5 border-[#fab005] border h-full w-full flex items-center justify-center">

                                    {isGenerating ? <Spin /> :
                                        <>
                                            { imageGeneratedUrl == ''
                                                ?
                                                <Empty description='Постер не сгенерирован'
                                                       className='text-yellow'
                                                       image={Empty.PRESENTED_IMAGE_DEFAULT} /> :
                                                <ImageCanvas imageUrl={imageGeneratedUrl} />
                                            }
                                        </>
                                    }

                                </div>

                                <div className="w-3/6 flex flex-col justify-between">
                                    <div className='h-1/2'>
                                        <Input.TextArea
                                            value={describe}
                                            onChange={handleDescArea}
                                            style={{height: '100%'}}
                                            placeholder='Распишите, как должен выглядеть постер' />
                                        <Button
                                            style={{minWidth: '120px'}}
                                            onClick={genHandle}
                                            className='mt-2 border border-black'
                                            type="primary"
                                            htmlType="submit">
                                            Генерировать
                                        </Button>
                                    </div>
                                    <div>
                                        {imageGeneratedUrl != '' && !isGenerating ?
                                            <EditGenComponent editHandle={editHandle} /> : <></>
                                        }
                                    </div>
                                </div>


                            </div>
                        </div>

                    </Content>
                </div>
            </Layout>
        </>
    )
}

export default GenPosterPage;