import React, {useEffect, useState} from 'react';
import { Card } from 'antd';
import withAuth from "../../../../utils/auth/check_auth";
import HeaderComponent from "../../../main/header";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.css';
import {delete_project_by_id, get_all_list_projects} from "../../../../api/projects/properties/project";
import {useLocation, useNavigate} from "react-router-dom";
import PathConstants from "../../../../routes/pathConstant";


interface ProjectCard {
    id: string;
    src: string;
    title: string
}
const ProjectListPage = () => {
    const [projectsList, setProjectList] = useState<ProjectCard[]>([]);

    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const response: any = await get_all_list_projects();

                const ar = response.data.map((proj:ProjectCard) => ({
                    id: proj.id,
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

    const deleteProject = async (id: string) => {

        try {
            await delete_project_by_id(id);
            const updatedList = projectsList.filter(project => project.id !== id);
            setProjectList(updatedList);
        } catch (error) {
            console.error('Ошибка при получении списка проектов:', error);
            setProjectList([]);
        }
    }
    const navigate = useNavigate();
    const editProject = () => {
        navigate(PathConstants.HOME);
    }
    const handleClickCard = (project_id: string, title: string) => {
        navigate(PathConstants.PROJECT_PAGE, { state: { project_id: project_id, title: title} });
    }

    return (
        <>
            <HeaderComponent />
            <div className="p-4 bg-gray-800 min-h-screen text-white">

                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">Мои проекты</h1>
                    <div className="grid grid-cols-4 gap-4 projects-div">
                        {projectsList.map((project, index) => (
                            <Card
                                onClick={() => {handleClickCard(project.id, project.title)}}
                                hoverable
                                className='bottom-card'
                                key={'my-movie-'+index}
                                cover={<>
                                    <img src={project.src}
                                         onClick={() => {handleClickCard(project.id, project.title)}}
                                         alt={`Poster movie ${index + 1}`}
                                          />
                                    <div className="text-right absolute top-0 right-0">
                                        <EditOutlined onClick={editProject} className="text-white text-xl p-2" />
                                        <DeleteOutlined onClick={() => deleteProject(project.id)} className="text-white text-xl p-2" />
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
