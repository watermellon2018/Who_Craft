import React, {useEffect, useState} from 'react';
import { Space , Card } from 'antd';
import withAuth from "../../../../utils/auth/check_auth";
import HeaderComponent from "../../../main/header";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.css';
import {get_all_list_projects} from "../../../../api/projects/properties/project";


interface ProjectCard {
    src: string;
    title: string
}
const ProjectListPage = () => {
    const [projectsList, setProjectList] = useState<ProjectCard[]>([]);

    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const response: any = await get_all_list_projects();
                // setProjectList(response.data);
                console.log(response.data);
                // const src = 'data:image/jpeg;base64,' + proj.image;
                const ar = response.data.map((proj:ProjectCard) => ({
                    src: proj.src ? 'data:image/jpeg;base64,' + proj.src : 'https://placehold.co/195x147',
                    title: proj.title,
                }));
                setProjectList(ar);
        } catch (error) {
                console.error('Ошибка при получении списка проектов:', error);
                setProjectList([]);
            }
        };

        getAllProjects();
    }, []);

    return (
        <>
            <HeaderComponent />
            <div className="p-4 bg-gray-800 min-h-screen text-white">

                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">Мои проекты</h1>
                    <div className="grid grid-cols-4 gap-4">
                        {projectsList.map((project, index) => (
                            <Card
                                hoverable
                                className='bottom-card'
                                key={'my-movie-'+index}
                                cover={<>
                                    <img src={project.src}
                                         alt={`Poster movie ${index + 1}`}
                                          />
                                    <div className="text-right absolute top-0 right-0">
                                        <EditOutlined className="text-white text-xl p-2" />
                                        <DeleteOutlined className="text-white text-xl p-2" />
                                    </div>
                                </>
                                }
                            >
                                <Card.Meta description={project.title} />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(ProjectListPage);
