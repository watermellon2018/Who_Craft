import React, {useEffect, useState} from 'react';
import {Card, Space} from 'antd';
import {EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {delete_project_by_id, get_all_list_projects} from "../../../api/projects/properties/project";
import HeaderComponent from "../../main/header";
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import {Divider} from "antd/lib";
import CharactersCard from "./charactersCard";
import LocationsCard from "./locationsCard";
import MusicsCard from "./musicsCard";

interface ProjectCard {
    id: string;
    key: string;
    // src: string;
    name: string
}
const ProjectPage = () => {


    return (
        <>
            <HeaderComponent />
            <div className="p-4 bg-gray-800 min-h-screen text-white">
                <div className="mb-4 ml-5">
                    <h1 className="text-3xl font-bold mb-4">Проект</h1>
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
