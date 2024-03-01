import React, {useEffect, useState} from 'react';
import HeaderComponent from "../../main/header";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import CharactersCard from "./charactersCard";
import LocationsCard from "./locationsCard";
import MusicsCard from "./musicsCard";

const ProjectPage = () => {
    const [curProject, setCurProject] = useState({title: ''});

    useEffect(() => {
        const curProjectStr: string | null = localStorage.getItem('curProject');
        if(curProjectStr == null){
            throw new Error('Страница проекта! Нет информации о текущем проекте');
        }
        const obj: any = JSON.parse(curProjectStr);
        setCurProject(obj);
    });


    return (
        <>
            <HeaderComponent />
            <div className="p-4 bg-gray-800 min-h-screen text-white">
                <div className="mb-4 ml-5">
                    <h1 className="text-3xl font-bold mb-4">Проект {curProject.title}</h1>
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
