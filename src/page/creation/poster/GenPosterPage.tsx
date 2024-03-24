import React, {useEffect, useState} from 'react';
import HeaderComponent from "../../main/header";
import {Button, Empty, Input, Layout, Space, Spin} from "antd";
import CreaterWrapper from "../hero/tree/createrWrapper";
import {Tree} from "react-arborist";
import NodeTree from "../hero/tree/node";
import ImageCanvas from "../hero/canvas";
import MenuGeneration from "../hero/generationMenu";
import {Content} from "antd/es/layout/layout";
import {useLocation, useNavigate} from "react-router-dom";
import BottomGenMenu from "../hero/bottomMenu";
import {
    generateImage2ImgAPI,
    generateImageAPI,
    generateImageUndefinedAPI,
    generatePosterApi
} from "../../../api/characters";
import PathConstants from "../../../routes/pathConstant";


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

    const genHandle = async () => {
        setIsGenerating(true);

        const response = await generatePosterApi(describe);

        const byteArray = response.data;
        const imageUrl = `data:image/png;base64,${byteArray}`;
        setImageGeneratedUrl(imageUrl);
        setIsGenerating(false);
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

                                <div className="w-3/6">
                                    <Input.TextArea
                                        value={describe}
                                        onChange={handleDescArea}
                                        style={{height: '100%'}}
                                        placeholder='Распишите, как должен выглядеть постер' />
                                    <Button onClick={genHandle} className='mt-2 border border-black' type="primary" htmlType="submit">
                                        Генерировать
                                    </Button>
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