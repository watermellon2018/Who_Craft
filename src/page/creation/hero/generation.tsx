import React, {useState, useRef, useEffect, useMemo, useId} from 'react';
import {Button, Empty, Layout, Spin} from 'antd';
import NodeTree from './tree/node';
import {get_all_character_for_project} from '../../../api/generation/characters/tree_structure';

import ImageCanvas from "./canvas";
import HeaderComponent from '../../main/header'
import MenuGeneration from "./generationMenu";
import {Tree} from "react-arborist";
import {generateImageAPI,
    generateImageUndefinedAPI,
    generateImage2ImgAPI} from '../../../api/characters'
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import CreaterWrapper from "./tree/createrWrapper";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import PathConstants from "../../../routes/pathConstant";
const { Content, Sider } = Layout;


export const GenerationHeroPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const treeRef = useRef(null);

    const [data, setData] = useState();
    const [curCharacter, setCurCharacter] = useState<{id: string,
        name: string,
        is_folder: boolean}>
    ({id: '', name: '', is_folder: true});

    const memoizedSetCurCharacter = useMemo(() => {
        return setCurCharacter;
    }, []);

    useEffect(() => {
        const getCharacters = async () => {
            const response = await get_all_character_for_project();
            const data = response.data;
            console.log(data);
            setData(data);
        };

        getCharacters();

    }, []);

    const saveCharacterHandle = () => {
        const a = 5
    }
    console.log(useId());



    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [imageGeneratedUrl, setImageGeneratedUrl] = useState<string>('');
    const [isGenerated, setIsGenerated] = useState<boolean>(true);

    const onFinish = async (values: any) => {
        setIsGenerated(false);
        console.log(values);

        let response;
        // TODO:: переделать / костыль пока оставлю
        if (values['url'] !== undefined){
            response = await generateImage2ImgAPI(values);
        }else {
            response = (Object.keys(values).length > 2)
                ? await generateImageAPI(values)
                : await generateImageUndefinedAPI(values);
        }

        const byteArray = response.data;
        const imageUrl = `data:image/png;base64,${byteArray}`;
        setImageGeneratedUrl(imageUrl);
        setIsGenerated(true);
    };
    const navigate = useNavigate();
    const settingHeroHandle = () => {
        navigate(PathConstants.SETTING_HERO);
    };


    return (

        <>

            <HeaderComponent />
            <Layout style={{height: '100%'}}>

                <div>

                    {/* TODO:: в отдельный компонент вынести */}
                    <Sider  collapsible={false} onDoubleClick={toggleCollapsed} theme="dark"
                            className="h-screen flex flex-col select-none pt-4 pl-3 pr-1 pb-5"
                            collapsed={collapsed}
                            style={{height: '100%'}}
                    >
                        <div className="folderFileActions">
                            <CreaterWrapper treeRef={treeRef}/>
                        </div>
                        <Tree
                            key='tree_characters'
                            height={600}
                            className='tree sidebar-container'
                            initialData={data}
                            ref={treeRef}>
                            {({ node, style, dragHandle, tree }) => (
                                <NodeTree node={node}
                                          style={style}
                                          dragHandle={dragHandle}
                                          tree={tree}
                                          setCurCharacter={memoizedSetCurCharacter}
                                />
                            )}
                        </Tree>
                    </Sider>
                </div>

                <Layout>

                    <Content className="flex m-0 16px">
                        <div className="flex-grow p-5">
                            <div className='flex justify-between'>
                                <p style={{color: 'white', position: "relative"}}>
                                    Текущий персонаж: {curCharacter['name']}
                                </p>
                                {imageGeneratedUrl!='' ?
                                    <div>
                                        <Button onClick={settingHeroHandle} className='mr-5'>Настройки персонажа</Button>
                                        <Button onClick={saveCharacterHandle}>Сохранить</Button>
                                    </div> :
                                    <></>
                                }
                            </div>

                            <div className="h-full w-full flex items-center justify-center">

                                {imageGeneratedUrl == '' ?
                                    <Empty description='Персонаж не сгенерирован'
                                           className='text-yellow'
                                           image={Empty.PRESENTED_IMAGE_DEFAULT} /> :
                                    isGenerated ?
                                        <ImageCanvas imageUrl={imageGeneratedUrl} /> :
                                        <Spin />

                                }

                            </div>
                        </div>

                        {!curCharacter.is_folder ?
                            <div className="w-1/3 p-5">
                                <MenuGeneration onFinish={onFinish} />
                            </div> : <></>
                        }

                    </Content>
                </Layout>
            </Layout>
        </>
    );

}
export default withAuth(GenerationHeroPage);