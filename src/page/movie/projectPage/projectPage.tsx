import React, {useEffect, useState} from 'react';
import HeaderComponent from "../../main/header";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import CharactersCard from "./charactersCard";
import LocationsCard from "./locationsCard";
import MusicsCard from "./musicsCard";
import {useLocation} from "react-router-dom";
import {get_info_project} from "../../../api/projects/properties/project";
import {ProjectI} from "../../../api/projects/interface";

const ProjectPage = () => {
    const location = useLocation();
    const { project_id } = location.state || {};
    const [project, setProject] = useState<ProjectI>();

    useEffect(() => {
        if(project_id == null){
            throw new Error('Страница проекта! Нет информации о текущем проекте');
        }
        get_info_project(project_id).then((curProject) => {
            if(curProject.status)
                setProject(curProject.data);
        });
    }, []);





    return (
        <>
            <HeaderComponent />
            <div className="p-4 bg-gray-800 min-h-screen text-white">
                <div className="mb-4 ml-5">
                    <h1 className="text-3xl font-bold mb-4">Проект {project?.title || ''}</h1>
                    Добавьте персонажей, локации и музыку
                </div>

                <CharactersCard />


                <LocationsCard />


                <MusicsCard />
            </div>
        </>
    );
}

export default withAuth(ProjectPage);
