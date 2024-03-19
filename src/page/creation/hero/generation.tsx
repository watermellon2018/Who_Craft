import React, {useState, useRef, useEffect} from 'react';
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
import {useLocation, useNavigate} from "react-router-dom";
import PathConstants from "../../../routes/pathConstant";
const { Content, Sider } = Layout;

interface Character {
    id: string;
    key: string;
    name: string;
}

interface TreeHandle {
    hasOneSelection: boolean;
    selectedNodes: { data: { name: string; id: string } }[];
}

export const GenerationHeroPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { is_edit, project_id } = location.state || {};

    const [collapsed, setCollapsed] = useState(false);
    const treeRef = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [data, setData] = useState<Character[]>([]);
    const [curCharacter, setCurCharacter] = useState<{id: string,
        name: string,
        is_folder: boolean}>
    ({id: '', name: '', is_folder: true});

    /**
     * Выгрузка данных из базы - персонажи которые созданы
     * Выгружаем еще не сохраненных персонажей, но созданных из localStorage.
     * Объединяем их, чтобы отобразить на дереве
     * **/

    /** Объединяем созданных (в localStorage) и сохраненных персонажей из БД **/
    const mergeCharactersWithStoredData = (characters: Character[], storedData: Record<string, string>) => {
        const mergedData = [...characters];

        for (const value of Object.values(storedData)) {
            const [id, name] = JSON.parse(value) as [string, string];
            mergedData.push({id, key: id, name});
        }

        return mergedData;
    };

    /** Получаем созданных персонажей из БД **/
    const getCharacters = async () => {
        try {
            const response = await get_all_character_for_project(project_id);
            return response.data;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    };
    const fetchAndMergeCharacters = async () => {
        setIsLoading(true);
        const characters = await getCharacters();
        const storedTreeLeaf = localStorage.getItem('treeLeaf');

        if (storedTreeLeaf && data) {
            const storedData = JSON.parse(storedTreeLeaf);
            const mergedData = mergeCharactersWithStoredData(characters, storedData);
            setData(mergedData);

        } else{
            localStorage.setItem("treeLeaf", JSON.stringify({}));
        }
    }

    useEffect(() => {
        fetchAndMergeCharacters().then(() => {
            setIsLoading(false);
        });
    }, []);

    const saveCharacterHandle = () => {
        const a = 5
    }


    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [imageGeneratedUrl, setImageGeneratedUrl] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setIsGenerating(true);

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
        setIsGenerating(false);
    };

    const settingHeroHandle = () => {
        if (treeRef && treeRef.current && (treeRef.current as TreeHandle).hasOneSelection) {
            const selectedNode = (treeRef.current as TreeHandle).selectedNodes[0];
            const {name, id} = selectedNode.data;

            navigate(PathConstants.SETTING_HERO, {
                state: {
                    is_edit: is_edit,
                    project_id: project_id,
                    name: name,
                    id_leaf: id,
                    imageUrl: imageGeneratedUrl,
                },
            });
        } else {
            console.error('Ошибка при передаче имени на другую страницу!');
        }
    }

    return (

        <>

            <HeaderComponent />
            <Layout style={{height: '100%'}}>

                <div>
                    <Sider  collapsible={false} onDoubleClick={toggleCollapsed} theme="dark"
                            className="h-screen flex flex-col select-none pt-4 pl-3 pr-1 pb-5"
                            collapsed={collapsed}
                            style={{height: '100%'}}
                    >
                        <div className="folderFileActions">
                            <CreaterWrapper projectId={project_id} treeRef={treeRef}/>
                        </div>
                        {isLoading ? (
                            <Tree height={600} className='tree sidebar-container' />
                        ) : (
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
                                          setCurCharacter={setCurCharacter}
                                />
                            )}
                        </Tree>)}
                    </Sider>
                </div>

                <Layout>

                    <Content className="flex m-0 16px">
                        <div className="flex-grow p-5">
                            <div className='flex justify-between'>
                                <p style={{color: 'white', position: "relative"}}>
                                    Текущий персонаж: {curCharacter['name']}
                                </p>
                                {imageGeneratedUrl!='' &&
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    treeRef.current && treeRef.current.hasOneSelection
                                    ?
                                    <div>
                                        <Button onClick={settingHeroHandle} className='mr-5'>Сохранить</Button>
                                    </div> :
                                    <></>
                                }
                                <div>
                                    <Button onClick={() => navigate(-1)}>В Мой проект</Button>
                                </div>
                            </div>

                            <div className="h-full w-full flex items-center justify-center">

                                {isGenerating ? <Spin /> :
                                    <>
                                        {curCharacter['name'] && imageGeneratedUrl == ''
                                            ?
                                                <Empty description='Персонаж не сгенерирован'
                                                       className='text-yellow'
                                                       image={Empty.PRESENTED_IMAGE_DEFAULT} /> :
                                            <ImageCanvas imageUrl={imageGeneratedUrl} />
                                        }
                                    </>
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