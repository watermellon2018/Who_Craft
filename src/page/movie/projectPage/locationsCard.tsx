import React, {useEffect, useState} from 'react';
import {Card, Space} from 'antd';
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {delete_project_by_id, get_all_list_projects} from "../../../api/projects/properties/project";
import HeaderComponent from "../../main/header";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import {Divider} from "antd/lib";
import pathConstant from "../../../routes/pathConstant";

interface ProjectCard {
    id: string;
    key: string;
    // src: string;
    name: string
}
const LocationsCard = () => {
    const [locationList, setLocationList] = useState<ProjectCard[]>([]);

    useEffect(() => {
        const loc = [
            {
                key: 'home',
                id: 'home',
                name: 'Курятник',
            },
            {
                key: 'outside',
                id: 'outside',
                name: 'Улица',
            },
        ]
        setLocationList(loc);




        // const getAllProjects = async () => {
        //     try {
        //         const response: any = await get_all_list_projects();
        //
        //         const ar = response.data.map((proj:ProjectCard) => ({
        //             id: proj.id,
        //             src: proj.src ? 'data:image/jpeg;base64,' + proj.src : 'https://placehold.co/195x147',
        //             title: proj.title,
        //         }));
        //         setProjectList(ar);
        //     } catch (error) {
        //         console.error('Ошибка при получении списка проектов:', error);
        //         setProjectList([]);
        //     }
        // };
        //
        // getAllProjects();
    }, []);

    const deleteProject = async (id: string) => {
        console.log(id);

    }
    const navigate = useNavigate();
    const editProject = () => {
        navigate(pathConstant.HOME)
    }

    const clickProjectHandle = () => {
        const a = 5;
    };

    return (
        <>
            <div className="p-4 container-card">
                <h1 className="text-xl font-bold mb-4">Локации</h1>
                <div className="grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {locationList.map((location, index) => (
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
                                    <DeleteOutlined onClick={() => deleteProject(location.id)} className="text-white text-xl p-2" />
                                </div>
                            </>
                            }
                        >
                            <Card.Meta className='pl-1' description={location.name} />
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

export default withAuth(LocationsCard);
