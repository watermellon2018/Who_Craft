import React, {useEffect, useState} from 'react';
import {Card} from 'antd';
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import pathConstant from "../../../routes/pathConstant";
import {delete_hero_by_id, get_all_heros_project} from "../../../api/characters/basic";
import '../../global.css';

interface ProjectCard {
    id: string;
    key: string;
    // src: string;
    name: string
    src: string;
}
interface HeroCard {
    id: string;
    key: string;
    // src: string;
    name: string;
    src?: string;
}
const CharactersCard = () => {
    const navigate = useNavigate();
    const [characterList, setCharacterList] = useState<ProjectCard[]>([]);
    const location = useLocation();
    const { project_id, title } = location.state || {};

    useEffect(() => {

        const getAllHeros = async () => {
            try {
                const response: any = await get_all_heros_project(project_id);

                const data = response.data.map((hero:HeroCard) => ({
                    id: hero.id,
                    src: hero.src ? 'data:image/jpeg;base64,' + hero.src : 'https://placehold.co/195x147',
                    name: hero.name,
                    key: hero.name + hero.id,
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

        try {
            await delete_hero_by_id(project_id, id);
            const updatedList = characterList.filter(hero => hero.id !== id);
            setCharacterList(updatedList);
        } catch (error) {
            console.error('Ошибка при получении списка персонажей:', error);
            setCharacterList([]);
        }
    }

    const clickProjectHandle = () => {
        navigate(pathConstant.GENERATING, { state: { is_edit: false , project_id: project_id} })
    };

    const cardClickHandle = (id_character: string, imgUrl: string) => {
        navigate(pathConstant.SETTING_HERO,
            { state: { is_edit: true ,
                    project_id: project_id,
                    character_id: id_character,
                    imageUrl: imgUrl,
            } })
    };

    return (
        <>
            <div className="p-4 container-card">
                <h1 className="text-xl font-bold mb-4">Персонажи</h1>
                <div className="div-card-seq grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {characterList.map((character, index) => (
                        <Card
                            hoverable
                            className='effect-button-div bottom-card'
                            key={'my-movie-'+index}
                            cover={<>
                                <img
                                    className='fixed-size'
                                    src={character.src}
                                    onClick={() => cardClickHandle(character.id, character.src)}
                                />
                                <div
                                    style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                                    className="text-right absolute top-1 right-0">
                                    <EditOutlined
                                        onClick={() => cardClickHandle(character.id, character.src)}
                                        className="text-white text-xl p-2" />
                                    <DeleteOutlined
                                        onClick={() => deleteProject(character.id)}
                                        className="text-white text-xl p-2" />
                                </div>
                            </>
                            }
                        >
                            <Card.Meta
                                className='pl-1'
                                description={character.name} />
                        </Card>
                    ))}
                    <Card
                        onClick={clickProjectHandle}
                        hoverable
                        className='effect-button-div bottom-card add-new-card'
                        cover={<PlusOutlined />}
                    >
                    </Card>
                </div>
            </div>
        </>
    );
}

export default withAuth(CharactersCard);
