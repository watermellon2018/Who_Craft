import React, {useEffect, useState} from 'react';
import { Space , Card } from 'antd';
import withAuth from "../../../../utils/auth/check_auth";
import HeaderComponent from "../../../main/header";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.css';


interface ProjectCard {
    src: string;
    title: string
}
const ProjectListPage = () => {
    const [projectsList, setProjectList] = useState<ProjectCard[]>([]);

    useEffect(() => {
        const ar = Array.from({ length: 6 }).map((_, index) => ({
            src: 'https://placehold.co/200x300',
            title: 'www.instagram.com',
        }));

        setProjectList(ar);
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
