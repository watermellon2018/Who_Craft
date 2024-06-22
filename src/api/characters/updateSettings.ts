import {CompetitionI, IdentifyI, InsideI, MotivateI, PersonalDataI, PsyhoI} from "./interfaceHero";
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

async function updateHeroData<T>(
    data: T | undefined,
    projectId: number | undefined,
    characterId: string | undefined,
    url: string,
    errorMessage: string
): Promise<any> {
    const isCorrectData = isDataValid(projectId) && isDataValid(characterId);

    if (!isCorrectData) {
        throw new TypeError('Project or character is not defined');
    }

    if (!data) {
        throw new TypeError(errorMessage);
    }

    try {
        const requestData = typeof data === 'string' ? { data } : data;
        return await axios.post(`${backendUrl}${url}`, {
            data: {
                projectId,
                characterId,
                ...requestData,
            },
        });
    } catch (error) {
        console.error(`Error updating hero data: ${error}`);
    }
}

function isDataValid(data: any): boolean {
    return data !== undefined && data !== null;
}

async function update_motivate_data_hero(
    data: MotivateI | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_motivate_info/',
        'Character motivation data is not defined'
    );
}
async function update_personal_data_hero(
    data: PersonalDataI | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_personal_info/',
        'Character personal data is not defined'
    );
}

async function update_inside_data_hero(
    data: InsideI | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_inside_info/',
        'Character inside data is not defined'
    );
}

async function update_competition_data_hero(
    data: CompetitionI | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_competition_info/',
        'Character competition data is not defined'
    );
}


async function update_identity_data_hero(
    data: IdentifyI | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_identity_info/',
        'Character identity data is not defined'
    );
}

async function update_psyho_data_hero(
    data: PsyhoI | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_psyho_info/',
        'Character psycho data is not defined'
    );
}

async function update_development_data_hero(
    data: string | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_development_info/',
        'Character development data is not defined'
    );
}

async function update_addit_data_hero(
    data: string | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_additional_info/',
        'Character additional data is not defined'
    );
}

async function update_bio_data_hero(
    data: string | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_bio_info/',
        'Character bio data is not defined'
    );
}
async function update_relationship_data_hero(
    data: string | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_relationship_info/',
        'Character relationship data is not defined'
    );
}
async function update_image_data_hero(
    data: string | undefined,
    projectId: number | undefined,
    characterId: string | undefined
): Promise<any> {
    return updateHeroData(
        data,
        projectId,
        characterId,
        '/api/projects/hero/update_image_hero/',
        'Character image data is not defined'
    );
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
    update_image_data_hero,
}