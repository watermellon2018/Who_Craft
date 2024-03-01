import React, {useEffect, useState} from 'react';
import {Card, Space} from 'antd';
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {delete_project_by_id, get_all_list_projects} from "../../../api/projects/properties/project";
import HeaderComponent from "../../main/header";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import {Divider} from "antd/lib";
import PathConstants from "../../../routes/pathConstant";

interface ProjectCard {
    id: string;
    key: string;
    // src: string;
    name: string
}
const MusicsCard = () => {
    const [musicList, setMusicList] = useState<ProjectCard[]>([]);
    useEffect(() => {
        const mus = [
            {
                key: 'theme',
                id: 'theme',
                name: 'Трейлера',
            },
            {
                key: 'final',
                id: 'final',
                name: 'Финал',
            },
        ]
        setMusicList(mus);
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
        navigate(PathConstants.HOME);
    }

    const clickProjectHandle = () => {
        const a = 5;
    };

    return (
        <>
            <div className="p-4 container-card">
                <h1 className="text-xl font-bold mb-4">Музыка</h1>
                <div className="grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {musicList.map((sound, index) => (
                        <Card
                            hoverable
                            className='bottom-card'
                            key={'my-movie-'+index}
                            cover={<>
                                <img
                                    className='fixed-size'
                                    // src={character.src}
                                    src='https://placehold.co/195x147'
                                    onClick={clickProjectHandle}
                                    alt={`Poster movie ${index + 1}`}
                                />
                                <div className="text-right absolute top-0 right-0">
                                    <EditOutlined onClick={editProject} className="text-white text-xl p-2" />
                                    <DeleteOutlined onClick={() => deleteProject(sound.id)} className="text-white text-xl p-2" />
                                </div>
                            </>
                            }
                        >
                            <Card.Meta className='pl-1' description={sound.name} />
                        </Card>
                    ))}
                    <Card
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

export default withAuth(MusicsCard);
