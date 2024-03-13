import React, {useEffect, useState} from 'react';
import {Card} from 'antd';
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import pathConstant from "../../../routes/pathConstant";
import {get_all_heros_project} from "../../../api/characters/basic";

interface ProjectCard {
    id: string;
    key: string;
    // src: string;
    name: string
}
interface HeroCard {
    id: string;
    key: string;
    // src: string;
    name: string;
    src?: string;
}
const CharactersCard = () => {
    const [characterList, setCharacterList] = useState<ProjectCard[]>([]);
    const location = useLocation();
    const { project_id, title } = location.state || {};

    useEffect(() => {
        // const data = [
        //     {
        //         key: 'Chicken 1',
        //         id: 'Chicken 1',
        //         name: 'Cool chicken',
        //     },
        //     {
        //         key: 'Chicken 2',
        //         id: 'Chicken 2',
        //         name: 'Bad chicken',
        //     },
        //     {
        //         key: 'Chicken 3',
        //         id: 'Chicken 3',
        //         name: 'Friend chicken',
        //     },
        //     {
        //         key: 'Chicken 4',
        //         id: 'Chicken 4',
        //         name: 'Sad chicken',
        //     }
        // ]
        // setCharacterList(data);



        const getAllHeros = async () => {
            try {
                const response: any = await get_all_heros_project(project_id);
                console.log(response.data);

                const data = response.data.map((hero:HeroCard) => ({
                    id: hero.id,
                    src: hero.src ? 'data:image/jpeg;base64,' + hero.src : 'https://placehold.co/195x147',
                    name: hero.name,
                }));
                setCharacterList(data);
            } catch (error) {
                console.error('Ошибка при получении списка проектов:', error);
                setCharacterList([]);
            }
        };

        getAllHeros();
    }, []);

    const deleteProject = async (id: string) => {
        console.log(id);

        // try {
        //     await delete_project_by_id(id);
        //     const updatedList = projectsList.filter(project => project.id !== id);
        //     setProjectList(updatedList);
        // } catch (error) {
        //     console.error('Ошибка при получении списка проектов:', error);
        //     setProjectList([]);
        // }
    }
    const navigate = useNavigate();
    const editProject = () => {
        navigate(pathConstant.HOME)
    }

    const clickProjectHandle = () => {
        navigate(pathConstant.GENERATING, { state: { is_edit: false , project_id: project_id} })
    };

    const cardClickHandle = (id_character: string) => {
        navigate(pathConstant.SETTING_HERO,
            { state: { is_edit: true ,
                    project_id: project_id,
                    character_id: id_character,
            } })
    };

    return (
        <>
            <div className="p-4 container-card">
                <h1 className="text-xl font-bold mb-4">Персонажи</h1>
                <div className="div-card-seq grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {characterList.map((character, index) => (
                        <Card
                            onClick={() => cardClickHandle(character.id)}
                            hoverable
                            className='bottom-card'
                            key={'my-movie-'+index}
                            cover={<>
                                <img
                                    className='fixed-size'
                                    // src={character.src}
                                    src='https://placehold.co/195x147'

                                    alt={`Poster hero ${index + 1}`}
                                />
                                <div className="text-right absolute top-1 right-0">
                                    <EditOutlined onClick={editProject} className="text-white text-xl p-2" />
                                    <DeleteOutlined onClick={() => deleteProject(character.id)} className="text-white text-xl p-2" />
                                </div>
                            </>
                            }
                        >
                            <Card.Meta className='pl-1' description={character.name} />
                        </Card>
                    ))}
                    <Card
                        onClick={clickProjectHandle}
                        hoverable
                        className='bottom-card add-new-card'
                        cover={<PlusOutlined />}
                    >
                    </Card>
                </div>
            </div>
        </>
    );
}

export default withAuth(CharactersCard);
