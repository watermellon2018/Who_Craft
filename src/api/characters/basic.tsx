import axios from 'axios';
import {PersonalDataI, SettingHero} from "./interfaceHero";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

async function get_all_heros_project(project_id: number): Promise<any> {
    try {
        return await axios.get(`${backendUrl}/api/projects/hero/select/`, {
            params: {
                projectId: project_id,
            }
        });
    }catch (error){
        console.error('Error select all heros for project:', error);
    }
}

async function delete_hero_by_id(project_id: string, character_id: string): Promise<any> {
    try {
        return await axios.get(`${backendUrl}/api/projects/hero/delete_by_id/`, {
            params: {
                projectId: project_id,
                characterId: character_id,
            }
        });

    } catch (error) {
        console.error('Ошибка при удалении персонажа:', error);
    }
}

async function select_info_hero_by_id(project_id: number | undefined,
                                      character_id: string | undefined): Promise<any> {
    if(project_id === undefined || character_id === undefined){
        throw TypeError('Не определен проект или персонаж')
    }

    try {
        return await axios.get(`${backendUrl}/api/projects/hero/select_by_id/`, {
            params: {
                projectId: project_id,
                characterId: character_id,
            }
        });
    } catch (error) {
        console.error('Error get info hero from project:', error);
    }
}

async function update_personal_data_hero(personal: PersonalDataI | undefined,
                                         project_id: number | undefined,
                                         character_id: string | undefined): Promise<any> {

    if(personal === undefined || character_id === undefined){
        throw TypeError('Личные данные персонажи не определены')
    }

    if(project_id === undefined){
        throw TypeError('Не определен проект или персонаж')
    }
    console.log(personal);
    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_personal_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,

                name: personal.name,
                lastName: personal.lastName,
                middleName: personal.middleName,
                dob: personal.dob,
                town: personal.town,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function create_new_hero(data: SettingHero, project_id: number): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/projects/hero/create/`, {
            data: {
                projectId: project_id,
                image: data.image,
                name: data.personal.name,
                lastName: data.personal.lastName,
                middleName: data.personal.middleName,
                dob: data.personal.dob,
                town: data.personal.town,

                forWhat: data.motivate.forWhat,
                goal: data.motivate.goal,
                philosophy: data.motivate.philosophy,
                develop: data.development,

                personalTraits: data.insideHero.personalTraits,
                strengthsWeaknesses: data.insideHero.strengthsWeaknesses,
                character: data.insideHero.character,
                complexes: data.identify.complexs,
                insideConflict: data.psyho.insideConflict,
                style: data.identify.style,

                biography: data.bio,
                relationship: data.relationship,

                profession: data.competition.profession,
                hobby: data.competition.hobby,

                talents: data.competition.talents,
                mindInfo: data.competition.mindInfo,
                sportInfo: data.competition.sportInfo,
                appearance: data.identify.appearance,
                speech: data.identify.speech,

                additInfo: data.additInfo,

            }
        });
    } catch (error) {
        console.error('Error create new hero for project:', error);
    }

}

export {
    create_new_hero,
    get_all_heros_project,
    select_info_hero_by_id,
    delete_hero_by_id,
    update_personal_data_hero,
}