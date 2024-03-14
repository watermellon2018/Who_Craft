import {CompetitionI, IdentifyI, InsideI, MotivateI, PersonalDataI, PsyhoI} from "./interfaceHero";
import axios from 'axios';
import {is_correct_data} from "./basic";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
async function update_motivate_data_hero(data: MotivateI | undefined,
                                         project_id: number | undefined,
                                         character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_motivate_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,

                forWhat: data.forWhat,
                goal: data.goal,
                philosophy: data.philosophy,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_personal_data_hero(personal: PersonalDataI | undefined,
                                         project_id: number | undefined,
                                         character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(personal === undefined)
        throw TypeError('Не определены данные персонажа')


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

async function update_inside_data_hero(data: InsideI | undefined,
                                         project_id: number | undefined,
                                         character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')



    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_inside_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,

                personalTraits: data.personalTraits,
                strengthsWeaknesses: data.strengthsWeaknesses,
                character: data.character,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_competition_data_hero(data: CompetitionI | undefined,
                                       project_id: number | undefined,
                                       character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_competition_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,

                profession: data.profession,
                hobby: data.hobby,
                talents: data.talents,
                mindInfo: data.mindInfo,
                sportInfo: data.sportInfo,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_identity_data_hero(data: IdentifyI | undefined,
                                            project_id: number | undefined,
                                            character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_identity_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,

                appearance: data.appearance,
                style: data.style,
                complexs: data.complexs,
                speech: data.speech,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}


async function update_psyho_data_hero(data: PsyhoI | undefined,
                                         project_id: number | undefined,
                                         character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_psyho_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,
                insideConflict: data.insideConflict,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_development_data_hero(data: string | undefined,
                                      project_id: number | undefined,
                                      character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_development_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,
                development: data,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_addit_data_hero(data: string | undefined,
                                            project_id: number | undefined,
                                            character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_additional_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,
                additInfo: data,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_bio_data_hero(data: string | undefined,
                                      project_id: number | undefined,
                                      character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_bio_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,
                bio: data,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

async function update_relationship_data_hero(data: string | undefined,
                                    project_id: number | undefined,
                                    character_id: string | undefined): Promise<any> {
    const is_correct = is_correct_data(project_id) &&
        is_correct_data(character_id)

    if(!is_correct)
        throw TypeError('Не определен проект или персонаж')
    if(data === undefined)
        throw TypeError('Не определены данные персонажа')


    try {
        return await axios.post(`${backendUrl}/api/projects/hero/update_relationship_info/`, {
            data: {
                projectId: project_id,
                characterId: character_id,
                relationship: data,
            }
        });
    } catch (error) {
        console.error('Error update personal info hero from project:', error);
    }
}

export {
    update_personal_data_hero,
    update_motivate_data_hero,
    update_inside_data_hero,
    update_competition_data_hero,
    update_identity_data_hero,
    update_psyho_data_hero,
    update_development_data_hero,
    update_addit_data_hero,
    update_bio_data_hero,
    update_relationship_data_hero,
}